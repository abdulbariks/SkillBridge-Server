import { prisma } from "../../lib/prisma";


const getAllUsers = async ({
}) => {
  

    const allPost = await prisma.post.findMany({
    });

   
    return {
        data: allPost,
        
    };
}


export const UsersService = {
    getAllUsers
}