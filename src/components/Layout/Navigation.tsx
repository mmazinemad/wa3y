import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Info, Users, Video, LogIn, User as UserIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { name: "الرئيسية", path: "/", icon: Home },
    { name: "من نحن", path: "/about", icon: Info },
    { name: "الفريق", path: "/team", icon: Users },
    { name: "الفيديوهات", path: "/videos", icon: Video },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <img src="/icon.png" alt="logo" className="w-6 h-6" />
            </div>
            <span className="text-xl flex items-center justify-center font-bold text-foreground">
              واعي | Wise
            </span>
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

          {/* Login/User Button */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/dashboard">
                    <UserIcon className="w-4 h-4 ml-2" />
                    لوحة التحكم
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 ml-2" />
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <Button variant="default" className="gradient-primary" asChild>
                <Link to="/login">
                  <LogIn className="w-4 h-4 ml-2" />
                  تسجيل الدخول
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
