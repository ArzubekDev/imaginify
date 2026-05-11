'use client'

import {z} from 'zod';

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
});
const TransformationForm = () => {
  return (
    <div>TransformationForm</div>
  )
}

export default TransformationForm