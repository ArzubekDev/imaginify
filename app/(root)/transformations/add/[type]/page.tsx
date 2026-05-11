import Header from '@/components/shared/Header'
import { transformationTypes } from '@/constants'

const AddTransformationTypePage = async ({ params }: { params: Promise<{ type: string }> }) => {
  
  const { type } = await params;
  
  const transformation = transformationTypes[type];

  if (!transformation) return null;

  return (
    <section className="mt-10">
      <Header 
        title={transformation.title} 
        subtitle={transformation.subtitle} 
      />
    </section>
  )
}

export default AddTransformationTypePage;