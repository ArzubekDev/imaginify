'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { defaultValues } from '@/constants';

const formSchema = z.object({
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
          promt: data?.promt,
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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bug Title</FormLabel>

              <FormControl>
                <Input placeholder="Login button not working on mobile" {...field} />
              </FormControl>

              <FormDescription>Provide a concise title for your bug report.</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default TransformationForm;
