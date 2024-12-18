import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAdminGuard } from './guard/local-admin.guard';
import { User } from 'src/common/decorators';

@Controller('admins')
export class AdminsController {
    @Post('login')
    @UseGuards(LocalAdminGuard)
    async login(@User() jwtToken: string) {
        return {message: "You have login successfully!", jwtToken}    
    }   
}
