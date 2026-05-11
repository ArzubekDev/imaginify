'use client';
import { navLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 bg-gray-100 p-4 h-screen border-r flex-col">
      <div className="flex flex-col h-full gap-4">
        <Link href={'/'} className="mb-6">
          <Image src={'/images/logo.png'} alt="logo" width={100} height={40} priority />
        </Link>

        <nav className="flex-1">
          <ul className="flex flex-col gap-2">
            {navLinks.slice(0, 6).map((item) => {
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
        <ul className="flex flex-col gap-2">
          {navLinks.slice(6).map((item) => {
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
        <li className="">
          <Show when="signed-in">
            <div className="flex items-center gap-2 p-2">
              <UserButton showName/>
            </div>
          </Show>
          <Show when="signed-out">
            <Button asChild className="w-full bg-[#5b1cf0] hover:bg-[#4a16c4]">
              <SignInButton mode="modal">Login</SignInButton>
            </Button>
          </Show>
        </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
