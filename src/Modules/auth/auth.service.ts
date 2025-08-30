
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from '../usuarios/entities/usuario.entity';


dotenv.config();

@Injectable()
export class AuthService {
    private jwtExpirationTimeSeconds: number;
    constructor(
        @InjectModel(Usuario)
        private readonly usuarioModel: typeof Usuario,
        private readonly jwtService: JwtService
    ) {
        // Tenta extrair parte numérica (ex: "3600s" -> 3600). Fallback 0 se inválido.
        const rawExp = process.env.JWT_EXPIRATION_TIME;
        const numeric = rawExp ? parseInt(rawExp, 10) : 0;
        this.jwtExpirationTimeSeconds = Number.isNaN(numeric) ? 0 : numeric;
    }

    async signIn(email: string, password: string) {
        try {
            const emailNormalizado = email.trim().toLowerCase();
            const usuario = await this.usuarioModel.findOne({ where: { email: emailNormalizado } });
            console.log('[AUTH] Tentativa login:', { email: emailNormalizado, encontrado: !!usuario });
            const debug = process.env.AUTH_DEBUG === 'true';

            // Evita enumeração de usuários
            if (!usuario) {
                throw new BadRequestException("Email ou senha incorretos");
            }

            const stored = usuario.senha;
            let valid = false;
            if (debug) {
                console.log('[AUTH][DEBUG] Hash armazenado (prefixo/len):', stored?.substring(0, 7), stored?.length);
                console.log('[AUTH][DEBUG] Password recebido (len):', password?.length);
            }
            if (stored?.startsWith('$2')) { // hash bcrypt esperado
                try {
                    valid = bcryptCompareSync(password, stored);
                    console.log('[AUTH] Comparação bcrypt', { resultado: valid });
                } catch (e) {
                    // Caso hash inválido/corrompido
                    valid = false;
                    console.log('[AUTH] Erro compare bcrypt', e?.message);
                }
            } else {
                // Usuário possivelmente criado antes de implementar hash (senha em texto puro)
                valid = password === stored;
                console.log('[AUTH] Comparação texto puro', { resultado: valid });
            }

            if (!valid) {
                if (debug) {
                    console.log('[AUTH][DEBUG] Falha de validação. Stored inicia com $2?', stored?.startsWith('$2'));
                }
                throw new BadRequestException("Email ou senha incorretos");
            }

            const payload = { 
                usuarioId: usuario.id, 
                email: usuario.email, 
                nome: usuario.nome,
                tipo: usuario.tipo
            };

            // Verifica secret para evitar erro 500 
            if (!process.env.JWT_SECRET) {
                throw new InternalServerErrorException('JWT_SECRET não configurado');
            }

            const token = this.jwtService.sign(payload);
            console.log('[AUTH] Login OK', { usuarioId: usuario.id });

            return {
                token,
                usuarioId: usuario.id,
                nome: usuario.nome,
                tipo: usuario.tipo,
                expiresIn: this.jwtExpirationTimeSeconds
            };
        } catch (err: any) {
            // Repassa BadRequest ou InternalServerError; converte outros erros genéricos
            if (err instanceof BadRequestException || err instanceof InternalServerErrorException) {
                throw err;
            }
            console.error('Erro inesperado no login:', err?.message || err);
            throw new InternalServerErrorException('Falha ao realizar login');
        }
    }

}
