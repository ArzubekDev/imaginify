import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/Sidebar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen">
      <MobileNav/>
      <Sidebar/>
      <div className="flex-1">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default layout;
