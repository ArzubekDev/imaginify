import Header from '@/components/shared/Header';
import { getImageById } from '@/lib/actions/image.actions';
import { auth } from '@clerk/nextjs/server';

const ImageDetails = async ({ params }: SearchParamProps) => {
  const { id } = await params;
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

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
    </>
  );
};

export default ImageDetails;
