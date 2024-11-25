import { Module } from '@nestjs/common';
import { MajorService } from './major.service';
import { MajorController } from './major.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorEntity, SubjectEntity, UserEntity } from '../types';

@Module({
    imports: [
        TypeOrmModule.forFeature([MajorEntity, UserEntity, SubjectEntity]),
    ],
    controllers: [MajorController],
    providers: [MajorService],
    exports: [TypeOrmModule],
})
export class MajorModule {}
