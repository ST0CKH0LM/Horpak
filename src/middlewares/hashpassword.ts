import { Request , Response , NextFunction  } from "express";
import bcrypt from 'bcryptjs';

export async function hashpassword(password : string): Promise<string> {
    const saltround = 10;
    const hashPassword = await bcrypt.hash(password , saltround)
    return hashPassword
}

// const verifyPassword = async (password : string, hashedPassword: string): Promise<boolean> => {
//     const match = await bcrypt.compare(password,hashedPassword)
//     return match
// }

export default hashpassword