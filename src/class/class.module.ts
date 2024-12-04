import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity, SubjectEntity, UserEntity } from '../types';
import { ClassResolver } from './class.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClassEntity, UserEntity, SubjectEntity]),
    ],
    // controllers: [ClassController],
    providers: [ClassService, ClassResolver],
    exports: [TypeOrmModule, ClassService],
})
export class ClassModule {}
