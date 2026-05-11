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