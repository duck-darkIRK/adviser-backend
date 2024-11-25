import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    ClassEntity,
    MajorEntity,
    SubjectEntity,
    TranscriptEntity,
} from '../types';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SubjectEntity,
            ClassEntity,
            TranscriptEntity,
            MajorEntity,
        ]),
    ],
    controllers: [SubjectController],
    providers: [SubjectService],
    exports: [TypeOrmModule],
})
export class SubjectModule {}
