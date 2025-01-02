import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from 'src/common/dtos/create-ticket.dto';
import { Faq, SupportTicket } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SupportsService {
    constructor(
        @InjectRepository(Faq)
        private readonly faqsRepository: Repository<Faq>,
        @InjectRepository(SupportTicket)
        private readonly supportTicketsRepository: Repository<SupportTicket>,
    ) {}

    async createTicket(userId:string, createTicketDto: CreateTicketDto): Promise<SupportTicket> {
        const ticket = this.supportTicketsRepository.create({
            user: {id: userId},
            ...createTicketDto
        })

        return await this.supportTicketsRepository.save(ticket);
    }

    async getFaqs(): Promise<Faq[]>{
        return await this.faqsRepository.find();
    }
}