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
    <aside className="hidden h-screen w-[290px] border-r border-white/10 bg-[#09090b] md:flex">
      <div className="flex w-full flex-col px-5 py-6">
        {/* LOGO */}
        <Link
          href="/"
          className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-black text-white shadow-lg">
            I
          </div>

          <div>
            <h1 className="text-lg font-black tracking-tight text-white">Imaginify</h1>

            <p className="text-xs text-zinc-400">AI Image Platform</p>
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
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)]'
                        : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white',
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
        <div className="mt-6 border-t border-white/10 pt-6">
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
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)]'
                        : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white',
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
                    <span className="text-xs text-zinc-500">@{user?.username}</span>
                  </div>
                </div>
              </Show>

              <Show when="signed-out">
                <Button
                  asChild
                  className="h-12 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)] transition-all duration-300 hover:scale-[1.02] hover:from-indigo-500 hover:to-violet-500"
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
