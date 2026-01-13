import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/use-user";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

function validateEmail(email: string) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

export function UserProfile() {
  const { user, edit } = useUser();

  const [credentials, setFormData] = useState({
    username: user!.username,
    email: user!.email,
    password: user!.token,
  });
  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSave = async () => {
    const validationErrors: string[] = [];

    if (!credentials.username.trim()) {
      validationErrors.push("Username is required.");
    }

    if (!credentials.email.trim() || !validateEmail(credentials.email)) {
      validationErrors.push("Please enter a valid email address.");
    }

    if (credentials.password.length < 8 || credentials.password.length > 15) {
      validationErrors.push(
        "Password length must be between 8 and 15 characters."
      );
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    try {
      setIsLoading(true);
      await edit(credentials.username, credentials.email, credentials.password);
      setIsEditing(false);
    } catch (error) {
      setErrors([
        error instanceof Error ? error.message : "Failed to update profile",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user!.username,
      email: user!.email,
      password: user!.token,
    });

    setErrors([]);

    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-center h-[85vh]">
      <Card className="w-full max-w-md bg-transparent  shadow-none">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              value={credentials?.username}
              required
              id="name"
              type="text"
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...credentials, username: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              type="email"
              value={credentials.email}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...credentials, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              required
              id="password"
              type={isEditing ? "text" : "password"}
              value={credentials?.password}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...credentials, password: e.target.value })
              }
            />
          </div>

          {errors.length > 0 && (
            <ul className="text-destructive text-sm list-disc space-y-1">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}

          {!isEditing ? (
            <div className="flex items-center justify-end gap-2">
              <Button asChild>
                <Link to={"/products"}>Go back to Products Page</Link>
              </Button>
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-2">
              <Button onClick={handleSave}>
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
