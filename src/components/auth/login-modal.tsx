'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { LogIn } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';
import type { Role } from '@/lib/queries';

interface LoginModalProps {
    roles: Role[];
}

export function LoginModal({ roles }: LoginModalProps) {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="my-3 flex size-14 items-center justify-center gap-0 rounded-full p-0 has-[>svg]:px-0 lg:h-fit lg:w-full lg:justify-between lg:gap-2 lg:px-2 lg:py-2 lg:has-[>svg]:px-2"
                >
                    <div className="flex items-center gap-2">
                        <Avatar className="size-14">
                            <AvatarFallback>
                                <LogIn className="size-7" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="hidden lg:block">
                            <p className="font-semibold text-base">Login</p>
                            <p className="text-muted-foreground text-sm">Sign in to continue</p>
                        </div>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogTitle>{isRegister ? 'Create an account' : 'Login to your account'}</DialogTitle>
                {isRegister ? (
                    <RegisterForm roles={roles} />
                ) : (
                    <LoginForm />
                )}
                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        {isRegister ? 'Already have an account?' : "Don't have an account?"}
                    </span>
                    <Button
                        variant="link"
                        className="h-auto p-0 text-sm"
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister ? 'Login' : 'Register'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 