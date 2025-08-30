import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { EmptyStringMiddleware } from './shared/middlewares/bodyformatting.middleware';
import { UsuariosModule } from './Modules/usuarios/usuarios.module';
import { ExerciciosModule } from './Modules/exercicios/exercicios.module';
import { TreinosModule } from './Modules/treinos/treinos.module';
import { ProgressoModule } from './Modules/progresso/progresso.module';
import { AuthModule } from './Modules/auth/auth.module';


@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsuariosModule, 
    ExerciciosModule, 
    TreinosModule, 
    ProgressoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
   consumer.apply(LoggerMiddleware, EmptyStringMiddleware).forRoutes('*');
  }
}