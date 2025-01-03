import { Body, Controller, Get, HttpCode, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { UsersService } from './users.service';
import { LocalUserGuard } from './guard/local-user.guard';
import { User } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { LoginDto, UpdateUserDto, UpdateUserDtoSwagger } from 'src/common/dtos';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Post('signup')
    @ApiCreatedResponse({
        description: "The user has been successfully created.",
    })
    async signUp(@Body() createUserDto:CreateUserDto){
        return await this.usersService.signUp(createUserDto);
    }
    
    @Post('login')
    @HttpCode(200)
    @UseGuards(LocalUserGuard)
    @ApiBody({type: LoginDto})
    @ApiOkResponse({
        description: "The user has been successfully authenticated",
        example: {
            message: "You have login successfully!",
            jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVmMTgxZTRiLWNlZGQtNDcwYi1iOGQ4LWYwYjNhZDk5OTY5ZSIsInVzZXJuYW1lIjoibG9ibzEyMyIsImVtYWlsIjoibWFyY0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczNTc5MTQ1MCwiZXhwIjoxNzM1ODc3ODUwfQ.w0LFZB1v-S-69C6eEw_VL3_KZXWl_rUTaaaU6ra3n9o"
        }
    })
    @ApiUnauthorizedResponse({
        description: "Wrong password or username"
    })
    async login(@User() jwtToken: string) {
        return {message: "You have login successfully!", jwtToken}    
    }   
    
    @Get('profile')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({
        description: "User profile has been successfully retrieved",
        example: {
            username: "lobo123",
            email: "marc@gmail.com",
            fullName: "Marcus Smith",
            contactNumber: "+6223163736777",
            address: "Bekasi"
        }
    })
    @ApiUnauthorizedResponse({
        description: "The user have not logged in when try to retrieve the profile"
    })
    async getProfile(@User('username') username: string) {
        return await this.usersService.getProfile(username);
    }

    @Put('profile')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({
        description: "User profile has been successfully updated",
    })
    @ApiUnauthorizedResponse({
        description: "The user have not logged in when try to update the profile"
    })
    @ApiBody({
        type: UpdateUserDtoSwagger
    })
    async updateProfile(@User('username') username: string, @Body() updateUserDto: UpdateUserDto) {
        const updateResult =  await this.usersService.updateProfile(username, updateUserDto)
        if(updateResult.affected > 0) {
            return {message: "Profile has updated successfully!"}
        }

        return {message: "Profile has failed to update!"}
    }
}
