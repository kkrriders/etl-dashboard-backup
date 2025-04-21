import React from 'react';
import ApiDiagnostics from '@/components/api/api-diagnostics';

export default function ApiPlaygroundPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">API Playground</h1>
      <p className="text-gray-600 mb-8">
        Test API endpoints and verify your API connection settings.
      </p>
      
      <ApiDiagnostics />
    </div>
  );
} 