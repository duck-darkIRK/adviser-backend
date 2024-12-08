import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity, UserEntity } from '../types';

@Module({
    imports: [TypeOrmModule.forFeature([GroupEntity, UserEntity])],
    providers: [GroupResolver, GroupService],
})
export class GroupModule {}
