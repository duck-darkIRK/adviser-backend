import {
    Controller,
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
import { JwtRefreshGuard } from './passport/jwt-refresh.guard';

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

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    async getAccessToken(@Request() req: any) {
        console.log(req);
        const user = await this.userService.findOneUser(req.user.user.Id);
        if (user.refresh_token == req.user.token) {
            const tokenResponse = await this.authService.provideAccessToken(
                user.username,
                user.Id,
                user.roles,
            );
            return {
                statusCode: HttpStatus.CREATED,
                data: tokenResponse,
            };
        } else {
            return {
                statusCode: HttpStatus.CREATED,
            };
        }
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Post('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
