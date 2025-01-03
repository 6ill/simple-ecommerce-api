import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SupportsService } from './supports.service';
import { JwtGuard } from 'src/common/guards';
import { CreateTicketDto } from 'src/common/dtos/create-ticket.dto';
import { User } from 'src/common/decorators';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SUCCESS_CREATE_TICKET, SUCCESS_GET_FAQS } from 'src/common/example-responses';

@Controller('supports')
export class SupportsController {
  constructor(private readonly supportsService: SupportsService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    example: SUCCESS_CREATE_TICKET
  })
  @ApiBadRequestResponse({
    description: "Bad request"
  })
  @ApiUnauthorizedResponse({
    description: "The request is unauthorized due to a missing JWT token or insufficient user permissions"
  })
  async createTicket(@Body() createTicketDto: CreateTicketDto, @User('id') userId: string) {
    const ticket = await this.supportsService.createTicket(userId, createTicketDto);
    return {
      message: "Your support request has been successfully submitted. Our team will get back to you shortly. Thank you for reaching out!",
      ticket
    }
  }
  
  @Get('faqs')
  @ApiOkResponse({
    example: SUCCESS_GET_FAQS
  })
  async getFaqs() {
    const faqs = await this.supportsService.getFaqs()
    return {faqs}
  }

}
