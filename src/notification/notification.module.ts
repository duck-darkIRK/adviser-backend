import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from '../types';

@Module({
    imports: [TypeOrmModule.forFeature([NotificationEntity])],
    providers: [NotificationResolver, NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}
