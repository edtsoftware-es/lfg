import { getRoles } from '@/lib/queries';
import { LoginModal } from './login-modal';

export async function LoginModalWrapper() {
    const roles = await getRoles();
    return <LoginModal roles={roles} />;
} 