import AuthCheck from '@/components/auth-check';
import Dashboard from '@/components/dashboard';

export default function Home() {
  return (
    <AuthCheck>
      <Dashboard />
    </AuthCheck>
  );
}