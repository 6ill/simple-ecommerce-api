import { BadRequestException, Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { SupportsService } from './supports.service';
import { JwtGuard } from 'src/common/guards';
import { CreateTicketDto } from 'src/common/dtos/create-ticket.dto';
import { User } from 'src/common/decorators';

@Controller('supports')
export class SupportsController {
  constructor(private readonly supportsService: SupportsService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createTicket(@Body() createTicketDto: CreateTicketDto, @User('id') userId: string) {
    const ticket = await this.supportsService.createTicket(userId, createTicketDto);
    return {
      message: "Your support request has been successfully submitted. Our team will get back to you shortly. Thank you for reaching out!",
      ticket
    }
  }
  
  @Get('faqs')
  async getFaqs() {
    const faqs = await this.supportsService.getFaqs()
    return {faqs}
  }

}
