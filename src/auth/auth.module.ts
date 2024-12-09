import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../types';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphqlJwtStrategy } from './strategy/gql-jwt.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { UserModule } from '../user/user.module';

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
        TypeOrmModule.forFeature([UserEntity]),
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
