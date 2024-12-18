import { Body, Controller, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { UsersService } from './users.service';
import { LocalUserGuard } from './guard/local-user.guard';
import { User } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { UpdateUserDto } from 'src/common/dtos';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Post('signup')
    async signUp(@Body() createUserDto:CreateUserDto){
        return await this.usersService.signUp(createUserDto);
    }
    
    @Post('login')
    @UseGuards(LocalUserGuard)
    async login(@User() jwtToken: string) {
        return {message: "You have login successfully!", jwtToken}    
    }   

    @Get('profile')
    @UseGuards(JwtGuard)
    async getProfile(@User('username') username: string) {
        return await this.usersService.getProfile(username);
    }

    @Put('profile')
    @UseGuards(JwtGuard)
    async updateProfile(@User('username') username: string, @Body() updateUserDto: UpdateUserDto) {
        const updateResult =  await this.usersService.updateProfile(username, updateUserDto)
        if(updateResult.affected > 0) {
            return {message: "Profile has updated successfully!"}
        }

        return {message: "Profile has failed to update!"}
    }
}
