import { MessageSquareQuote, Plus, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function FeedbackPage() {
  const feedbackList = [
    {
      id: '1',
      content: 'Alex led the payment migration with incredible attention to detail. Not a single payment was dropped during cutover.',
      source: 'VP of Engineering',
      category: 'Delivery & Reliability',
      date: 'May 20, 2026',
    },
    {
      content: 'The query optimizations on the search API completely unblocked our mobile launch. Exceptional deep-dive debugging skills.',
      source: 'Principal Architect',
      category: 'Technical Excellence',
      date: 'Aug 16, 2026',
    },
    {
      content: 'Alex has been an outstanding mentor. The structured code review feedback helped me step up to owning my first microservice.',
      source: 'Junior Software Engineer',
      category: 'Mentorship',
      date: 'Jul 30, 2026',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <MessageSquareQuote className="h-6 w-6 text-primary" /> Feedback & Praise
          </h1>
          <p className="text-sm text-muted-foreground">
            Preserve peer reviews, manager feedback, and client testimonials for appraisal time.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-1.5" /> Record Feedback
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {feedbackList.map((f, idx) => (
          <Card key={idx} className="flex flex-col justify-between p-5 relative overflow-hidden">
            <Quote className="absolute right-4 bottom-4 h-16 w-16 text-muted/20 pointer-events-none" />
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <Badge variant="default">{f.category}</Badge>
                <span className="text-xs text-muted-foreground">{f.date}</span>
              </div>
              <p className="text-sm text-foreground/90 italic leading-relaxed">
                "{f.content}"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 relative z-10">
              <p className="text-xs font-semibold text-foreground">{f.source}</p>
              <p className="text-[11px] text-muted-foreground">Internal Review</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
