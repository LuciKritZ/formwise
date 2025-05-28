import { Space_Grotesk } from 'next/font/google';

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // 👈 All available weights
  variable: '--font-space-grotesk', // Optional if you're using Tailwind or CSS vars
});
