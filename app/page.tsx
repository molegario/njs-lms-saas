'use client'
import { Button, buttonVariants } from '@/components/ui/button';
// import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Home() {
  // const { setTheme } = useTheme();
  // setTheme('system')
  return (
    <div>
      <p className="text-3xl font-medium text-sky-700">Hello world</p>
      <Button variant="outline">Button</Button>
      <Button>Button</Button>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Click me
      </Link>
    </div>
  );
}
