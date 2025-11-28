export interface Endereco {
    nome: string;
    cep: string;
    numero: string;
    bairro: string;
    complemento: string;
    logradouro: {
        idlogradouro: number;
        nome: string;
    };
    estado: {
        idestado: number;
        nome: string;
    };
    cidade: {
        idcidade: number;
        nome: string;
    };
}

export interface TipoPessoa {
    sigla: string;
    nome: string;
}

export interface Pessoa {
    idpessoa: number;
    codigointerno: string;
    data_cad: string;
    nome: string;
    telefone: string;
    celular: string;
    email: string;
    documento_tipo: string;
    documento: string;
    rg: string;
    renda_familiar: string;
    idunidade_padrao: number;
    endereco: Endereco;
    avatar: string;
    tipo: TipoPessoa;
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const pessoaFake: Pessoa = {
    idpessoa: 1,
    codigointerno: "CLI-001",
    data_cad: "2023-01-10",
    nome: "João da Silva",
    telefone: "1133224455",
    celular: "11999112233",
    email: "joao.silva@example.com",
    documento_tipo: "CPF",
    documento: "12345678910",
    rg: "123456789",
    renda_familiar: "6000",
    idunidade_padrao: 10,
    endereco: {
        nome: "Residencial",
        cep: "01234567",
        numero: "123",
        bairro: "Centro",
        complemento: "Apto 45",
        logradouro: {
            idlogradouro: 1,
            nome: "Rua Exemplo",
        },
        estado: {
            idestado: 1,
            nome: "São Paulo",
        },
        cidade: {
            idcidade: 1000,
            nome: "São Paulo",
        },
    },

    avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",

    tipo: {
        sigla: "CLT",
        nome: "Cliente",
    },
};

export const pessoaService = {
    async getPessoa(): Promise<Pessoa> {
        await delay(500);
        return pessoaFake;
    },
};