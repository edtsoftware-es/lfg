import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import Image, { type ImageProps } from 'next/image';

const roleVariants = cva('', {
  variants: {
    variant: {
      FRONTEND: '/webo.png',
      BACKEND: '/webo.png',
      PM: '/webo.png',
      DESIGNER: '/webo.png',
      DEVOPS: '/webo.png',
      FULLSTACK: '/webo.png',
      MARKETING: '/webo.png',
      SEO: '/webo.png',
      default: '/webo.png',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export function RoleImage({
  variant,
  className,
  ...props
}: Partial<ImageProps> & VariantProps<typeof roleVariants>) {
  return (
    <Image
      alt={`${variant?.toUpperCase() ?? 'Default'} role image`}
      src={roleVariants({ variant })}
      priority={true}
      width={32}
      height={32}
      className={cn(
        'h-auto w-auto rounded-full bg-primary p-1 dark:bg-transparent',
        className
      )}
      {...props}
    />
  );
}
