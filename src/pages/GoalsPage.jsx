import { Target, Plus, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function GoalsPage() {
  const goals = [
    {
      id: '1',
      title: 'Obtain AWS Certified Solutions Architect',
      description: 'Master advanced cloud networking, IAM policies, VPC peering, and serverless best practices.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      progress: 65,
      deadline: 'Oct 31, 2026',
    },
    {
      id: '2',
      title: 'Mentor 2 Junior Engineers to Mid-level',
      description: 'Weekly 1:1 sessions, code review deep dives, and system design walk-throughs.',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      progress: 40,
      deadline: 'Dec 31, 2026',
    },
    {
      id: '3',
      title: 'Publish Tech Blog Post on Distributed Locks',
      description: 'Write comprehensive article detailing Redis Redlock vs Postgres advisory locks.',
      status: 'COMPLETED',
      priority: 'LOW',
      progress: 100,
      deadline: 'Jul 15, 2026',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" /> Career & Learning Goals
          </h1>
          <p className="text-sm text-muted-foreground">
            Set deliberate milestones, track completion, and prepare for performance reviews.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-1.5" /> Create Goal
        </Button>
      </div>

      <div className="space-y-4">
        {goals.map((g) => (
          <Card key={g.id} className="p-5 hover:border-primary/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={g.priority === 'HIGH' ? 'destructive' : 'secondary'}>
                      {g.priority} Priority
                    </Badge>
                    <Badge variant={g.status === 'COMPLETED' ? 'success' : 'default'}>
                      {g.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-base text-foreground pt-1">{g.title}</h3>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {g.deadline}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">{g.description}</p>

              <div className="pt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span className="font-medium">Progress</span>
                  <span className="font-bold text-foreground">{g.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${g.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
