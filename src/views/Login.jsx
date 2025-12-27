import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // จำลองการล็อกอิน: เก็บค่าลง LocalStorage
    localStorage.setItem("isAuthenticated", "true");
    navigate("/"); // ล็อกอินเสร็จส่งไปหน้า Home
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100-vh-64px)] w-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">เข้าสู่ระบบ</CardTitle>
          <CardDescription className="text-center">กรอกอีเมลของคุณเพื่อเข้าใช้งาน</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">อีเมล</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}