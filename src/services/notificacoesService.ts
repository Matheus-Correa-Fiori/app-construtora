let dispositivosCadastrados: any[] = [];

let notificacoesMock = [
    {
        idmensagem: 1,
        titulo: "Bem-vindo ao App Construtora!",
        corpo: "Obrigado por utilizar nosso aplicativo.",
        lido: false,
        data_cad: "2024-01-10 10:00"
    },
    {
        idmensagem: 2,
        titulo: "Obra atualizada",
        corpo: "As fotos da obra do seu empreendimento foram atualizadas.",
        lido: false,
        data_cad: "2024-01-12 14:22"
    }
];

let permissoesNotificacoesMock = [
    {
        notificacao: "novidades",
        sms: false,
        email: true,
        desktop: false,
        mobile: true
    },
    {
        notificacao: "financeiro",
        sms: true,
        email: true,
        desktop: false,
        mobile: true
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const cadastrarDispositivo = async (params: any) => {
    await delay(300);
    dispositivosCadastrados.push(params);
    return {
        sucesso: true,
        mensagem: "Dispositivo cadastrado com sucesso",
        dispositivo: params
    };
};

export const removerDispositivo = async (params: any) => {
    await delay(300);
    dispositivosCadastrados = dispositivosCadastrados.filter(
        d => d.identificador_dispositivo !== params.identificador_dispositivo
    );
    return {
        sucesso: true,
        mensagem: "Dispositivo removido com sucesso"
    };
};

export const getNotificacoes = async () => {
    await delay(300);
    return notificacoesMock;
};

export const marcarNotificacaoComoLida = async (idMensagem: number) => {
    await delay(200);

    notificacoesMock = notificacoesMock.map(n =>
        n.idmensagem === idMensagem ? { ...n, lido: true } : n
    );

    return {
        sucesso: true,
        mensagem: `Notificação ${idMensagem} marcada como lida`
    };
};

export const getPermissoesNotificacoes = async () => {
    await delay(200);
    return permissoesNotificacoesMock;
};

export const configurarNotificacao = async (params: any) => {
    await delay(200);
    permissoesNotificacoesMock = permissoesNotificacoesMock.map(p =>
        p.notificacao === params.notificacao ? params : p
    );
    return {
        sucesso: true,
        mensagem: "Configurações atualizadas",
        configuracao: params
    };
};