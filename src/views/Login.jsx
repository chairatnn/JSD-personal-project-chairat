import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // จำลองการล็อกอิน: เก็บค่าลง LocalStorage
    localStorage.setItem("isAuthenticated", "true");
    navigate("/"); // ล็อกอินเสร็จส่งไปหน้า Home
  };

  return (
    <div className="bg-gradient-to-br from-sage-dark to-blue-600 flex items-center justify-center min-h-[calc(100vh-64px)] w-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center text-black">
            Welcome to mini-ERP for StartUp.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail:</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password:</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
