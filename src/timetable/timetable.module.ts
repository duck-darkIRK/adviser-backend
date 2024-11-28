import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimetableEntity, TimetableSheetEntity, UserEntity } from '../types';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TimetableEntity,
            UserEntity,
            TimetableSheetEntity,
        ]),
    ],
    controllers: [TimetableController],
    providers: [TimetableService],
    exports: [TypeOrmModule, TimetableService],
})
export class TimetableModule {}
