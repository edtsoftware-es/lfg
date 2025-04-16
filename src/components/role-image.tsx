import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import Image, { type ImageProps } from 'next/image';

const roleVariants = cva('', {
  variants: {
    variant: {
      FRONTEND: '/webos/WEBO1.webp',
      BACKEND: '/webos/WEBO2.webp',
      PM: '/webos/WEBO3.webp',
      DESIGNER: '/webos/WEBO4.webp',
      DEVOPS: '/webos/WEBO5.webp',
      FULLSTACK: '/webos/WEBO6.webp',
      MARKETING: '/webos/WEBO7.webp',
      SEO: '/webos/WEBO8.webp',
      default: '/webos/WEBO9.webp',
      WEBO1: '/webos/WEBO1.webp',
      WEBO2: '/webos/WEBO2.webp',
      WEBO3: '/webos/WEBO3.webp',
      WEBO4: '/webos/WEBO4.webp',
      WEBO5: '/webos/WEBO5.webp',
      WEBO6: '/webos/WEBO6.webp',
      WEBO7: '/webos/WEBO7.webp',
      WEBO8: '/webos/WEBO8.webp',
      WEBO9: '/webos/WEBO9.webp',
      WEBO10: '/webos/WEBO10.webp',
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
      width={30}
      height={30}
      className={cn(
        'h-auto w-auto rounded-full bg-primary bg-transparent p-1',
        className
      )}
      {...props}
    />
  );
}
