"use client"
import { useState, useRef } from 'react';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { extractData, transformData, loadData, orchestrateEtl } from '../lib/apiClient';
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// File type options
const FILE_TYPES = [
  { value: 'csv', label: 'CSV' },
  { value: 'json', label: 'JSON' },
  { value: 'xml', label: 'XML' },
  { value: 'text', label: 'Text' }
];

// Transformation options
const TRANSFORMATION_TYPES = [
  { value: 'filter', label: 'Filter Records' },
  { value: 'calculate', label: 'Calculate Fields' },
  { value: 'map', label: 'Map Fields' },
  { value: 'aggregate', label: 'Aggregate Data' }
];

export function FileUploadETL() {
  // File upload state
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string>('csv');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ETL processing state
  const [extractedData, setExtractedData] = useState<any>(null);
  const [transformedData, setTransformedData] = useState<any>(null);
  const [loadedData, setLoadedData] = useState<any>(null);
  const [transformationType, setTransformationType] = useState<string>('filter');
  const [transformationConfig, setTransformationConfig] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  // Clear current file
  const handleClearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle extraction
  const handleExtract = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Read file contents
      const fileContents = await readFileAsText(file);
      
      // Create extraction payload
      const extractionPayload = {
        source: {
          type: 'file',
          format: fileType,
          data: fileContents,
          options: fileType === 'csv' ? { header: true, delimiter: ',' } : {}
        },
        options: {
          includeRawData: true
        }
      };
      
      // Call extract API
      const result = await extractData(extractionPayload, {});
      setExtractedData(result);
      setActiveTab("transform");
    } catch (err: any) {
      console.error("Extraction error:", err);
      setError(`Extraction failed: ${err.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle transformation
  const handleTransform = async () => {
    if (!extractedData) {
      setError("Extract data first");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Create transformation payload based on type
      let transformationPayload = {
        data: extractedData.data,
        transformations: {},
        options: {
          includeOriginalData: true
        }
      };
      
      // Set transformation configuration based on selected type
      switch (transformationType) {
        case 'filter':
          transformationPayload.transformations = {
            type: 'filter',
            condition: transformationConfig || 'true' // Default to include all if empty
          };
          break;
        case 'calculate':
          // Expect JSON format for calculate operations: [{"name": "newField", "formula": "field1 * 2"}]
          const operations = transformationConfig ? 
            JSON.parse(transformationConfig) : 
            [{ name: 'calculatedField', formula: '1' }];
          
          transformationPayload.transformations = {
            type: 'calculate',
            operations
          };
          break;
        // Additional transformation types can be handled here
      }
      
      // Call transform API
      const result = await transformData(extractedData.data, transformationPayload.transformations, {});
      setTransformedData(result);
      setActiveTab("load");
    } catch (err: any) {
      console.error("Transformation error:", err);
      setError(`Transformation failed: ${err.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle loading
  const handleLoad = async () => {
    if (!transformedData) {
      setError("Transform data first");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Create load payload for memory destination (for demo)
      const loadPayload = {
        destination: {
          type: 'memory',
          format: 'json'
        },
        options: {
          pretty: true
        }
      };
      
      // Call load API
      const result = await loadData(transformedData.data, loadPayload.destination, loadPayload.options);
      setLoadedData(result);
      setActiveTab("result");
    } catch (err: any) {
      console.error("Loading error:", err);
      setError(`Loading failed: ${err.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle full ETL orchestration
  const handleOrchestrateFull = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Read file contents
      const fileContents = await readFileAsText(file);
      
      // Create orchestration payload for complete ETL pipeline
      const orchestrationPayload = {
        source: {
          type: 'file',
          format: fileType,
          data: fileContents,
          options: fileType === 'csv' ? { header: true } : {}
        },
        transformations: [
          {
            type: transformationType,
            // For simplicity in this demo, handle only filter case directly:
            ...(transformationType === 'filter' 
              ? { condition: transformationConfig || 'true' } 
              : { operations: transformationConfig ? JSON.parse(transformationConfig) : [] })
          }
        ],
        destination: {
          type: 'memory',
          format: 'json'
        },
        options: {
          includeIntermediateResults: true
        }
      };
      
      // Call orchestrate API
      const result = await orchestrateEtl(orchestrationPayload);
      
      // Set all results
      setExtractedData(result.extractionResult);
      setTransformedData(result.transformationResult);
      setLoadedData(result.loadingResult);
      
      setActiveTab("result");
    } catch (err: any) {
      console.error("ETL orchestration error:", err);
      setError(`ETL orchestration failed: ${err.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Utility to read file as text
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  // Helper to format JSON display
  const formatJSONDisplay = (data: any) => {
    if (!data) return "No data";
    try {
      return JSON.stringify(data, null, 2);
    } catch (e) {
      return String(data);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ETL File Processing</CardTitle>
        <CardDescription>
          Upload a file and process it through the Extract, Transform, Load pipeline
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="extract" disabled={!file}>Extract</TabsTrigger>
            <TabsTrigger value="transform" disabled={!extractedData}>Transform</TabsTrigger>
            <TabsTrigger value="load" disabled={!transformedData}>Load</TabsTrigger>
            <TabsTrigger value="result" disabled={!loadedData}>Result</TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="file-type">File Type</Label>
                <Select value={fileType} onValueChange={setFileType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select file type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FILE_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <Input
                  ref={fileInputRef}
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                />
                {file && (
                  <div className="text-sm mt-2">
                    Selected: {file.name} ({Math.round(file.size / 1024)} KB)
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleClearFile}
                      className="ml-2"
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button onClick={() => handleExtract()}>
                Extract Data
              </Button>
              <Button onClick={() => handleOrchestrateFull()}>
                Run Full ETL Pipeline
              </Button>
            </div>
          </TabsContent>

          {/* Extract Tab */}
          <TabsContent value="extract" className="space-y-4">
            <div className="space-y-2">
              <Label>Extracted Data</Label>
              <div className="border rounded p-2 bg-gray-50 overflow-auto max-h-80">
                <pre className="text-sm text-gray-700">
                  {extractedData ? formatJSONDisplay(extractedData) : "No data extracted yet"}
                </pre>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => handleTransform()}>
                Transform Data
              </Button>
            </div>
          </TabsContent>

          {/* Transform Tab */}
          <TabsContent value="transform" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="transformation-type">Transformation Type</Label>
                <Select 
                  value={transformationType} 
                  onValueChange={setTransformationType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transformation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSFORMATION_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transformation-config">
                  {transformationType === 'filter' 
                    ? 'Filter Condition (e.g., "age > 30")' 
                    : 'Configuration (JSON)'}
                </Label>
                <textarea
                  id="transformation-config"
                  className="w-full min-h-[100px] p-2 border rounded"
                  value={transformationConfig}
                  onChange={(e) => setTransformationConfig(e.target.value)}
                  placeholder={
                    transformationType === 'filter'
                      ? 'Enter filter condition (e.g., "age > 30")'
                      : 'Enter JSON configuration'
                  }
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => handleTransform()}>
                Apply Transformation
              </Button>
            </div>
          </TabsContent>

          {/* Load Tab */}
          <TabsContent value="load" className="space-y-4">
            <div className="space-y-2">
              <Label>Transformed Data</Label>
              <div className="border rounded p-2 bg-gray-50 overflow-auto max-h-80">
                <pre className="text-sm text-gray-700">
                  {transformedData ? formatJSONDisplay(transformedData) : "No data transformed yet"}
                </pre>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => handleLoad()}>
                Load Data
              </Button>
            </div>
          </TabsContent>

          {/* Result Tab */}
          <TabsContent value="result" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>ETL Pipeline Results</Label>
                <div className="border rounded p-2 bg-gray-50 overflow-auto max-h-80">
                  <pre className="text-sm text-gray-700">
                    {loadedData ? formatJSONDisplay(loadedData) : "No data processed yet"}
                  </pre>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => {
                  setFile(null);
                  setExtractedData(null);
                  setTransformedData(null);
                  setLoadedData(null);
                  setTransformationConfig('');
                  setActiveTab("upload");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}>
                  Start New ETL Process
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {error && (
          <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded text-red-600">
            {error}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {isLoading && (
          <div className="flex items-center text-primary">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </div>
        )}
      </CardFooter>
    </Card>
  );
} 