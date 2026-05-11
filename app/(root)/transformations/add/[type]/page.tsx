import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'

const AddTransformationTypePage = async ({ params }: { params: Promise<{ type: string }> }) => {
  
  const { type } = await params;
  
  const transformation = transformationTypes[type];

  if (!transformation) return null;

  return (
    <>
      <Header 
        title={transformation.title} 
        subtitle={transformation.subtitle} 
      />

      <TransformationForm/>
    </>
  )
}

export default AddTransformationTypePage;