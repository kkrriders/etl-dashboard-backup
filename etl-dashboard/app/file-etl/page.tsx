"use client"

import { FileUploadETL } from '../../components/FileUploadETL';

export default function FileETLPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">File ETL Processing</h1>
        <p className="text-gray-500 mt-2">
          Upload files from your computer and process them through the Extract, Transform, Load pipeline
        </p>
      </div>
      
      <div className="grid gap-6">
        <FileUploadETL />
        
        <div className="bg-blue-50 p-4 rounded border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">How to use this tool</h3>
          <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
            <li>Select a file type from the dropdown menu</li>
            <li>Upload a file from your computer</li>
            <li>Click "Extract Data" to process your file</li>
            <li>Configure transformations on the next tab</li>
            <li>Continue through the ETL pipeline steps</li>
            <li>View the final processed results</li>
          </ol>
          <p className="mt-2 text-sm text-blue-600">
            Alternative: Use the "Run Full ETL Pipeline" button to execute all steps at once
          </p>
        </div>
      </div>
    </div>
  );
} 