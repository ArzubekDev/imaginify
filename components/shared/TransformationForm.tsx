'use client'

import {z} from 'zod';

const formSchema = z.object({
    name: z.string().min(2).max(50),
});
const TransformationForm = () => {

    
  return (
    <div>TransformationForm</div>
  )
}

export default TransformationForm
