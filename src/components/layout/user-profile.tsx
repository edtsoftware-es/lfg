import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/actions/auth';
import { getUser, getUserProfile } from '@/lib/queries';
import { LogOut, Settings } from 'lucide-react';

export async function UserProfile() {
  const user = await getUser();
  const userProfile = user ? await getUserProfile(user.id) : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="my-3 flex size-14 items-center justify-center gap-0 rounded-full p-0 has-[>svg]:px-0 lg:h-fit lg:w-full lg:justify-between lg:gap-2 lg:px-2 lg:py-2 lg:has-[>svg]:px-2"
        >
          <div className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage
                src={userProfile?.icon || 'https://github.com/shadcn.png'}
                alt={userProfile?.name || 'User'}
              />
              <AvatarFallback className="text-xl">
                {userProfile?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="hidden lg:block">
              <p className="font-semibold text-base">
                {userProfile?.name || 'User'}
              </p>
              <p className="text-start text-muted-foreground text-sm">
                @{userProfile?.userName || 'username'}
              </p>
            </div>
          </div>
          <Settings className="mr-4 hidden size-4 lg:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Settings className="mr-2 size-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <ThemeToggle />
        <DropdownMenuSeparator />
        <form action={signOut}>
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full">
              <LogOut className="mr-2 size-4" />
              <span>Log out</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
