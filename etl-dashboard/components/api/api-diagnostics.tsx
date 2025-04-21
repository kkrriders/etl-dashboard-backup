"use client"

import React from 'react';
import { Button } from "@/components/ui/button";

const ApiDiagnostics = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">API Diagnostics</h2>
      <Button>Test Connection</Button>
    </div>
  );
};

export default ApiDiagnostics; 