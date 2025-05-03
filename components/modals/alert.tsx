import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { AlertCircle, CheckCircle2, Clock, Ban, ShieldAlert } from 'lucide-react';
// import { cn } from '@/lib/utils';

interface AlertProps {
  title: string;
  description?: string;
  icon?: 'error' | 'success' | 'warning' | 'time' | 'denied';
  actionLink?: string;
  actionText?: string;
}

const iconMap = {
  error: <AlertCircle className="h-16 w-16 text-destructive" strokeWidth={1.5} />,
  success: <CheckCircle2 className="h-16 w-16 text-emerald-500" strokeWidth={1.5} />,
  warning: <ShieldAlert className="h-16 w-16 text-amber-500" strokeWidth={1.5} />,
  time: <Clock className="h-16 w-16 text-blue-500" strokeWidth={1.5} />,
  denied: <Ban className="h-16 w-16 text-rose-500" strokeWidth={1.5} />,
};

const Alert = ({ 
  title, 
  description, 
  icon = 'error',
  actionLink = '/',
  actionText = 'Back to Home'
}: AlertProps) => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md border-none bg-background shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="rounded-full bg-muted p-4">
              {iconMap[icon]}
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
              {description && (
                <p className="text-muted-foreground">
                  {description}
                </p>
              )}
            </div>

            <Button asChild className="w-full max-w-xs" size="lg">
              <Link href={actionLink}>
                {actionText}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;