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
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DateTimeResolver } from 'graphql-scalars';

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
                synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
            }),
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: false,
            autoSchemaFile: './src/schema.gql',
            sortSchema: true,
            resolvers: { DateTime: DateTimeResolver },
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
