import {
  Award,
  FolderGit2,
  Lightbulb,
  Target,
  Plus,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';

  const stats = [
    { title: 'Total Achievements', value: '24', icon: Award, trend: { text: '+4 this month', positive: true }, description: 'Recorded impact & deliverables' },
    { title: 'Active Projects', value: '8', icon: FolderGit2, trend: { text: '2 completed', positive: true }, description: 'High-impact initiatives' },
    { title: 'Tracked Skills', value: '15', icon: Lightbulb, trend: { text: '6 Expert level', positive: true }, description: 'Tech & leadership competencies' },
    { title: 'Active Goals', value: '4', icon: Target, trend: { text: '1 due soon', positive: false }, description: 'Q3 & Q4 career milestones' },
  ];

  const recentAchievements = [
    {
      id: '1',
      title: 'Reduced API response time by 69%',
      category: 'Technical',
      date: 'Aug 15, 2026',
      impact: 'Decreased 95th percentile latency from 800ms to 250ms.',
      project: 'Payment Infrastructure',
      badge: 'success',
    },
    {
      id: '2',
      title: 'Zero-Downtime Payment Gateway Migration',
      category: 'Delivery',
      date: 'May 10, 2026',
      impact: 'Saved $45k annually in merchant gateway fees.',
      project: 'Payment Infrastructure',
      badge: 'info',
    },
    {
      id: '3',
      title: 'Engineered Query Cache Layer for Analytics Portal',
      category: 'Technical',
      date: 'Jul 20, 2026',
      impact: 'Decreased primary database CPU load by 54%.',
      project: 'Enterprise Analytics',
      badge: 'default',
    },
  ];

  const currentGoals = [
    { id: '1', title: 'Obtain AWS Certified Solutions Architect', priority: 'High', progress: 65, deadline: 'Oct 31, 2026' },
    { id: '2', title: 'Mentor 2 Junior Engineers to Mid-level', priority: 'Medium', progress: 40, deadline: 'Dec 31, 2026' },
    { id: '3', title: 'Publish Tech Blog Post on Distributed Locks', priority: 'Low', progress: 100, deadline: 'Completed' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> {user?.jobTitle || 'Your workspace'}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Here is your career impact summary. You have recorded <span className="font-semibold text-foreground">24 achievements</span> across <span className="font-semibold text-foreground">8 projects</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link to="/achievements">
                <Plus className="h-4 w-4 mr-1.5" />
                Add Achievement
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Recent Achievements & Timeline Preview */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">Recent Achievements</CardTitle>
                <CardDescription>Highlights from your recent technical and leadership work</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/achievements" className="text-xs text-primary flex items-center gap-1">
                  View All <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAchievements.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col gap-2 rounded-xl border border-border bg-card/60 p-4 transition-all hover:border-primary/40 hover:bg-muted/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="default">{item.category}</Badge>
                      <span className="text-xs text-muted-foreground">{item.project}</span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 shrink-0">
                      <Calendar className="h-3 w-3" /> {item.date}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-medium text-foreground">Impact: </span>
                    {item.impact}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Active Goals & Milestone Tracking */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">Current Goals</CardTitle>
                <CardDescription>Professional milestones & skills</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/goals" className="text-xs text-primary flex items-center gap-1">
                  Manage <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentGoals.map((goal) => (
                <div key={goal.id} className="space-y-2 rounded-lg border border-border p-3 bg-card/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground truncate pr-2">{goal.title}</span>
                    <Badge variant={goal.progress === 100 ? 'success' : goal.priority === 'High' ? 'destructive' : 'secondary'}>
                      {goal.progress === 100 ? 'Done' : goal.priority}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{goal.deadline}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="bg-gradient-to-br from-card to-muted/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Shortcuts</CardTitle>
              <CardDescription>Fast actions to record your career wins</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start text-xs" asChild>
                <Link to="/achievements">
                  <Award className="h-3.5 w-3.5 mr-1.5 text-primary" /> + Win
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="justify-start text-xs" asChild>
                <Link to="/projects">
                  <FolderGit2 className="h-3.5 w-3.5 mr-1.5 text-primary" /> + Project
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="justify-start text-xs" asChild>
                <Link to="/skills">
                  <Lightbulb className="h-3.5 w-3.5 mr-1.5 text-primary" /> + Skill
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="justify-start text-xs" asChild>
                <Link to="/feedback">
                  <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-primary" /> + Feedback
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
