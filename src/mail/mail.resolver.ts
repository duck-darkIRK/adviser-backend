import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MailService } from './mail.service';
import { CreateMailDto, MailEntity, UpdateMailDto } from '../types';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => MailEntity)
export class MailResolver {
    constructor(private readonly mailService: MailService) {}

    @Query(() => [MailEntity])
    async getAllMails(
        @Args('count', { type: () => Int, nullable: true }) count?: number,
        @Args('index', { type: () => Int, nullable: true }) index?: number,
    ) {
        return this.mailService.findAll(count, index);
    }

    @Query(() => MailEntity, { nullable: true, name: 'getMailById' })
    async getMail(@Args('id', ParseIntPipe) id: number) {
        return this.mailService.findOne(id);
    }

    @Mutation(() => MailEntity)
    async createMail(@Args('createMailDto') createMailDto: CreateMailDto) {
        return this.mailService.create(createMailDto);
    }

    @Mutation(() => MailEntity)
    async updateMail(
        @Args('id', ParseIntPipe) id: number,
        @Args('updateMailDto') updateMailDto: UpdateMailDto,
    ) {
        return this.mailService.update(id, updateMailDto);
    }
}
