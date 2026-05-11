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
    <header className="flex items-center justify-between md:hidden w-full bg-gray-100 p-4 border-b">
      <Link href={'/'} className="flex items-center gap-2 md:py-2">
        <Image src={'/images/logo.png'} alt="Logo" width={30} height={30} />
      </Link>
      <nav className="flex items-center">
        <Show when="signed-in">
          <UserButton afterSwitchSessionUrl="/" showName />

          <Sheet>
            <SheetTrigger>
              <Menu className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <SheetHeader>
                <SheetTitle className="hidden">Navigation Menu</SheetTitle>
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={120}
                  height={40}
                  priority
                  className="w-20 h-16"
                />
              </SheetHeader>

              <nav className="px-5">
                <ul className="flex flex-col gap-4">
                  {navLinks.map((item) => {
                    const isActive = item.href === pathname;
                    return (
                      <li
                        key={item.href}
                        className={cn(
                          'rounded-md',
                          isActive ? 'bg-[#5b1cf0] text-white' : 'hover:bg-gray-200',
                        )}
                      >
                        <Link href={item.href} className="flex items-center gap-2 p-2">
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
          <Button asChild className="w-full bg-[#5b1cf0] hover:bg-[#4a16c4]">
            <SignInButton mode="modal">Login</SignInButton>
          </Button>
        </Show>
      </nav>
    </header>
  );
};

export default MobileNav;
