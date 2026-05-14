import Header from '@/components/shared/Header';
import TransformadImage from '@/components/shared/TransformadImage';
import { Button } from '@/components/ui/button';
import { getImageById } from '@/lib/actions/image.actions';
import { getImageSize } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';



const ImageDetails = async ({ params }: SearchParamProps) => {
  const { id } = await params;
  const { userId } = await auth();

  const image = await getImageById(id);

  return (
    <>
      <Header title={image.title} />

      <section>
        <div>
          <p>Transformation:</p>
          <p>{image.transformationType}</p>
        </div>

        {image.prompt && (
          <>
            <p>&#x25CF</p>
            <div>
              <p>Prompt:</p>
              <p>{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p>&#x25CF</p>
            <div>
              <p>Color:</p>
              <p>{image.color}</p>
            </div>
          </>
        )}
        {image.aspectRatio && (
          <>
            <p>&#x25CF</p>
            <div>
              <p>Aspect Ratio:</p>
              <p>{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section>
        <div>
          <div>
            <h3>Original</h3>
            <Image
              width={getImageSize(image.transformationType, image, 'width')}
              height={getImageSize(image.transformationType, image, 'height')}
              src={image.secureURL}
              alt="image"
              className=""
            />
          </div>

          <TransformadImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div>
            <Button asChild type="button">
              <Link href={`/transformations/${image._id}/update`}>Update Image</Link>
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;
