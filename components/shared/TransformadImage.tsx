'use client'

import { dataURL, debounce, download, getImageSize } from "@/lib/utils";
import { Download, Loader2 } from "lucide-react";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

const getCldProps = (config: any) => {
  const props: any = {};
  if (config?.restore) props.restore = true;
  if (config?.bremove) props.removeBackground = true;
  if (config?.fill) props.fillBackground = true;
  if (config?.remove) props.remove = config.remove;
  if (config?.recolor) props.recolor = config.recolor;
  return props;
};

export default function TransformedImage({
  image, type, title, transformationConfig,
  isTransforming, setIsTransforming, hasDownload = false
}: TransfromedImageProps) {
  const downloadHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    download(getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
      ...transformationConfig
    }), title);
  };

  const { width, height, fill, ...safeConfig } = transformationConfig || {};

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/40">
          Transformed
        </h3>
        {hasDownload && (
          <button
            onClick={downloadHandler}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative overflow-hidden rounded-xl border border-white/10">
          <CldImage
            width={getImageSize(type, image, 'width')}
            height={getImageSize(type, image, 'height')}
            src={image?.publicId}
            alt={image?.title || 'Transformed image'}
            sizes="(max-width: 767px) 100vw, 50vw"
            placeholder={dataURL as PlaceholderValue}
            className="w-full object-cover"
            onLoad={() => setIsTransforming && setIsTransforming(false)}
            onError={() => {
              debounce(() => setIsTransforming && setIsTransforming(false), 8000)();
            }}
            {...getCldProps(transformationConfig)}
          />

          {isTransforming && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-black/60 backdrop-blur-sm">
              <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
              <p className="text-sm font-medium text-white/70">Please wait...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex min-h-48 items-center justify-center rounded-xl
          border border-dashed border-white/15 bg-white/5">
          <p className="text-sm text-white/25">Transformed image will appear here</p>
        </div>
      )}
    </div>
  );
}