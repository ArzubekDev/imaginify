'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';

import { aspectRatioOptions, creditFee, defaultValues, transformationTypes } from '@/constants';
import { addImage, updateImage } from '@/lib/actions/image.actions';
import { updateCredits } from '@/lib/actions/user.actions';
import { AspectRatioKey, debounce, deepMergeObjects } from '@/lib/utils';
import { getCldImageUrl } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CustomField from './CustomField';
import { InsufficientCreditsModal } from './InsufficientCreditsModal';
import MediaUploader from './MediaUploader';
import TransformadImage from './TransformadImage';
import { Loader2 } from 'lucide-react';
import TransformedImage from './TransformadImage';

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;
type TransformationConfig = Record<string, any>;

const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  config = null,
  creditBalance,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState<TransformationConfig | null>(
    config as TransformationConfig,
  );
  const [newTransformation, setNewTransformation] = useState<TransformationConfig | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const initialValues =
    data && action === 'update'
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
          width: data?.width,
          height: data?.height,
        }
      : defaultValues;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmiting(true);

    if (!image?.publicId) {
      console.log('No image selected');
      setIsSubmiting(false);
      return;
    }

    if (!data || image) {
      const transformationURL = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId || '',
        ...transformationConfig,
      });

      const imageData = {
        title: values.title,
        publicId: image?.publicId || '',
        transformationType: type,
        width: image?.width || 0,
        height: image?.height || 0,
        config: transformationConfig,
        secureURL: image?.secureURL || '',
        transformationURL: transformationURL || '',
        aspectRatio: values.aspectRatio || '',
        prompt: values.prompt || '',
        color: values.color || '',
      };
      console.log('imageData:', imageData);

      if (action === 'create') {
        try {
          const newImage = await addImage({
            image: imageData,
            userId,
            path: '/',
          });

          if (newImage) {
            form.reset();
            setImage(data);
            router.push(`/transformations/${newImage._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (action === 'update') {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageData,
              _id: data?._id || '',
            },
            userId,
            path: `/transformations/${data?._id}`,
          });

          if (updatedImage) {
            router.push(`/transformations/${updatedImage._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    console.log('image object:', image);

    setIsSubmiting(false);
  }

  const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];
    setImage((prevState) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));

    setNewTransformation(transformationType.config);

    return onChangeField(value);
  };

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void,
  ) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === 'prompt' ? 'prompt' : 'to']: value,
        },
      }));
    }, 1000)();

    return onChangeField(value);
  };

  // TODO: Update creditFee to something else
  const onTransformHandler = async () => {
    setIsTransforming(true);

    setTransformationConfig(deepMergeObjects(newTransformation, transformationConfig));
    setNewTransformation(null);

    startTransition(async () => {
      await updateCredits(userId, creditFee);
    });
  };

  const handleSetImage = (imageData: any) => {
    setImage(imageData);
    if (!newTransformation) {
      setNewTransformation(transformationType.config);
    }
  };

  useEffect(() => {
    if (image && (type === 'restore' || type === 'removeBackground')) {
      setNewTransformation(transformationType.config);
    }
    if (image && type === 'fill' && data?.aspectRatio) {
      setNewTransformation(transformationType.config);
    }
  }, [image, transformationType.config, type]);

  return (
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}

    {/* Title */}
    <CustomField
      control={form.control}
      name="title"
      formLabel="Title"
      render={({ field }) => (
        <Input
          {...field}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/25
            focus:border-purple-500/50 focus:ring-0 rounded-xl"
        />
      )}
      className="w-full"
    />

    {/* Aspect Ratio */}
    {type === 'fill' && (
      <CustomField
        control={form.control}
        name="aspectRatio"
        formLabel="Aspect Ratio"
        className="w-full"
        render={({ field }) => (
          <Select
            onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
            value={field.value ? String(field.value) : undefined}
          >
            <SelectTrigger className="w-full bg-white/5 border-white/10 text-white
              focus:border-purple-500/50 rounded-xl">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
              {Object.keys(aspectRatioOptions).map((key) => (
                <SelectItem
                  key={key}
                  value={key}
                  className="focus:bg-white/10 focus:text-white"
                >
                  {aspectRatioOptions[key as AspectRatioKey].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    )}

    {(type === 'remove' || type === 'recolor') && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomField
          control={form.control}
          name="prompt"
          formLabel={type === 'remove' ? 'Object to remove' : 'Object to recolor'}
          className="w-full"
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={(e) =>
                onInputChangeHandler('prompt', e.target.value, type, field.onChange)
              }
              className="bg-white/5 border-white/10 text-white placeholder:text-white/25
                focus:border-purple-500/50 focus:ring-0 rounded-xl"
            />
          )}
        />
        {type === 'recolor' && (
          <CustomField
            control={form.control}
            name="color"
            formLabel="Replacement Color"
            className="w-full"
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={(e) =>
                  onInputChangeHandler('color', e.target.value, 'recolor', field.onChange)
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-white/25
                  focus:border-purple-500/50 focus:ring-0 rounded-xl"
              />
            )}
          />
        )}
      </div>
    )}

    {/* Upload + Preview side by side */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CustomField
        control={form.control}
        name="publicId"
        className="flex size-full flex-col"
        render={({ field }) => (
          <MediaUploader
            onValueChange={field.onChange}
            setImage={handleSetImage}
            publicId={String(field.value || '')}
            image={image}
            type={type}
          />
        )}
      />
      <TransformedImage
        image={image}
        type={type}
        title={form.getValues().title}
        transformationConfig={transformationConfig}
        isTransforming={isTransforming}
        setIsTransforming={setIsTransforming}
      />
    </div>

    {/* Actions */}
    <div className="flex flex-col gap-3">
      <Button
        type="button"
        disabled={isTransforming || newTransformation === null}
        onClick={onTransformHandler}
        className="w-full capitalize bg-purple-600 hover:bg-purple-700 text-white
          rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {isTransforming ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Transforming...
          </span>
        ) : 'Apply Transformation'}
      </Button>

      <Button
        type="submit"
        disabled={isSubmiting}
        className="w-full capitalize bg-white/10 hover:bg-white/15 text-white
          border border-white/10 rounded-xl disabled:opacity-40 transition-colors"
      >
        {isSubmiting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </span>
        ) : 'Save Image'}
      </Button>
    </div>
  </form>
</Form>
  );
};

export default TransformationForm;
