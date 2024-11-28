import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailboxEntity, MajorEntity, UserEntity } from '../types';
import { JwtModule } from '@nestjs/jwt';
import { UserResolver } from './user.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, MajorEntity, MailboxEntity]),
        JwtModule,
    ],
    controllers: [UserController],
    providers: [UserService, UserResolver],
    exports: [UserService, TypeOrmModule],
})
export class UserModule {}
