import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/common/dtos';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { User } from 'src/database/entities/user.entity';
import { comparePasswords, hashPassword } from 'src/common/utils';
import { Repository, UpdateResult } from 'typeorm';
import { Role } from 'src/common/enums';
import { CartsService } from 'src/carts/carts.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly cartsService: CartsService
    ) {}

    async validateUser(username:string, password:string): Promise<string> {
        try {
            const user = await this.usersRepository.findOneBy({username});
            if(!user) {
                throw new ForbiddenException(`No user found with username ${username}`)
            }
            
            const isValid = await comparePasswords(password, user.hashedPassword);
            if(!isValid) {
                throw new ForbiddenException("Not valid password!")
            }
            const { id, email } = user;
            return this.jwtService.sign({id, username, email, role:Role.User});
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async signUp(createUserDto:CreateUserDto): Promise<User> {
        const { password, ...data } = createUserDto;
        const hashedPassword = await hashPassword(password);
        const newUser = this.usersRepository.create({
            ...data,
            hashedPassword
        });
        const savedUser = await this.usersRepository.save(newUser);
        await this.cartsService.createCart(savedUser.id);
        return savedUser;
    }

    async getProfile(username:string): Promise<User> {
        return await this.usersRepository.findOne({
            where: {
                username
            },
            select: {
                username:true,
                email: true,
                fullName:true,
                contactNumber: true,
                address: true 
            }
        });
    }

    async updateProfile(username:string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        const updateResult = await this.usersRepository.update({username}, updateUserDto);

        return updateResult;
    }
}
