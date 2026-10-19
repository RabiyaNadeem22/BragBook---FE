import { CalendarDays, Filter, Rocket, Zap, Smartphone, Trophy, BookOpen } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function TimelinePage() {
  const timelineData = [
    {
      year: '2026',
      months: [
        {
          name: 'August',
          items: [
            { icon: Rocket, title: 'Payment integration shipped to production', project: 'Payment Infrastructure', category: 'Delivery' },
            { icon: Zap, title: 'API performance improved by 69% on product search', project: 'Payment Infrastructure', category: 'Technical' },
          ],
        },
        {
          name: 'July',
          items: [
            { icon: Trophy, title: 'Engineered query cache layer for analytics portal', project: 'Analytics Dashboard', category: 'Technical' },
            { icon: BookOpen, title: 'Published article on distributed locks and concurrency', project: 'Personal', category: 'Learning' },
          ],
        },
        {
          name: 'June',
          items: [
            { icon: Smartphone, title: 'Architected mobile banking authentication API', project: 'Mobile Banking', category: 'Problem Solving' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" /> Career Timeline
          </h1>
          <p className="text-sm text-muted-foreground">
            A chronological timeline of your career milestones and achievements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1.5" /> Filter by Year
          </Button>
        </div>
      </div>

      <div className="space-y-8 pl-4 border-l-2 border-primary/20">
        {timelineData.map((yearGroup) => (
          <div key={yearGroup.year} className="space-y-6">
            <div className="flex items-center gap-2 -ml-7">
              <span className="flex h-6 items-center rounded-full bg-primary px-3 text-xs font-bold text-primary-foreground shadow-sm">
                {yearGroup.year}
              </span>
            </div>

            {yearGroup.months.map((month) => (
              <div key={month.name} className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {month.name}
                </h3>
                <div className="space-y-3">
                  {month.items.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <Card key={idx} className="p-4 hover:border-primary/40 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                              <Badge variant="default" className="text-[10px]">{item.category}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{item.project}</p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
