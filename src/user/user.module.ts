import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorEntity, UserEntity } from '../types';
import { UserResolver } from './user.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, MajorEntity])],
    controllers: [],
    providers: [UserService, UserResolver],
    exports: [UserService, TypeOrmModule],
})
export class UserModule {}
