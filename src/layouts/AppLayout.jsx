import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Award,
  FolderGit2,
  Lightbulb,
  Target,
  MessageSquareQuote,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';
import { api } from '../api/client';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Achievements', path: '/achievements', icon: Award },
  { name: 'Projects', path: '/projects', icon: FolderGit2 },
  { name: 'Skills', path: '/skills', icon: Lightbulb },
  { name: 'Goals', path: '/goals', icon: Target },
  { name: 'Feedback', path: '/feedback', icon: MessageSquareQuote },
  { name: 'Timeline', path: '/timeline', icon: CalendarDays },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function AppLayout() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking'); // 'healthy' | 'error' | 'checking'

  // Check API health status on mount to verify client-backend connectivity
  useEffect(() => {
    let isMounted = true;
    api.get('/health')
      .then((res) => {
        if (isMounted && res.success) {
          setApiStatus('healthy');
        }
      })
      .catch(() => {
        if (isMounted) setApiStatus('error');
      });
    return () => { isMounted = false; };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-300 lg:static lg:translate-x-0',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-lg text-foreground">BragBook</span>
              <span className="block text-[10px] uppercase font-semibold text-primary tracking-widest">
                Career SaaS
              </span>
            </div>
          </NavLink>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Platform
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-primary-foreground' : 'text-muted-foreground')} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* API Connectivity Status Indicator */}
        <div className="px-4 py-2 mx-3 mb-2 rounded-lg bg-muted/50 border border-border text-xs flex items-center justify-between">
          <span className="text-muted-foreground font-medium">Backend API:</span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            {apiStatus === 'healthy' && (
              <>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-600 dark:text-emerald-400">Connected</span>
              </>
            )}
            {apiStatus === 'checking' && (
              <>
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-spin" />
                <span className="text-amber-600 dark:text-amber-400">Checking...</span>
              </>
            )}
            {apiStatus === 'error' && (
              <>
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span className="text-rose-500">Offline</span>
              </>
            )}
          </span>
        </div>

        {/* User Info / Footer */}
        <div className="border-t border-border p-3">
          <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/60 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User'}
                className="h-9 w-9 rounded-full object-cover border border-border shrink-0"
              />
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground">
                  {user?.name || 'Demo User'}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {user?.jobTitle || 'Developer'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => logout()}
              title="Sign Out"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 sm:px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-input bg-card/60 px-3 py-1.5 text-xs text-muted-foreground w-64 md:w-80 shadow-inner">
              <Search className="h-3.5 w-3.5" />
              <span>Search achievements, projects, tags...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-muted/10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
