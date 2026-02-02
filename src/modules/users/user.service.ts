import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/auth";

interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  image?: string;
}



const getAllUsers = async ({
}) => {
    const allUsers = await prisma.user.findMany({
    });
    return {
        data: allUsers,
        
    };
}

const getMyProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      image: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const updateMyProfile = async (
  userId: string,
  payload: {
    name?: string;
    phone?: string;
    image?: string;
  },
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.phone && { phone: payload.phone }),
      ...(payload.image && { image: payload.image }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

const deleteMyAccount = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  return null;
};

const adminDeleteUser = async (
  adminId: string,
  targetUserId: string,
) => {
  const admin = await prisma.user.findUnique({
    where: { id: adminId },
  });

  if (!admin || admin.role !== UserRole.ADMIN) {
    throw new Error("Forbidden: Admin access only");
  }

  if (adminId === targetUserId) {
    throw new Error("Admin cannot delete own account here");
  }

  const user = await prisma.user.findUnique({
    where: { id: targetUserId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.delete({
    where: { id: targetUserId },
  });

  return null;
};


export const UsersService = {
    getAllUsers,
    getMyProfile,
    updateMyProfile,deleteMyAccount,adminDeleteUser
}