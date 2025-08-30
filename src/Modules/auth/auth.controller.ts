import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    @ApiOperation({ summary: 'Fazer login na academia' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 400, description: 'Email ou senha incorretos' })
    async signIn(
        @Body() data: AuthDto
    ) {
        return await this.authService.signIn(data.email, data.senha);
    }
}
