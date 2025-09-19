import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate login process (replace with actual Supabase auth)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, show success
      console.log("تسجيل دخول بالبيانات:", { email, password });
      
      // Redirect would happen here
      // navigate("/dashboard");
      
    } catch (err) {
      setError("خطأ في تسجيل الدخول. يرجى التحقق من بياناتك والمحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 space-x-reverse mb-6">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ف</span>
            </div>
            <span className="text-2xl font-bold text-foreground">فيديو تيم</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">
            أهلاً بك مرة أخرى
          </h2>
          <p className="text-muted-foreground">
            سجل دخولك للوصول إلى لوحة التحكم
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-center">تسجيل الدخول</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10"
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 pl-10"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <label htmlFor="remember" className="mr-2 text-sm text-muted-foreground">
                    تذكرني
                  </label>
                </div>
                
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  نسيت كلمة المرور؟
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full gradient-primary" 
                disabled={isLoading}
              >
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <span className="text-muted-foreground">ليس لديك حساب؟ </span>
              <Link to="/register" className="text-primary hover:underline font-medium">
                إنشاء حساب جديد
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Back to Home */}
        <div className="text-center">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للرئيسية
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;