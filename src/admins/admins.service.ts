import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/enums';
import { comparePasswords } from 'src/common/utils';
import { Admin } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminsRepository: Repository<Admin>,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username:string, password:string): Promise<string> {
        try {
            console.log("")
            const user = await this.adminsRepository.findOneBy({username});
            if(!user) {
                throw new ForbiddenException(`No admin found with username ${username}`)
            }
            
            const isValid = await comparePasswords(password, user.hashedPassword);
            if(!isValid) {
                throw new ForbiddenException("Not valid password!")
            }
            const { email } = user;
            return this.jwtService.sign({username, email, role:Role.Admin});
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
