import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/database/db";

export const getYourSelf = async () => {
  const currUser = await currentUser();

  if (!currUser || !currUser?.username) {
    throw new Error("Unauthorised");
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: currUser.id,
    },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  return user;
}; 

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (self.username !== username) {
    throw new Error("Unauthorized");
  }

  return user;
};