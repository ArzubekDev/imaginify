'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';

import { aspectRatioOptions, defaultValues, transformationTypes } from '@/constants';
import { useState } from 'react';
import { Input } from '../ui/input';
import CustomField from './CustomField';

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  promt: z.string().optional(),
  publicId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransforamtion, setNewTransformation] = useState<FormValues | null>(null);

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

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
    form.setValue('aspectRatio', value);
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
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                 {Object.keys(aspectRatioOptions)}
                </SelectContent>
              </Select>
            )}
          />
        )}
      </form>
    </Form>
  );
};

export default TransformationForm;
