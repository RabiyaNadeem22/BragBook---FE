import { BarChart3, TrendingUp, Award, FolderGit2, Target, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export function AnalyticsPage() {
  const categoryData = [
    { name: 'Technical', count: 12, color: '#6366f1' },
    { name: 'Delivery', count: 5, color: '#10b981' },
    { name: 'Leadership', count: 3, color: '#f59e0b' },
    { name: 'Problem Solving', count: 4, color: '#06b6d4' },
  ];

  const monthlyData = [
    { month: 'Jan', achievements: 2 },
    { month: 'Feb', achievements: 3 },
    { month: 'Mar', achievements: 1 },
    { month: 'Apr', achievements: 4 },
    { month: 'May', achievements: 5 },
    { month: 'Jun', achievements: 3 },
    { month: 'Jul', achievements: 4 },
    { month: 'Aug', achievements: 2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" /> Career Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Visual insights into your growth, velocity, and skill evolution over time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Achievements (2026)" value="24" icon={Award} trend={{ text: '+18% vs 2025', positive: true }} />
        <StatCard title="Projects Completed" value="2" icon={FolderGit2} trend={{ text: '100% on schedule', positive: true }} />
        <StatCard title="Goals Met" value="3" icon={Target} trend={{ text: '75% completion rate', positive: true }} />
        <StatCard title="Active Streak" value="8 mos" icon={Calendar} trend={{ text: 'Continuous logging', positive: true }} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Achievements by Month Chart */}
        <Card className="p-5">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base">Achievements Over Time</CardTitle>
            <CardDescription>Monthly recorded wins in 2026</CardDescription>
          </CardHeader>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Bar dataKey="achievements" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-5">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base">Category Distribution</CardTitle>
            <CardDescription>Breakdown by competency area</CardDescription>
          </CardHeader>
          <div className="space-y-4">
            {categoryData.map((c) => (
              <div key={c.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-foreground">{c.name}</span>
                  <span className="text-muted-foreground">{c.count} wins</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(c.count / 24) * 100}%`,
                      backgroundColor: c.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
