import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlayCircle, Users, User, Home, Info, LogIn } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "الرئيسية", path: "/", icon: Home },
    { name: "من نحن", path: "/about", icon: Info },
    { name: "الفريق", path: "/team", icon: Users },
    { name: "الفيديوهات", path: "/videos", icon: PlayCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">فيديو تيم</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4 ml-2" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">
                <LogIn className="w-4 h-4 ml-2" />
                تسجيل الدخول
              </Link>
            </Button>
            <Button size="sm" className="gradient-primary" asChild>
              <Link to="/dashboard">لوحة التحكم</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;