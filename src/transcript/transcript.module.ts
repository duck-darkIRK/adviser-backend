import { Module } from '@nestjs/common';
import { TranscriptService } from './transcript.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity, TranscriptEntity, UserEntity } from '../types';
import { TranscriptResolver } from './transcript.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([TranscriptEntity, UserEntity, SubjectEntity]),
    ],
    controllers: [],
    providers: [TranscriptService, TranscriptResolver],
    exports: [TypeOrmModule, TranscriptService],
})
export class TranscriptModule {}
