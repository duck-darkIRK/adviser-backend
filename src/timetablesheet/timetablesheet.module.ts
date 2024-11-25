import { Module } from '@nestjs/common';
import { TimetableSheetService } from './timetablesheet.service';
import { TimetableSheetController } from './timetablesheet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimetableEntity, TimetableSheetEntity } from '../types';

@Module({
    imports: [
        TypeOrmModule.forFeature([TimetableSheetEntity, TimetableEntity]),
    ],
    controllers: [TimetableSheetController],
    providers: [TimetableSheetService],
    exports: [TypeOrmModule],
})
export class TimetableSheetModule {}
