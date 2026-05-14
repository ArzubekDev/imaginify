'use client';

import { navLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { Show, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const Sidebar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72.5 border-r border-white/10 bg-[#09090b] md:flex py-5">
      <div className="flex w-full flex-col px-5 py-6">
        {/* LOGO */}
       <Link
  href="/"
  className="mb-5 flex items-center gap-3 px-2 pb-3"
>
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
    <h1 className="text-lg font-bold tracking-[-0.4px] text-white">
      IMAGINIFY
    </h1>
    <p className="text-[10px] font-medium tracking-[0.15em] text-[#6d28d9] uppercase">
      Creative AI
    </p>
  </div>
</Link>

        {/* TOP NAV */}
        <nav className="">
          <div className="mb-4 px-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Main Menu
            </p>
          </div>

          <ul className="flex flex-col gap-2">
            {navLinks.slice(0, 6).map((item) => {
              const isActive = item.href === pathname;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex items-center gap-4 rounded-2xl px-2 py-1 transition-all duration-300',
                      isActive
                        ? 'bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)]'
                        : 'text-zinc-400 hover:bg-white/4 hover:text-white',
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-xl transition-all duration-300',
                        isActive ? 'bg-white/15' : 'bg-zinc-900 group-hover:bg-zinc-800',
                      )}
                    >
                      {item.icon}
                    </div>

                    <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* BOTTOM NAV */}
        <div className="mt-auto border-t border-white/10 pt-6">
          <ul className="flex flex-col gap-2">
            {navLinks.slice(6).map((item) => {
              const isActive = item.href === pathname;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex items-center gap-4 rounded-2xl px-2 py-1 transition-all duration-300',
                      isActive
                        ? 'bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)]'
                        : 'text-zinc-400 hover:bg-white/4 hover:text-white',
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-xl transition-all duration-300',
                        isActive ? 'bg-white/15' : 'bg-zinc-900 group-hover:bg-zinc-800',
                      )}
                    >
                      {item.icon}
                    </div>

                    <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                  </Link>
                </li>
              );
            })}

            {/* AUTH */}
            <li className="mt-4">
              <Show when="signed-in">
                <div className="flex items-center gap-3">
                  <UserButton afterSwitchSessionUrl="/" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-200">{user?.fullName}</span>
                    <span className="text-xs text-zinc-500">
                      {user?.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </div>
              </Show>

              <Show when="signed-out">
                <Button
                  asChild
                  className="h-12 w-full rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)] transition-all duration-300 hover:scale-[1.02] hover:from-indigo-500 hover:to-violet-500"
                >
                  <SignInButton mode="modal">Login</SignInButton>
                </Button>
              </Show>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
