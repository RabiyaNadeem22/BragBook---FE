import { useState } from 'react';
import { Award, Plus, Search, Filter, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

export function AchievementsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" /> Achievements
          </h1>
          <p className="text-sm text-muted-foreground">
            Document your wins, technical accomplishments, and measurable impact.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-1.5" /> Record Achievement
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search achievements by keyword, impact, or metrics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Filter className="h-4 w-4" /> Category
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <ArrowUpDown className="h-4 w-4" /> Sort
            </Button>
          </div>
        </div>
      </Card>

      {/* Achievements List Placeholder */}
      <div className="space-y-4">
        {[
          {
            id: '1',
            title: 'Reduced API response time by 69%',
            category: 'Technical',
            date: '2026-08-15',
            project: 'Payment Infrastructure Modernization',
            impact: 'Reduced average response time from 800ms to 250ms by optimizing indexes and SQL queries.',
            metrics: '69% improvement, 0 dropped queries',
            tags: ['Performance', 'Postgres', 'Optimization'],
          },
          {
            id: '2',
            title: 'Zero-Downtime Payment Gateway Migration',
            category: 'Delivery',
            date: '2026-05-10',
            project: 'Payment Infrastructure Modernization',
            impact: 'Seamlessly switched $12M annual volume to Stripe with zero downtime.',
            metrics: '$45,000 annual merchant fee savings',
            tags: ['Stripe', 'Architecture', 'Reliability'],
          },
          {
            id: '3',
            title: 'Engineered Query Cache Layer for Analytics Portal',
            category: 'Technical',
            date: '2026-07-20',
            project: 'Enterprise Analytics Dashboard',
            impact: 'Decreased primary database CPU load by 54% during peak morning hours.',
            metrics: '54% database CPU relief',
            tags: ['Redis', 'Caching', 'Scale'],
          },
        ].map((item) => (
          <Card key={item.id} className="p-5 hover:border-primary/40 transition-all">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="default">{item.category}</Badge>
                    <span className="text-xs font-medium text-muted-foreground">{item.project}</span>
                    <span className="text-xs text-muted-foreground">• {item.date}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground pt-1">{item.title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{item.impact}</p>
              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      #{t}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {item.metrics}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
