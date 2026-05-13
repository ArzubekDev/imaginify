import { dataURL, getImageSize } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import { toast } from 'sonner';

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: (value: any) => void;
  publicId: string;
  image: any;
  type: string;
};

const MediaUploader = ({ onValueChange, setImage, image, publicId, type }: MediaUploaderProps) => {

  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);

    toast.success('Image uploaded successfully!', {
      description: '1 credit was deducted from your account',
      duration: 5000,
      className: 'success-toast',
    });
  };

  const onUploadErrorHandler = () => {
    toast.error('Something went wrong while uploading', {
      description: 'Please try again',
      duration: 5000,
      className: 'error-toast',
    });
  };
  return (
    <CldUploadWidget
      uploadPreset="jsm_imaginify"
      options={{
        multiple: false,
        resourceType: 'image',
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3>Original</h3>
          {publicId ? (
            <div className="cursor-pointer overflow-hidden rounded-sm">
              <CldImage
                width={getImageSize(type, image, 'width')}
                height={getImageSize(type, image, 'height')}
                src={publicId}
                alt="image"
                sizes={'(max-width: 767px) 100vw, 50vw'}
                placeholder={dataURL as PlaceholderValue}
              />
            </div>
          ) : (
            <div onClick={() => open()}>
              <div className="cursor-pointer w-full shadow-2xl rounded-sm flex flex-col items-center justify-center">
                <Plus className="w-6 h-6 bg-blue-500 rounded-sm text-white p-1" />
                <p className="font-medium">Click here to upload image</p>
              </div>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
