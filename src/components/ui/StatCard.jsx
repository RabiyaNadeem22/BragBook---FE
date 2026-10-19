import { Card } from './Card';
import { cn } from '../../utils/cn';

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}) {
  return (
    <Card className={cn('p-5 transition-all duration-200 hover:shadow-md hover:border-primary/30', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
        {trend && (
          <span
            className={cn(
              'text-xs font-semibold',
              trend.positive ? 'text-emerald-500' : 'text-amber-500'
            )}
          >
            {trend.text}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </Card>
  );
}
