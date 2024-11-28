import { Module } from '@nestjs/common';
import { MajorService } from './major.service';
import { MajorController } from './major.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorEntity, SubjectEntity, UserEntity } from '../types';
import { MajorResolver } from './major.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([MajorEntity, UserEntity, SubjectEntity]),
    ],
    controllers: [MajorController],
    providers: [MajorService, MajorResolver],
    exports: [TypeOrmModule, MajorService],
})
export class MajorModule {}
