import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form';


type CustomFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  formLabel?: string;

  render: ({
    field,
  }: {
    field: ControllerRenderProps<T, Path<T>>;
  }) => React.ReactNode;

  className?: string;
};

const CustomField = <T extends FieldValues>({
  control,
  name,
  formLabel,
  render,
  className,
}: CustomFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>

          {formLabel && <FormLabel >{formLabel}</FormLabel>}

          <FormControl>
           {render({field})}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomField;
