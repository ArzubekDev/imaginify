import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="flex flex-col size-full gap-4">
        <Link href={'/'} className="sidebar-logo">
          <Image src={'/images/logo.png'} alt="logo" width={100} height={100} />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
