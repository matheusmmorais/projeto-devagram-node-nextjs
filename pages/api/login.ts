import type {NextApiRequest, NextApiResponse} from 'next';

export default (
    req: NextApiRequest
    res: NextApiResponse
) => {
    if(req.method == 'POST'){
        const {login, senha} = req.body;
        
        if(login === 'admin@admin.com') && (senha === 'admin@123'){
            res.status(200).json({msg: "usuario autenticado com sucesso"});
        }
        return res.status(405).json({erro: 'metodo informado não é válido'});
    }
    
    {
        return res.status(405).json({erro: 'metodo informado não é válido'});
    }
}