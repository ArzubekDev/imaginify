'use client'
import { navLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { Show, SignInButton } from '@clerk/nextjs';
import { usePathname } from 'next/dist/client/components/navigation';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="flex flex-col size-full gap-4">
        <Link href={'/'} className="sidebar-logo">
          <Image src={'/images/logo.png'} alt="logo" width={40} height={30} />
        </Link>
        <Show when="signed-out">
          <SignInButton>
            <ul className="sidebar-nav_elements">
              {navLinks.map((item) => {
                const isActive = item.href === pathname;
                return (
                  <li key={item.href} className={cn(`sidebar-nav_element group ${isActive ? 'bg-purple-500 text-white' : 'text-gray-700'}`)}>
                    <Link href={item.href} className="sidebar-nav_element-link">
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SignInButton>
        </Show>
        <nav className="sidebar-nav"></nav>
      </div>
    </aside>
  );
};

export default Sidebar;
