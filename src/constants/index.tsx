import type React from 'react';
import {
  Cpu,
  Layout,
  Briefcase,
  Palette,
  Code,
  Users,
  Smartphone,
} from 'lucide-react';
import type { Role } from '@/types';

export const roleConfig: Record<
  Role,
  { icon: React.ReactNode; color: string }
> = {
  FRONTEND: {
    icon: <Layout className="h-4 w-4" />,
    color: 'from-pink-500 to-purple-500',
  },
  BACKEND: {
    icon: <Cpu className="h-4 w-4" />,
    color: 'from-blue-500 to-cyan-500',
  },
  PM: {
    icon: <Briefcase className="h-4 w-4" />,
    color: 'from-amber-500 to-orange-500',
  },
  DESIGNER: {
    icon: <Palette className="h-4 w-4" />,
    color: 'from-rose-500 to-pink-500',
  },
  DEVOPS: {
    icon: <Code className="h-4 w-4" />,
    color: 'from-indigo-500 to-blue-500',
  },
  FULLSTACK: {
    icon: <Users className="h-4 w-4" />,
    color: 'from-emerald-500 to-teal-500',
  },
  MOBILE: {
    icon: <Smartphone className="h-4 w-4" />,
    color: 'from-lime-500 to-emerald-500',
  },
};
