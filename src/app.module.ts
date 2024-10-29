import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    Class,
    Comment,
    Mail,
    Mailbox,
    Major,
    Notification,
    Post,
    Subject,
    Timetable,
    TimetableSheet,
    Transcript,
    User,
} from './types';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3030,
            username: 'root',
            password: 'admin',
            database: 'Test',
            retryAttempts: 0,
            entities: [
                Major,
                Transcript,
                Class,
                Subject,
                Timetable,
                Comment,
                Mail,
                Post,
                Mailbox,
                Notification,
                User,
                TimetableSheet,
            ],
            synchronize: true,
        }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
