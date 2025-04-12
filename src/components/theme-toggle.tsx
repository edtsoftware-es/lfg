'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { DropdownMenuItem } from './ui/dropdown-menu';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  if (theme === 'light') {
    return (
      <DropdownMenuItem onClick={() => setTheme('dark')}>
        <Sun className="mr-2 size-4" />
        <span>Light mode</span>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem onClick={() => setTheme('light')}>
      <Moon className="mr-2 size-4" />
      <span>Dark mode</span>
    </DropdownMenuItem>
  );
}
