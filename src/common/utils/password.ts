import * as bcrypt from 'bcrypt'

export const hashPassword = (plainPassword:string): Promise<string>  => {
    return bcrypt.hash(plainPassword, bcrypt.genSaltSync());
}

export const comparePasswords =  (plainPassword: string, hashedPassword: string): Promise<boolean>  => {
    return bcrypt.compare(plainPassword, hashedPassword);
}