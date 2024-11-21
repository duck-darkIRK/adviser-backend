import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../types';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphqlJwtStrategy } from './strategy/gql-jwt.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('TIME_SECRET'),
                },
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        GraphqlJwtStrategy,
        JwtRefreshStrategy,
    ],
    exports: [AuthService],
})
export class AuthModule {}
