import { Body, Controller, Param, Patch } from '@nestjs/common';
import { MailboxService } from './mailbox.service';

@Controller('mailbox')
export class MailboxController {
    constructor(private readonly mailboxService: MailboxService) {}

    @Patch(':mailboxId/add-mail/:mailId')
    async addMail(
        @Param('mailboxId') mailboxId: number,
        @Param('mailId') mailId: number,
        @Body('type') type: 'come' | 'to',
    ) {
        return this.mailboxService.addMailToMailbox(mailboxId, mailId, type);
    }
}
