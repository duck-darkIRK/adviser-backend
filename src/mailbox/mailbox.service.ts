import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailboxEntity, MailEntity } from '../types';

@Injectable()
export class MailboxService {
    constructor(
        @InjectRepository(MailboxEntity)
        private readonly mailboxRepository: Repository<MailboxEntity>,
        @InjectRepository(MailEntity)
        private readonly mailRepository: Repository<MailEntity>,
    ) {}

    async addMailToMailbox(
        mailboxId: number,
        mailId: number,
        type: 'come' | 'to',
    ) {
        const mailbox = await this.mailboxRepository
            .createQueryBuilder('mailbox')
            .leftJoinAndSelect('mailbox.mailsCome', 'mailsCome')
            .leftJoinAndSelect('mailbox.mailsTo', 'mailsTo')
            .where('mailbox.Id = :id', { id: mailboxId })
            .getOne();

        if (!mailbox) {
            throw new Error('Mailbox not found');
        }

        const mail = await this.mailRepository.findOne({
            where: { Id: mailId },
        });
        if (!mail) {
            throw new Error('Mail not found');
        }

        const mailField = type === 'come' ? 'mailsCome' : 'mailsTo';
        const existingMails = mailbox[mailField] || [];

        const exists = existingMails.some((m) => m.Id === mailId);
        if (!exists) {
            existingMails.push(mail);
            await this.mailboxRepository
                .createQueryBuilder()
                .update(MailboxEntity)
                .set({ [mailField]: existingMails })
                .where('Id = :id', { id: mailboxId })
                .execute();
        }

        return mailbox;
    }
}
