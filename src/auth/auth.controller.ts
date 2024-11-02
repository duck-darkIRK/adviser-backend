import {
    Controller,
    HttpException,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from '../decorator/guard.config';
import { UserService } from '../user/user.service';
import { Roles } from '../decorator/roles.decorator';
import { Role } from './role.enum';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    handleLogin(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @Public()
    @Post('refresh')
    async getAccessToken(@Request() req: any) {
        const isValidRefreshToken = await this.userService.validateRefreshToken(
            req.body.refresh_token,
        );

        if (isValidRefreshToken.isValid) {
            const tokenResponse = await this.authService.provideAccessToken(
                isValidRefreshToken.username,
                isValidRefreshToken.Id,
                ['admin'],
            );
            return {
                statusCode: HttpStatus.CREATED,
                data: tokenResponse,
            };
        } else {
            throw new HttpException(
                'Refresh token is invalid',
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Post('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
