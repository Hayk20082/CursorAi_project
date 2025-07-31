import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const DeploymentTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<{
    health: boolean | null;
    register: boolean | null;
    login: boolean | null;
  }>({
    health: null,
    register: null,
    login: null,
  });

  const runTests = async () => {
    setIsLoading(true);
    setTestResults({ health: null, register: null, login: null });

    try {
      // Test 1: Health endpoint
      console.log("Testing health endpoint...");
      const healthResponse = await fetch('https://cursorai-project.onrender.com/api/health');
      const healthOk = healthResponse.ok;
      console.log("Health response:", healthResponse.status, healthOk);
      setTestResults(prev => ({ ...prev, health: healthOk }));

      // Test 2: Register endpoint
      console.log("Testing register endpoint...");
      const registerResponse = await fetch('https://cursorai-project.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword',
          firstName: 'Test',
          lastName: 'User',
          businessName: 'Test Business',
          subdomain: 'test-business'
        }),
      });
      const registerOk = registerResponse.ok || registerResponse.status === 400; // 400 is expected for duplicate email
      console.log("Register response:", registerResponse.status, registerOk);
      setTestResults(prev => ({ ...prev, register: registerOk }));

      // Test 3: Login endpoint
      console.log("Testing login endpoint...");
      const loginResponse = await fetch('https://cursorai-project.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword'
        }),
      });
      const loginOk = loginResponse.ok;
      console.log("Login response:", loginResponse.status, loginOk);
      setTestResults(prev => ({ ...prev, login: loginOk }));

    } catch (error) {
      console.error("Test failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: boolean | null) => {
    if (status === null) return <Loader2 className="h-4 w-4 animate-spin" />;
    if (status) return <CheckCircle className="h-4 w-4 text-green-600" />;
    return <AlertCircle className="h-4 w-4 text-red-600" />;
  };

  const getStatusBadge = (status: boolean | null) => {
    if (status === null) return <Badge variant="secondary">Testing...</Badge>;
    if (status) return <Badge className="bg-green-100 text-green-800">Success</Badge>;
    return <Badge variant="destructive">Failed</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Deployment Test
        </CardTitle>
        <CardDescription>
          Test connection to deployed backend at https://cursorai-project.onrender.com
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runTests} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Running Tests...
            </>
          ) : (
            "Run Deployment Tests"
          )}
        </Button>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(testResults.health)}
              <span className="text-sm font-medium">Health Endpoint</span>
            </div>
            {getStatusBadge(testResults.health)}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(testResults.register)}
              <span className="text-sm font-medium">Register Endpoint</span>
            </div>
            {getStatusBadge(testResults.register)}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(testResults.login)}
              <span className="text-sm font-medium">Login Endpoint</span>
            </div>
            {getStatusBadge(testResults.login)}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>Backend URL: https://cursorai-project.onrender.com</p>
          <p>API Base: https://cursorai-project.onrender.com/api</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentTest; 