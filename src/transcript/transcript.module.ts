import { Module } from '@nestjs/common';
import { TranscriptService } from './transcript.service';
import { TranscriptController } from './transcript.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity, TranscriptEntity, UserEntity } from '../types';

@Module({
    imports: [
        TypeOrmModule.forFeature([TranscriptEntity, UserEntity, SubjectEntity]),
    ],
    controllers: [TranscriptController],
    providers: [TranscriptService],
    exports: [TypeOrmModule, TranscriptService],
})
export class TranscriptModule {}
