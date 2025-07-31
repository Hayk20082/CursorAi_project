import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SimpleTest = () => {
  const [result, setResult] = useState<string>('');

  const testFetch = async () => {
    try {
      console.log('Testing basic fetch...');
      
      const response = await fetch('http://localhost:5000/api/health');
      console.log('Response:', response);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Data:', data);
        setResult(`Success! Status: ${response.status}, Data: ${JSON.stringify(data)}`);
      } else {
        setResult(`Error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Simple Fetch Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testFetch} className="w-full">
          Test Basic Fetch
        </Button>
        
        {result && (
          <Alert>
            <AlertDescription>{result}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default SimpleTest; 