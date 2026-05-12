import { aspectRatioOptions } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import qs from 'qs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(error.message);
  } else if (typeof error === 'string') {
    console.error(error);
    throw new Error(error);
  } else {
    console.error('An unknown error occurred');
    throw new Error('An unknown error occurred');
  }
};

const shimer = (w: number, h: number) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#E0E0E0"/>
  <rect id="shimmer" width="${w}" height="${h}" fill="url(#gradient)"/>
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#E0E0E0" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#C0C0C0" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#E0E0E0" stop-opacity="0.5"/>
    </linearGradient>
  </defs>
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export const dataURL = `data:image/svg+xml;base64,${toBase64(shimer(1000, 1000))}`;

export const formUrlQuery = ({ searchParams, key, value }: formUrlQueryParams) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };
  return `${window.location.pathname}?${qs.stringify(params, { skipNulls: true })}`;
};

interface formUrlQueryParams {
  searchParams: URLSearchParams;
  key: string;
  value: string | number | boolean | null;
}

export type AspectRatioKey = keyof typeof aspectRatioOptions;

export const getImageSize = (type: string, image: any, dimension: 'width' | 'height'): any => {
  if (type === 'fill') {
    return aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] || 1000;
  }
  return image?.[dimension] || 1000
};

export const debounce = <T extends (...args: unknown[]) => unknown>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const deepMergeObjects = (obj1: any, obj2: any) => {
  let output = { ...obj1 };

  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === 'object' &&
        obj2[key] &&
        typeof obj2[key] === 'object'
      ) {
        output[key] = deepMergeObjects(obj1[key], obj2[key]);
      } else {
        output[key] = obj2[key];
      }
    }
  }
};
