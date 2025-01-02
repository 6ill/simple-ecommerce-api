import { Module } from '@nestjs/common';
import { SupportsService } from './supports.service';
import { SupportsController } from './supports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq, SupportTicket } from 'src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupportTicket, Faq])
  ],
  controllers: [SupportsController],
  providers: [SupportsService],
})
export class SupportsModule {}
