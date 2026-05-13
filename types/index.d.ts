declare type CreateUserParams = {
    clerkId: string;
    email: string;
    username: string;
    photo?: string;
    firstName?: string;
    lastName?: string;
    planId?: string;
    creditBalance?: number;
};

declare type UpdateUserParams = Partial<CreateUserParams>;

type TransformationFormProps = {
  action: 'create' | 'update';

  userId: string;

  type: TransformationTypeKey;

  creditBalance: number;
  config?: unknown;

data?: {
  title?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  publicId?: string;
  width?: number;
  height?: number;
  secureURL?: string;
} | null;
};

declare type TransformationTypeKey =
  | 'restore'
  | 'fill'
  | 'remove'
  | 'recolor'
  | 'removeBackground';


declare type TransfromedImageProps = {
  image: any;
  type: string;
  title: string;
  transformationConfig: Transformations | null;
  isTransforming: boolean;
  hasDownload?:boolean;
  setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>
}

declare type AddImageParams = {
  image: {
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  userId: string;
  path: string;
};

declare type UpdateImageParams = {
  image: {
    _id: string;
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  userId: string;
  path: string;
};

