import { Toaster } from '@/components/ui/toaster';
import App from './_home/app';

export default function Home() {
  return (
    <div className='flex h-screen w-screen bg-background text-gray-900 font-sans'>
      <App />
      <Toaster />
    </div>
  );
}
