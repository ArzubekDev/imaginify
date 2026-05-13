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

import { aspectRatioOptions, defaultValues, transformationTypes } from '@/constants';
import { updateCredits } from '@/lib/actions/user.actions';
import { AspectRatioKey, debounce, deepMergeObjects } from '@/lib/utils';
import { getCldImageUrl } from 'next-cloudinary';
import { useState, useTransition } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CustomField from './CustomField';
import MediaUploader from './MediaUploader';
import TransformadImage from './TransformadImage';

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

  const initialValues =
    data && action === 'update'
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmiting(true);

    if (!data || image) {
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId || '',
        ...transformationConfig,
      });
    }
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

      return onChangeField(value);
    }, 1000);
  };

  // TODO: Update creditFee to something else
  const onTransformHandler = async () => {
    setIsTransforming(true);

    setTransformationConfig(deepMergeObjects(newTransformation, transformationConfig));
    setNewTransformation(null);

    startTransition(async () => {
      await updateCredits(userId, -1);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Title"
          render={({ field }) => <Input {...field} className="input" />}
          className="w-full"
        />

        {type === 'fill' && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => (
              <Select onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem key={key} value={key}>
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === 'remove' || type === 'recolor') && (
          <div className="space-y-6">
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
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="flex">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col w-full"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={String(field.value || '')}
                image={image}
                type={type}
              />
            )}
          />

          <TransformadImage
            image={image}
            type={type}
            title={form.getValues().title}
            transformationConfig={transformationConfig}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            className="capitalize"
            type="submit"
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? 'Transforming...' : 'Apply transformation'}
          </Button>
          <Button className="capitalize" type="submit" disabled={isSubmiting}>
            {isSubmiting ? 'Submiting...' : 'Save Image'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
