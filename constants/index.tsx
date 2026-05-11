import {
  Camera,
  House,
  Image,
  Palette,
  ScanBarcode,
  ShoppingBag,
  Sparkles,
  User,
} from 'lucide-react';
import React from 'react';

type TNavLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export const navLinks: TNavLink[] = [
  {
    label: 'Home',
    href: '/',
    icon: <House />,
  },
  {
    label: 'Image Restore',
    href: '/transformations/add/restore',
    icon: <Image />,
  },
  {
    label: 'Generative Fill',
    href: '/transformations/add/generative-fill',
    icon: <Sparkles />,
  },
  {
    label: 'Object Remove',
    href: '/transformations/add/remove',
    icon: <ScanBarcode />,
  },
  {
    label: 'Object Recolor',
    href: '/transformations/add/recolor',
    icon: <Palette />,
  },
  {
    label: 'Background Remove',
    href: '/transformations/add/background-remove',
    icon: <Camera />,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: <User />,
  },
  {
    label: 'Buy Credits',
    href: '/buy-credits',
    icon: <ShoppingBag />,
  },
];
