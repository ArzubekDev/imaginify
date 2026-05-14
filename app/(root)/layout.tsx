import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/Sidebar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
<main className="flex min-h-screen bg-[#0f0f11] text-white">
  <Sidebar />

  <div className="flex-1 overflow-x-hidden">
    <MobileNav />

    <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
      {children}
    </div>
  </div>
</main>
  );
};

export default layout;
