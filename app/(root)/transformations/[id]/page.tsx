import DeleteConfirmation from '@/components/shared/DeleteConfirmation';
import Header from '@/components/shared/Header';
import TransformadImage from '@/components/shared/TransformadImage';
import { Button } from '@/components/ui/button';
import { getImageById } from '@/lib/actions/image.actions';
import { getImageSize } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ImageDetails = async ({ params }: SearchParamProps) => {
  const { id } = await params;
  const { userId } = await auth();
  const image = await getImageById(id);

  return (
    <>
      <Header title={image.title} />

      {/* Meta info */}
      <section className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="text-xs text-white/40">Transformation</span>
          <span className="text-xs font-semibold text-purple-400 capitalize">
            {image.transformationType}
          </span>
        </div>

        {image.prompt && (
          <>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <span className="text-xs text-white/40">Prompt</span>
              <span className="text-xs font-semibold text-white/80">{image.prompt}</span>
            </div>
          </>
        )}

        {image.color && (
          <>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <span className="text-xs text-white/40">Color</span>
              <div className="flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-full border border-white/20"
                  style={{ background: image.color }}
                />
                <span className="text-xs font-semibold text-white/80">{image.color}</span>
              </div>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <span className="text-xs text-white/40">Aspect Ratio</span>
              <span className="text-xs font-semibold text-white/80">{image.aspectRatio}</span>
            </div>
          </>
        )}
      </section>

      {/* Images */}
      <section className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Original */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/40">
              Original
            </h3>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <Image
                width={getImageSize(image.transformationType, image, 'width')}
                height={getImageSize(image.transformationType, image, 'height')}
                src={image.secureURL}
                alt="Original image"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Transformed */}
          <TransformadImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {/* Actions */}
        {userId === image.author.clerkId && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              asChild
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 text-sm font-medium text-white hover:bg-purple-700"
            >
              <Link href={`/transformations/${image._id}/update`}>
                <Pencil className="h-4 w-4" />
                Update Image
              </Link>
            </Button>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;