"use client"

import React, { useState, useCallback } from 'react'
import { Upload, FileType, CheckCircle2, AlertCircle, FileCheck, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [processingStatus, setProcessingStatus] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null
    setFile(selectedFile)
    setUploadStatus('idle')
    setError(null)
  }
  
  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      setFile(droppedFile)
      setUploadStatus('idle')
      setError(null)
    }
  }, [])
  
  // Process the file
  const processFile = async () => {
    if (!file) return
    
    try {
      setUploadStatus('uploading')
      setProgress(0)
      
      // Simulate upload progress
      const uploadTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(uploadTimer)
            return 100
          }
          return prev + 5
        })
      }, 100)
      
      // After upload completes, start processing
      setTimeout(() => {
        clearInterval(uploadTimer)
        setProgress(100)
        setUploadStatus('processing')
        setProcessingStatus('Extracting data from file...')
        
        // Simulate ETL processing steps
        setTimeout(() => {
          setProcessingStatus('Transforming data...')
          
          setTimeout(() => {
            setProcessingStatus('Loading data into destination...')
            
            setTimeout(() => {
              // Simulate processing result
              setResult({
                recordsProcessed: Math.floor(Math.random() * 1000) + 100,
                transformationsApplied: Math.floor(Math.random() * 5) + 1,
                timestamp: new Date().toISOString(),
                status: 'Completed',
                fileInfo: {
                  name: file.name,
                  size: file.size,
                  type: file.type
                }
              })
              setUploadStatus('success')
            }, 1000)
          }, 1000)
        }, 1000)
      }, 2000)
      
    } catch (err) {
      setUploadStatus('error')
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }
  
  // Reset the uploader
  const resetUploader = () => {
    setFile(null)
    setUploadStatus('idle')
    setProgress(0)
    setProcessingStatus('')
    setResult(null)
    setError(null)
  }
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileType className="h-5 w-5 text-primary" />
          File ETL Processor
        </CardTitle>
        <CardDescription>
          Upload a file to extract, transform, and load its data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {uploadStatus === 'idle' && (
          <>
            <div
              className={`border-2 border-dashed rounded-lg p-10 text-center ${
                isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {isDragging ? 'Drop your file here' : 'Drag & drop your file here'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse files <br />
                <span className="text-xs">
                  (Supported formats: CSV, JSON, Excel, XML)
                </span>
              </p>
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Select File
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".csv,.json,.xlsx,.xml,.xls"
                onChange={handleFileChange}
              />
            </div>
            
            {file && (
              <div className="mt-4 p-4 bg-muted rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB · {file.type || 'Unknown type'}
                    </p>
                  </div>
                </div>
                <Button onClick={processFile}>Process File</Button>
              </div>
            )}
          </>
        )}
        
        {uploadStatus === 'uploading' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Uploading file...</p>
              <p className="text-sm text-muted-foreground">{progress}%</p>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}
        
        {uploadStatus === 'processing' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <p className="text-sm font-medium">{processingStatus}</p>
            </div>
            <Progress value={100} className="w-full" />
          </div>
        )}
        
        {uploadStatus === 'success' && result && (
          <div className="space-y-4">
            <Alert variant="default" className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle>Processing Complete</AlertTitle>
              <AlertDescription>
                Your file has been successfully processed.
              </AlertDescription>
            </Alert>
            
            <Tabs defaultValue="summary">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="data">Data Sample</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-1">Records Processed</p>
                    <p className="text-2xl font-bold">{result.recordsProcessed}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-1">Transformations</p>
                    <p className="text-2xl font-bold">{result.transformationsApplied}</p>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">File Information</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Filename:</span>
                      <span className="text-sm font-medium">{result.fileInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Size:</span>
                      <span className="text-sm font-medium">{(result.fileInfo.size / 1024).toFixed(2)} KB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <span className="text-sm font-medium">{result.fileInfo.type || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Processed at:</span>
                      <span className="text-sm font-medium">
                        {new Date(result.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="data">
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Data Sample</Badge>
                    <p className="text-sm text-muted-foreground">First 5 rows of processed data</p>
                  </div>
                  <Textarea 
                    className="font-mono h-48" 
                    readOnly 
                    value={JSON.stringify([
                      { id: 1, name: "Sample data 1", value: 10.5 },
                      { id: 2, name: "Sample data 2", value: 20.1 },
                      { id: 3, name: "Sample data 3", value: 15.7 },
                      { id: 4, name: "Sample data 4", value: 8.3 },
                      { id: 5, name: "Sample data 5", value: 12.9 }
                    ], null, 2)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="logs">
                <div className="mt-4">
                  <div className="bg-black text-green-400 font-mono p-4 rounded-lg h-48 overflow-y-auto">
                    <p>[{new Date().toISOString()}] Starting ETL process for {result.fileInfo.name}</p>
                    <p>[{new Date().toISOString()}] Detected file format: {result.fileInfo.type}</p>
                    <p>[{new Date().toISOString()}] Extraction phase started</p>
                    <p>[{new Date().toISOString()}] Extracted {result.recordsProcessed} records</p>
                    <p>[{new Date().toISOString()}] Transformation phase started</p>
                    <p>[{new Date().toISOString()}] Applied {result.transformationsApplied} transformations</p>
                    <p>[{new Date().toISOString()}] Loading phase started</p>
                    <p>[{new Date().toISOString()}] Successfully loaded to destination</p>
                    <p>[{new Date().toISOString()}] ETL process completed successfully</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {uploadStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error || 'An error occurred while processing your file.'}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      {(uploadStatus === 'success' || uploadStatus === 'error') && (
        <CardFooter>
          <Button onClick={resetUploader} className="w-full">
            Upload Another File
          </Button>
        </CardFooter>
      )}
    </Card>
  )
} 