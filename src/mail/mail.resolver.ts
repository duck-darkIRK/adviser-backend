import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MailService } from './mail.service';
import { CreateMailDto, MailEntity, UpdateMailDto } from '../types';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../auth/role.enum';
import { GqlRolesGuard } from '../auth/gqlRoles.guard';
import { GqlAuthGuard } from '../auth/passport/gql-jwt-auth.guard';
import { GqlCurrentUser } from '../decorator/GqlCurrentUser.decorator';

@UseGuards(GqlRolesGuard)
@UseGuards(GqlAuthGuard)
@Resolver(() => MailEntity)
export class MailResolver {
    constructor(private readonly mailService: MailService) {}

    @Roles(Role.Admin)
    @Query(() => [MailEntity])
    async getAllMails(
        @Args('count', { type: () => Int, nullable: true }) count?: number,
        @Args('index', { type: () => Int, nullable: true }) index?: number,
    ) {
        return this.mailService.findAll(count, index);
    }

    @Roles(Role.Admin)
    @Query(() => MailEntity, { nullable: true, name: 'getMailById' })
    async getMail(@Args('id', { type: () => Int }, ParseIntPipe) id: number) {
        return this.mailService.findOne(id);
    }

    @Mutation(() => MailEntity)
    async createMail(@Args('createMailDto') createMailDto: CreateMailDto) {
        return this.mailService.create(createMailDto);
    }

    @Mutation(() => MailEntity)
    async updateMail(
        @Args('id', { type: () => Int }, ParseIntPipe) id: number,
        @Args('updateMailDto') updateMailDto: UpdateMailDto,
    ) {
        return this.mailService.update(id, updateMailDto);
    }

    @Roles(Role.Student, Role.Teacher, Role.Admin)
    @Query(() => [MailEntity], { name: 'USER_getAllReceiveMail' })
    async userGetOwnSendMail(
        @GqlCurrentUser() owner,
        @Args('count', { type: () => Int, nullable: true }) count?: number,
        @Args('index', { type: () => Int, nullable: true }) index?: number,
    ) {
        return await this.mailService.userGetOwnReceiveMail(
            owner.Id,
            count,
            index,
        );
    }

    @Roles(Role.Student, Role.Teacher, Role.Admin)
    @Query(() => [MailEntity], { name: 'USER_getAllSendMail' })
    async userGetOwnReceiveMail(
        @GqlCurrentUser() owner,
        @Args('count', { type: () => Int, nullable: true }) count?: number,
        @Args('index', { type: () => Int, nullable: true }) index?: number,
    ) {
        return await this.mailService.userGetOwnSendMail(
            owner.Id,
            count,
            index,
        );
    }

    @Roles(Role.Student, Role.Teacher, Role.Admin)
    @Query(() => MailEntity, { name: 'USER_sendMail' })
    async userSendMail(
        @GqlCurrentUser() owner,
        @Args('createMailDto') createMailDto: CreateMailDto,
    ) {
        createMailDto.sender = owner.Id;
        return await this.mailService.create(createMailDto);
    }
}
