import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next'
import mongoose, { mongo } from 'mongoose';
import handler from '../pages/api/hello';
import MiddlewarePlugin from 'next/dist/build/webpack/plugins/middleware-plugin';

export const conectarMongoDB = (handler: NextApiHandler) => 
        (req: NextApiRequest, res: NextApiResponse) => {
             // verificar se o banco já está conectado, se estiver seguir para o endpoint ou proximo middleware
             if(mongoose.connections[0].readyState){
                 return handler(req,res);
             }

             // se nao estiver conectado vamos conectar
             // obter a variavel de ambiente preenchida do env

             const {DB_CONEXAO_STRING} = process.env;

             // se a env estiver vazia aberta o ouso do sistema e avisa o programador

             if (!DB_CONEXAO_STRING){
                 return res.status(500);
             }
        }