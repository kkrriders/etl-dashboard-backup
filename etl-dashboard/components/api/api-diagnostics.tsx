"use client"

import React, { useState } from 'react';
import { Button, Input, Select, Tabs, TabsContent, TabsList, TabsTrigger, Textarea } from "@/components/ui";
import { ClipboardCopy, CheckCircle, XCircle, Terminal, Cog } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { fetchWithAuth } from '@/lib/apiClient';

const ApiDiagnostics: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [endpoint, setEndpoint] = useState<string>('/health');
  const [method, setMethod] = useState<string>('GET');
  const [requestBody, setRequestBody] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const testApi = async () => {
    setStatus('loading');
    setError(null);
    setResponse(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        }
      };

      // Add body for non-GET requests
      if (method !== 'GET' && requestBody.trim()) {
        try {
          options.body = JSON.stringify(JSON.parse(requestBody));
        } catch (e) {
          setStatus('error');
          setError('Invalid JSON in request body');
          return;
        }
      }

      const response = await fetchWithAuth(endpoint, options);
      
      const data = await response.json();
      setResponse(data);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">API Diagnostics</h2>

      <Tabs defaultValue="test">
        <TabsList className="mb-6">
          <TabsTrigger value="test"><Terminal className="h-4 w-4 mr-2" /> Test Endpoints</TabsTrigger>
          <TabsTrigger value="config"><Cog className="h-4 w-4 mr-2" /> API Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="test">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-1/4">
                <label className="block text-sm font-medium mb-1">Method</label>
                <Select 
                  value={method} 
                  onValueChange={setMethod}
                >
                  <Select.Trigger className="w-full">
                    <Select.Value placeholder="Select method" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="GET">GET</Select.Item>
                    <Select.Item value="POST">POST</Select.Item>
                    <Select.Item value="PUT">PUT</Select.Item>
                    <Select.Item value="DELETE">DELETE</Select.Item>
                  </Select.Content>
                </Select>
              </div>
              <div className="w-3/4">
                <label className="block text-sm font-medium mb-1">Endpoint</label>
                <Input 
                  value={endpoint} 
                  onChange={(e) => setEndpoint(e.target.value)} 
                  placeholder="/health"
                />
              </div>
            </div>

            {method !== 'GET' && (
              <div>
                <label className="block text-sm font-medium mb-1">Request Body (JSON)</label>
                <Textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder='{ "key": "value" }'
                  rows={5}
                  className="font-mono"
                />
              </div>
            )}

            <Button onClick={testApi} disabled={status === 'loading'}>
              {status === 'loading' ? 'Testing...' : 'Test Connection'}
            </Button>

            {status === 'success' && (
              <div className="mt-6">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">API Connection Successful</span>
                </div>

                <div className="relative">
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-80 font-mono text-sm">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                  <div className="absolute top-2 right-2">
                    <CopyToClipboard text={JSON.stringify(response, null, 2)} onCopy={handleCopy}>
                      <Button variant="outline" size="sm">
                        {copied ? <CheckCircle className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
                      </Button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-6">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <XCircle className="h-5 w-5" />
                  <span className="font-medium">API Connection Error</span>
                </div>
                <pre className="bg-red-50 p-4 rounded-md overflow-auto text-red-600 font-mono text-sm">
                  {error}
                </pre>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="config">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">API Base URL</label>
              <div className="flex items-center gap-2">
                <Input value={process.env.NEXT_PUBLIC_API_BASE_URL || ''} disabled />
                {process.env.NEXT_PUBLIC_API_BASE_URL ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              {!process.env.NEXT_PUBLIC_API_BASE_URL && (
                <p className="text-sm text-red-600 mt-1">
                  Missing API Base URL. Check your .env.local file.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">API Key Configuration</label>
              <div className="flex items-center gap-2">
                <Input 
                  value={process.env.NEXT_PUBLIC_API_KEY ? '••••••••••••••••••••' : ''} 
                  disabled 
                />
                {process.env.NEXT_PUBLIC_API_KEY ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              {!process.env.NEXT_PUBLIC_API_KEY && (
                <p className="text-sm text-red-600 mt-1">
                  Missing API Key. Check your .env.local file.
                </p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDiagnostics; 