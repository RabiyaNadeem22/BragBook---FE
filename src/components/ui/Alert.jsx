import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Alert({ variant = 'error', children, className }) {
  const isError = variant === 'error';

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm',
        isError
          ? 'border-destructive/30 bg-destructive/10 text-destructive'
          : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
        className
      )}
    >
      {isError ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}
