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
  } | null;
};

declare type TransformationTypeKey =
  | 'restore'
  | 'fill'
  | 'remove'
  | 'recolor'
  | 'removeBackground';