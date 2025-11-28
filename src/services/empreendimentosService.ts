const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getEmpreendimentosPorPessoa = async (pessoaId?: number) => {
    await delay(500);

    return [
        {
            id: 100,
            nome: "Residencial Flores",
            cidade: "São Paulo",
            estado: "SP",
            status: "em obras",
            foto: "https://picsum.photos/800/400?random=10",
            porcentagem_total_estagio_obra: 68
        },
        {
            id: 101,
            nome: "Residencial Flores",
            cidade: "São Paulo",
            estado: "SP",
            status: "em obras",
            foto: "https://picsum.photos/800/400?random=10",
            porcentagem_total_estagio_obra: 85
        },
        {
            id: 102,
            nome: "Condomínio Morada Azul",
            cidade: "Campinas",
            estado: "SP",
            status: "entregue",
            foto: "https://picsum.photos/800/400?random=11",
            porcentagem_total_estagio_obra: 92
        }
    ];
};

export const getEmpreendimentosAtivos = async () => {
    await delay(500);

    return [
        {
            id: 100,
            nome: "Residencial Flores",
            ativo: true
        },
        {
            id: 101,
            nome: "Residencial Flores",
            ativo: true
        },
        {
            id: 102,
            nome: "Condomínio Morada Azul",
            ativo: true
        }
    ];
};

export const getGaleriaObraEmpreendimento = async (idEmpreendimento: number) => {
    await delay(500);

    return [
        {
            idEmpreendimento,
            data_cad: "2024-01-15",
            midias: [
                {
                    idmidia: 1,
                    url: "https://picsum.photos/600/400?random=1",
                    thumbnail: "https://picsum.photos/200/150?random=1",
                    titulo: "Foto da obra",
                    tipo: "imagem"
                },
                {
                    idmidia: 2,
                    url: "https://picsum.photos/600/400?random=2",
                    thumbnail: "https://picsum.photos/200/150?random=2",
                    titulo: "Evolução",
                    tipo: "imagem"
                }
            ]
        },
        {
            idEmpreendimento,
            data_cad: "2024-01-22",
            midias: [
                {
                    idmidia: 3,
                    url: "https://picsum.photos/600/400?random=12",
                    thumbnail: "https://picsum.photos/200/150?random=12",
                    titulo: "Foto da semana",
                    tipo: "imagem"
                }
            ]
        }
    ];
};

export const getGaleriaObraUnidade = async (idUnidade: number) => {
    await delay(500);

    return {
        unidade: idUnidade,
        ano: 2024,
        mes: 1,
        imagens: [
            {id: 3, url: "https://picsum.photos/600/400?random=3"},
            {id: 4, url: "https://picsum.photos/600/400?random=4"},
            {id: 5, url: "https://picsum.photos/600/400?random=13"}
        ]
    };
};

export const getAndamentoObraEmpreendimento = async (idEmpreendimento: number) => {
    await delay(500);

    const lista = [
        {
            idEmpreendimento: 100,
            porcentagem_total: 68,
            etapas: [
                {nome: "Fundação", porcentagem: 60},
                {nome: "Estrutura", porcentagem: 70},
                {nome: "Instalações", porcentagem: 65},
                {nome: "Acabamento", porcentagem: 77}
            ]
        },
        {
            idEmpreendimento: 101,
            porcentagem_total: 85,
            etapas: [
                {nome: "Fundação", porcentagem: 80},
                {nome: "Estrutura", porcentagem: 90},
                {nome: "Instalações", porcentagem: 82},
                {nome: "Acabamento", porcentagem: 88}
            ]
        },
        {
            idEmpreendimento: 102,
            porcentagem_total: 92,
            etapas: [
                {nome: "Fundação", porcentagem: 90},
                {nome: "Estrutura", porcentagem: 95},
                {nome: "Instalações", porcentagem: 88},
                {nome: "Acabamento", porcentagem: 95}
            ]
        }
    ];

    return lista.find(item => item.idEmpreendimento === idEmpreendimento) ?? null;
};

export const getAndamentoObraUnidade = async (idUnidade: number) => {
    await delay(500);

    return {
        unidade: idUnidade,
        progresso: 42,
        etapas: [
            {nome: "Piso", porcentagem: 100},
            {nome: "Elétrica", porcentagem: 20},
            {nome: "Hidráulica", porcentagem: 10}
        ]
    };
};

export const getComunicadosEmpreendimento = async (idEmpreendimento: number) => {
    await delay(500);

    return [
        {
            titulo: "Atualização da obra",
            descricao: "A fase de instalações elétricas iniciou esta semana.",
            data_cadastro: "2024-01-20",
            tipo: "Atualização",
            categoria: "Obra",
            imagem: "https://picsum.photos/500/300?random=20"
        },
        {
            titulo: "Entrega prevista",
            descricao: "Previsão de entrega ajustada para Maio/2024.",
            data_cadastro: "2024-02-05",
            tipo: "Aviso",
            categoria: "Entrega",
            imagem: "https://picsum.photos/500/300?random=21"
        }
    ];
};

export const getDocumentosEmpreendimento = async (idEmpreendimento: number) => {
    await delay(500);

    return {
        idEmpreendimento,
        total: 2,
        documentos: [
            {
                id: 1,
                titulo: "Memorial Descritivo",
                tipo: "PDF",
                categoria: "Documentação Técnica",
                data: "2024-01-10",
                url: "https://example.com/doc1.pdf"
            },
            {
                id: 2,
                titulo: "Projeto Estrutural",
                tipo: "PDF",
                categoria: "Engenharia",
                data: "2024-01-15",
                url: "https://example.com/doc2.pdf"
            }
        ]
    };
};

export const getDocumentosSindico = async () => {
    await delay(500);

    return {
        total: 1,
        documentos: [
            {
                id: 1,
                titulo: "Regulamento Interno",
                tipo: "PDF",
                categoria: "Condomínio",
                data: "2024-01-01",
                url: "https://example.com/regulamento.pdf"
            }
        ]
    };
};

export const cadastrarDocumentosSindico = async (payload?: any) => {
    await delay(500);

    return {
        sucesso: true,
        mensagem: "Documento cadastrado com sucesso.",
        payloadRecebido: payload      
    };
};

export const uploadArquivosSindico = async (arquivos?: any[]) => {
    await delay(500);

    return {
        sucesso: true,
        arquivos: (arquivos || []).map((a, index) => ({
            nome: a?.nome || `arquivo${index + 1}.pdf`,
            url: `https://example.com/upload/${a?.nome || `arquivo${index + 1}.pdf`}`
        }))
    };
};