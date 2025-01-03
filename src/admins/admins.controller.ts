import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { LocalAdminGuard } from './guard/local-admin.guard';
import { User } from 'src/common/decorators';
import { LoginDto } from 'src/common/dtos';
import { ApiBody, ApiLink, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('admins')
export class AdminsController {
    @Post('login')
    @HttpCode(200)
    @UseGuards(LocalAdminGuard)
    @ApiBody({type: LoginDto})
    @ApiOkResponse({
        description: "The admin has been successfully authenticated",
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
}
