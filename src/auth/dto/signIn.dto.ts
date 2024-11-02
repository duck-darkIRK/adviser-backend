// src/auth/dto/signIn.dto.ts

import { IsString } from 'class-validator';

export class SignInDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}
