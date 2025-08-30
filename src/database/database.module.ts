import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import * as dotenv from "dotenv";
import { Usuario } from "src/Modules/usuarios/entities/usuario.entity";
import { Exercicio } from "src/Modules/exercicios/entities/exercicio.entity";
import { Treino } from "src/Modules/treinos/entities/treino.entity";
import { Progresso } from "src/Modules/progresso/entities/progresso.entity";

dotenv.config()
@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    models: [
        Usuario,
        Exercicio,
        Treino,
        Progresso  
    ],
    logging: true,
    autoLoadModels: true,    
  })],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
