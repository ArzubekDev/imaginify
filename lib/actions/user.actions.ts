'use server';

import { UpdateUserParams } from '@clerk/nextjs/types';
import { revalidatePath } from 'next/cache';
import User from '../database/models/user.model';
import { connectToDatabase } from '../database/mongoose';
import { handleError } from '../utils';

type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName: string;
  lastName: string;
};

// CREATE
// export const createUser = async (user: CreateUserParams) => {
//     try {
//         await connectToDatabase();

//         const newUser = await User.create(user);
//         return JSON.parse(JSON.stringify(newUser));
//     } catch (error) {
//         handleError(error);
//     }
// }

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create({
      ...user,
      planId: '1',
      creditBalance: 10,
    });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

// READ
export const getUserByClerkId = async (userId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error('User not found');
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

// UPDATE
export const updateUserCredits = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

// DELETE
export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();
    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) {
      throw new Error('User not found');
    }

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath('/');

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
};
