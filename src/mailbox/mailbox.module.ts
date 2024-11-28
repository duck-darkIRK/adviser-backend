import { Module } from '@nestjs/common';
import { MailboxService } from './mailbox.service';
import { MailboxController } from './mailbox.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailboxEntity, MailEntity } from '../types';

@Module({
    imports: [TypeOrmModule.forFeature([MailboxEntity, MailEntity])],
    controllers: [MailboxController],
    providers: [MailboxService],
    exports: [TypeOrmModule, MailboxService],
})
export class MailboxModule {}
