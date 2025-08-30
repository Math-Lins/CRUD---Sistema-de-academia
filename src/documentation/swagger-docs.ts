import { INestApplication } from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const config = new DocumentBuilder()
.setTitle('Academia API')
.setDescription('API completa para gerenciamento de academia - usuários, exercícios, treinos e progresso')
.setVersion('1.0')
.addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
}, 'JWT-auth')
.build();

export function swaggerStart(app: INestApplication){
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document);  
}