import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class EmptyStringMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const method = req.method;
        const body = req.body;
        
        if (method === 'POST' || method === 'PATCH') {
            for (const key in body) {
                const value = body[key];
                
                // Só processa se for string
                if (typeof value === 'string') {
                    // Remove espaços em branco
                    body[key] = value.trim();
                    
                    // Converte string vazia para null
                    if (body[key] === "") {
                        body[key] = null;
                    }
                    
                    // Converte strings boolean
                    if (body[key] === 'true') {
                        body[key] = true;
                    }
                    
                    if (body[key] === 'false') {
                        body[key] = false;
                    }
                }
            }
        }
        
        next();
    }
}