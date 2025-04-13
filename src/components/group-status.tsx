import { cva, type VariantProps } from 'class-variance-authority';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import type { GroupStateType } from '@/db/schema';

const statusVariants = cva('', {
  variants: {
    status: {
      OPEN: 'bg-primary',
      ONGOING: 'bg-on-going',
      CLOSED: 'bg-closed',
      REBUILD: 'bg-rebuild',
      DONE: 'bg-done',
      default: 'bg-foreground',
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

export function GroupStatusAbsolute({
  status,
}: VariantProps<typeof statusVariants> & {
  status: GroupStateType;
}) {
  return (
    <div className="group absolute top-0 right-0">
      <div className="relative">
        <div
          className={cn(
            statusVariants({ status }),
            'absolute top-0 right-0 h-5 w-1 transition-opacity duration-300 group-hover:opacity-0 group-active:opacity-0'
          )}
        />
        <Badge
          variant="outline"
          className={cn(
            statusVariants({ status }),
            'absolute top-0 right-0 translate-x-full transform border-0 bg-clip-text py-1 font-black text-transparent opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-active:translate-x-0 group-active:opacity-100'
          )}
        >
          {status}
        </Badge>
      </div>
    </div>
  );
}

export function GroupStatus({
  status,
}: VariantProps<typeof statusVariants> & {
  status: GroupStateType;
}) {
  return (
    <div className="flex items-center">
      <div className={cn(statusVariants({ status }), 'h-6 w-1')} />
      <Badge
        variant="outline"
        className={cn(
          statusVariants({ status }),
          'border-0 bg-clip-text py-0 font-black text-base text-transparent'
        )}
      >
        {status}
      </Badge>
    </div>
  );
}
