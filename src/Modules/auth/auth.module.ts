

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { UsuariosService } from "../usuarios/usuarios.service";
import { Usuario } from "../usuarios/entities/usuario.entity";

@Module({
  imports: [
    SequelizeModule.forFeature([Usuario]),
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsuariosService, AuthGuard],
})
export class AuthModule {}
