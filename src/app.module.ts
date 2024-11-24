import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    ClassEntity,
    CommentEntity,
    MailboxEntity,
    MailEntity,
    MajorEntity,
    NotificationEntity,
    PostEntity,
    SubjectEntity,
    TimetableEntity,
    TimetableSheetEntity,
    TranscriptEntity,
    UserEntity,
} from './types';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DateTimeResolver } from 'graphql-scalars';
import { MailboxModule } from './mailbox/mailbox.module';
import { ClassModule } from './class/class.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), // Thêm ConfigModule
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DATABASE_HOST'),
                port: +configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                retryAttempts: 0,
                entities: [
                    MajorEntity,
                    TranscriptEntity,
                    ClassEntity,
                    SubjectEntity,
                    TimetableEntity,
                    CommentEntity,
                    MailEntity,
                    PostEntity,
                    MailboxEntity,
                    NotificationEntity,
                    UserEntity,
                    TimetableSheetEntity,
                ],
                synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
            }),
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: false,
            autoSchemaFile: './src/schema.gql',
            sortSchema: true,
            resolvers: { DateTime: DateTimeResolver },
            context: ({ req }) => ({ req }),
        }),
        UserModule,
        AuthModule,
        MailboxModule,
        ClassModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
