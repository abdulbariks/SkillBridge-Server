import { prisma } from "../../lib/prisma";


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
      tutorProfile: {
        include: {
          categories: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const UsersService = {
    getAllUsers,
    getMyProfile
}