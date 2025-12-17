import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogIn, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo login - in production, validate against your backend
    if (credentials.username && credentials.password) {
      toast.success('Welcome to UniTrack!');
      navigate('/dashboard');
    } else {
      toast.error('Please enter your credentials');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-center animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="h-24 w-24 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center shadow-glow">
              <GraduationCap className="h-14 w-14 text-accent" />
            </div>
          </div>
          <h1 className="font-heading text-4xl font-bold text-primary-foreground mb-4">
            UniTrack
          </h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Comprehensive Student Management System for modern educational institutions. 
            Streamline enrollment, track progress, and manage student records with ease.
          </p>
          <div className="mt-12 flex justify-center gap-8 text-primary-foreground/60 text-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">500+</div>
              <div>Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">12</div>
              <div>Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">98%</div>
              <div>Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="font-heading text-2xl font-bold text-foreground">UniTrack</span>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-card p-8 border border-border">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground">Welcome Back</h2>
              <p className="text-muted-foreground mt-2">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-accent hover:text-accent/80 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Demo credentials: any username & password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
