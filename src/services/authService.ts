interface LoginParams {
    usuario: string
    senha: string
    documento_internacional?: boolean
}

interface LoginExternoParams {
    tokensso: string    
}

interface CodigoVerificacaoParams {
    documento: string
    forma_envio?: 'email' | 'sms'
}

interface ValidarAutenticacaoParams {
    documento: string
    codigo: string
    validade?: 7 | 30 | 60 | 90
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const login = async (params: Omit<LoginParams, 'slug'>) => {
    await delay(800);

    return {
        access_token: "fake-token-123",
        usuario: {
            nome: "João da Silva",
            documento: "000.000.000-00",
        }
    };
};

export const loginSindico = async (params: LoginParams) => {
    await delay (900);
    
    return {
        access_token: "fake-sindico-token-456",
        sindico: {
            nome: "Maria Oliveira",
            torreResponsavel: "Torre A",
        }
    };
};

export const loginExterno = async (origem: string, params: LoginExternoParams) => {
    await delay(1000);

    return {
        autenticado: true,
        origem,
        access_token: "fake-login-externo-789"
    };
};

export const enviarCodigoVerificacao = async (params: CodigoVerificacaoParams) => {
    await delay(700);

    return {
        enviado: true,
        documento: params.documento,
        metodo: params.forma_envio || "sms"
    };
};

export const validarAutenticacao = async (params: ValidarAutenticacaoParams) => {
    await delay(1200);

    return {
        sucesso: params.codigo === "123456",
        validadeTokenDias: params.validade || 30
    };
};