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
    href: '/transformations/add/fill',
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
    href: '/transformations/add/bremove',
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

export type TTransformationType = {
  type: string;
  title: string;
  subtitle: string;
  config: {
    restore?: boolean;
    bremove?: boolean;
    fill?: boolean;
    recolor?: boolean;
    remove?: boolean;
  };
  icon: string;
};

export const transformationTypes: Record<string, TTransformationType> = {
  restore: {
    type: 'restore',
    title: 'Image Restore',
    subtitle: 'Restore old or damaged photos to their former glory with our AI-powered image restoration tool.',
    config: { restore: true },
    icon: "image.svg"
  },
  bremove: {
    type: 'background-remove',
    title: 'Background Remove',
    subtitle: 'Easily remove backgrounds from your images with our AI-powered background removal tool.',
    config: { bremove: true },
    icon: "background-remove.svg"
  },
    fill: {
    type: 'fill',
    title: 'Generative Fill',
    subtitle: 'Fill in missing parts of your images with our AI-powered generative fill tool.', 
    config: { fill: true },
    icon: "generative-fill.svg"
  },
  remove: {
    type: 'remove',
    title: 'Object Remove',
    subtitle: 'Identify and eliminate unwanted objects from your images with precision.',
    config: { remove: true }, 
    icon: "scan.svg"
  },
  recolor: {
    type: 'recolor',
    title: 'Object Recolor',
    subtitle: 'Change the color of specific objects within your images instantly.',
    config: { recolor: true },
    icon: "palette.svg"
  }
};