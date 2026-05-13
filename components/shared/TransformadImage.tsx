import { dataURL, debounce, getImageSize } from "@/lib/utils";
import { DownloadCloud, Loader } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";


export default function TransformadImage({ image, type, title, transformationConfig, isTransforming, setIsTransforming, hasDownload = false }: TransfromedImageProps) {
    const downloadHandler = () => { }
    return (
        <div className="flex flex-col gap-4 w-full shadow-sm">
            <div className="flex justify-between">

                {hasDownload && (
                    <button onClick={() => downloadHandler()}>
                        <DownloadCloud className="w-10 h-10" />
                    </button>
                )}
            </div>
            {
                image?.publicId && transformationConfig ? (
                    <div className="relative">
                        <CldImage
                            width={getImageSize(type, image, 'width')}
                            height={getImageSize(type, image, 'height')}
                            src={image?.publicId}
                            alt={image.title}
                            sizes={'(max-width: 767px) 100vw, 50vw'}
                            placeholder={dataURL as PlaceholderValue}
                            className=""
                            onLoad={() => { setIsTransforming && setIsTransforming(false) }}
                            onError={() => {
                                debounce(() => {
                                    setIsTransforming && setIsTransforming(false)
                                }, 8000)
                            }}
                            {...transformationConfig}
                        />

                        {
                            isTransforming && (
                                <div className="">
                                    <Loader />
                                </div>
                            )
                        }
                    </div>
                )
                    : (
                        <div className="flex items-center justify-center">
                            Transformedimage
                        </div>
                    )
            }
        </div>
    );
}