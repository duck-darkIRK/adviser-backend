import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    ClassEntity,
    MajorEntity,
    SubjectEntity,
    TranscriptEntity,
} from '../types';
import { SubjectResolver } from './subject.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SubjectEntity,
            ClassEntity,
            TranscriptEntity,
            MajorEntity,
        ]),
    ],
    controllers: [],
    providers: [SubjectService, SubjectResolver],
    exports: [TypeOrmModule],
})
export class SubjectModule {}
