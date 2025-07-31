import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AuthTest = () => {
  const { user, token, isAuthenticated, logout } = useAuth();

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Debug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Is Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}
          </div>
          <div>
            <strong>Token:</strong> {token ? "Present" : "Missing"}
          </div>
          <div>
            <strong>User:</strong> {user ? `${user.firstName} ${user.lastName}` : "Not logged in"}
          </div>
          <div>
            <strong>User Email:</strong> {user?.email || "N/A"}
          </div>
          <div>
            <strong>User Role:</strong> {user?.role || "N/A"}
          </div>
          <div>
            <strong>Business:</strong> {user?.business?.name || "N/A"}
          </div>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthTest; 