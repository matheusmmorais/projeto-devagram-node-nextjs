import type {NextApiRequest, NextApiResponse} from 'next';
import type {usuarioRequisicao} from '../../types/usuarioRequisicao';
import {UsuarioModel} from '../../models/usuarioModel';
import md5 from 'md5';
import {conectarMongoDB} from '../../middlewares/conectarMongoDB'

const endpointCadastro = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'POST'){
        const usuario = req.body as usuarioRequisicao;

        if(!usuario.nome || usuario.nome.length < 2){
            return res.status(400).json({erro: 'nome inválido'});
        }

        if(!usuario.email || usuario.email.length < 5 || !usuario.email.includes("@") || !usuario.email.includes(".")){
            return res.status(400).json({erro: 'Email invalido'});
        }

        if (!usuario.senha || usuario.senha.length < 4){
            return res.status(400).json({erro: 'Senha inválida'});
        }

        const usuarioASerSalvo = {
            nome: usuario.nome,
            email: usuario.email,
            senha: md5(usuario.senha)
        }
        await UsuarioModel.create(usuarioASerSalvo);
        return res.status(200).json({msg: 'usuario criado com sucesso'});
    }

    return res.status(405).json({erro: 'metodo informado invalido'});
}

export default conectarMongoDB(endpointCadastro); 