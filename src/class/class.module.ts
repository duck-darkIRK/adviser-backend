import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity, SubjectEntity, UserEntity } from '../types';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClassEntity, UserEntity, SubjectEntity]),
    ],
    // controllers: [ClassController],
    providers: [ClassService],
    exports: [TypeOrmModule],
})
export class ClassModule {}
