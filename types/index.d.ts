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

declare type TransformationFormProps = {
    action: 'create' | 'update';
    data?: {
        title: string;
        aspectRatio?: string;
        color?: string;
        promt?: string;
        publicId?: string;
    } | null;
};

// declare module "zod" {
//     export type zodInfer<T> = T extends z.ZodType<infer U> ? U : never;
// }