'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';

import { defaultValues } from '@/constants';
import CustomField from './CustomField';
import { Input } from '../ui/input';

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  promt: z.string().optional(),
  publicId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const TransformationForm = ({ action, data = null }: TransformationFormProps) => {
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
      </form>
    </Form>
  );
};

export default TransformationForm;
