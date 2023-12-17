"use server"

import { revalidatePath } from "next/cache"

import { CreateUserParams, UpdateUserParams } from "@/types"

import { handleError } from "@/lib/utils"
import { connectToDatabase } from "@/lib/db"
import User from "@/lib/db/models/user.model"
import Event from "@/lib/db/models/event.model"
import Order from "@/lib/db/models/order.model"

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    // Create a new user
    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));

  } catch (error) {
    handleError(error)
  }
}

export const getUserById = async(userId: string) => {
  try {
    await connectToDatabase()

    const user = await User.findById(userId);
    if(!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error)
  }
}

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updateUser = await User.findOneAndUpdate(
      { clerkId },
      user,
      { new: true }
    )
  } catch (error) {
    handleError(error);
  }
}

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) throw new Error("User not found");

    await Promise.all([
      Event.updateMany(
        {_id: { $in: userToDelete.events }},
        { $pull: { organizer: userToDelete._id }}
      ),

      Order.updateMany({ _id: { $in: userToDelete.orders }}, { $unset: { buyer: 1 }})
    ])

    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;

  } catch (error) {
    handleError(error);
  }
}