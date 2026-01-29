import { prisma } from "../../lib/prisma";


const getAllUsers = async ({
}) => {
  

    const allUsers = await prisma.user.findMany({
    });

   
    return {
        data: allUsers,
        
    };
}


export const UsersService = {
    getAllUsers
}