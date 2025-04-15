'use client';

import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import type { MouseEvent } from 'react';

export function RequestActionButtons() {
  const handleButtonClick = (
    e: MouseEvent<HTMLButtonElement>,
    callback: () => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  return (
    <>
      <Button
        variant="outline"
        className="z-20 h-12.5 w-full shrink gap-1 rounded-lg bg-transparent shadow-none hover:border-primary active:border-primary sm:w-28 dark:bg-transparent dark:hover:border-primary"
        onClick={(e) => handleButtonClick(e, () => console.log('Accept'))}
      >
        <Check className="size-4 text-primary" />
        Accept
      </Button>
      <Button
        variant="outline"
        className="h-12.5 w-full shrink gap-1 rounded-lg bg-transparent shadow-none hover:border-destructive active:border-destructive sm:w-28 dark:bg-transparent dark:hover:border-destructive"
        onClick={(e) => handleButtonClick(e, () => console.log('Reject'))}
      >
        <X className="size-4 text-destructive" />
        Reject
      </Button>
    </>
  );
}
