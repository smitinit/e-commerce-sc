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

export function Register() {
  const navigate = useNavigate();

  // get both register and user
  const { register, user } = useUser();

  // initial state
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);

  const handleRegister = async () => {
    // basic validatoin
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
    if (credentials.password !== credentials.confirmPassword) {
      validationErrors.push("Passwords do not match.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    try {
      setIsLoading(true);
      // call the register function
      await register(
        credentials.username,
        credentials.email,
        credentials.password
      );
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
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your credentials below to create a new account!
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link to={"/login"}>Sign In</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={credentials.username}
                onChange={(e) => {
                  setCredentials((prevValue) => {
                    return {
                      ...prevValue,
                      username: e.target.value,
                    };
                  });
                }}
                type="text"
                placeholder="Enter your name..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={credentials.email}
                onChange={(e) => {
                  setCredentials((prevValue) => {
                    return {
                      ...prevValue,
                      email: e.target.value,
                    };
                  });
                }}
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                value={credentials.password}
                onChange={(e) => {
                  setCredentials((prevValue) => {
                    return {
                      ...prevValue,
                      password: e.target.value,
                    };
                  });
                }}
                type="password"
                placeholder="Enter your password..."
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input
                id="confirm-password"
                value={credentials.confirmPassword}
                onChange={(e) => {
                  setCredentials((prevValue) => {
                    return {
                      ...prevValue,
                      confirmPassword: e.target.value,
                    };
                  });
                }}
                type="password"
                placeholder="Re-enter your password..."
                required
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
        <CardFooter className="flex-col gap-2">
          <Button type="button" className="w-full" onClick={handleRegister}>
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
