import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

const BackendStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('https://cursorai-project.onrender.com/api/health');
        setIsOnline(response.ok);
      } catch (error) {
        console.error('Backend health check failed:', error);
        setIsOnline(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkBackend();
  }, []);

  if (isChecking) {
    return null;
  }

  if (!isOnline) {
    return (
      <Alert variant="destructive" className="mb-4">
        <XCircle className="h-4 w-4" />
        <AlertDescription>
          Backend server is not accessible. Please ensure the backend is running on port 5000.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mb-4">
      <CheckCircle className="h-4 w-4" />
      <AlertDescription>
        Backend server is online and accessible.
      </AlertDescription>
    </Alert>
  );
};

export default BackendStatus; 