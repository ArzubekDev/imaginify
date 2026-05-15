// MediaUploader.tsx
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
      options={{ multiple: false, resourceType: 'image' }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/40">
            Original
          </h3>
          {publicId ? (
            <div className="cursor-pointer overflow-hidden rounded-xl border border-white/10">
              <CldImage
                width={getImageSize(type, image, 'width')}
                height={getImageSize(type, image, 'height')}
                src={publicId}
                alt="image"
                sizes="(max-width: 767px) 100vw, 50vw"
                placeholder={dataURL as PlaceholderValue}
                className="w-full object-cover"
              />
            </div>
          ) : (
            <div
              onClick={() => open()}
              className="flex flex-col items-center justify-center gap-3 w-full min-h-48 rounded-xl border border-dashed border-white/15 bg-white/5 hover:bg-white/8 hover:border-purple-500/50 cursor-pointer transition-all duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20">
                <Plus className="h-5 w-5 text-purple-400" />
              </div>
              <p className="text-sm font-medium text-white/50">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;