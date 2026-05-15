'use client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { navLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/dist/client/components/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between md:hidden w-full bg-[#0f0f1a] p-4 border-b border-white/10">

      <Link href="/" className="flex items-center gap-3 px-2">
        <div className="flex h-10.5 w-10.5 items-center justify-center rounded-[14px] bg-[#1e1b4b]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3 L13.5 10 L20 12 L13.5 14 L12 21 L10.5 14 L4 12 L10.5 10 Z"
              fill="#c4b5fd"
              stroke="#7c3aed"
              strokeWidth="0.5"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-[-0.4px] text-white">IMAGINIFY</h1>
          <p className="text-[10px] font-medium tracking-[0.15em] text-[#6d28d9] uppercase">Creative AI</p>
        </div>
      </Link>

      <nav className="flex items-center gap-3">
        <Show when="signed-in">
          <UserButton afterSwitchSessionUrl="/" />

          <Sheet>
            <SheetTrigger>
              <Menu className="h-5 w-5 text-white/70 hover:text-white transition-colors cursor-pointer" />
            </SheetTrigger>

            <SheetContent className="bg-[#0f0f1a] border-l border-white/10 sm:w-64">
              <SheetHeader>
                <SheetTitle className="hidden">Navigation Menu</SheetTitle>
                     <Link href="/" className="flex items-center gap-3 px-2">
        <div className="flex h-10.5 w-10.5 items-center justify-center rounded-[14px] bg-[#1e1b4b]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3 L13.5 10 L20 12 L13.5 14 L12 21 L10.5 14 L4 12 L10.5 10 Z"
              fill="#c4b5fd"
              stroke="#7c3aed"
              strokeWidth="0.5"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-[-0.4px] text-white">IMAGINIFY</h1>
          <p className="text-[10px] font-medium tracking-[0.15em] text-[#6d28d9] uppercase">Creative AI</p>
        </div>
      </Link>
              </SheetHeader>
              <nav className="px-4 mt-2">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((item) => {
                    const isActive = item.href === pathname;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-purple-600 text-white'
                              : 'text-white/60 hover:bg-white/5 hover:text-white'
                          )}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </Show>

        <Show when="signed-out">
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-xl px-4">
            <SignInButton mode="modal">Login</SignInButton>
          </Button>
        </Show>
      </nav>
    </header>
  );
};

export default MobileNav;