import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import z from 'zod';
import {formSchema} from './TransformationForm';
import { Control } from 'react-hook-form';

type CustomFieldProps = {
    control: Control<z.infer<typeof formSchema>> | undefined;
    render: (props: {field: unknown }) => React.ReactNode;
    name: keyof z.infer<typeof formSchema>;
    formLabel?: string;
    className?: string;
}

const CustomField = ({ control, render, name, formLabel, className }: CustomFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>

          {formLabel && <FormLabel>{formLabel}</FormLabel>}

          <FormControl>
           {render({field})}
          </FormControl>

          <FormDescription>Provide a concise title for your bug report.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomField;
