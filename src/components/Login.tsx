import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/use-user";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// validate email function with the help of regex
function validateEmail(email: string) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

export function Login() {
  const navigate = useNavigate();
  // get both login and user
  const { login, user } = useUser();

  // initial state
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleLogin = async () => {
    // basic validation
    const validationErrors: string[] = [];

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
      // call the login function
      await login(credentials.email, credentials.password);
      setIsLoading(false);
    } catch (error) {
      setErrors([error instanceof Error ? error.message : "Login failed"]);
      setIsLoading(false);
    }
  };

  // redirect if already logged in
  useEffect(() => {
    if (user?.isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>

          <CardAction>
            <Button variant="link" asChild>
              <Link to={"/register"}>Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials((c) => ({ ...c, email: e.target.value }))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password..."
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((c) => ({ ...c, password: e.target.value }))
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
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="button" onClick={handleLogin}>
            {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
