const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getContratos() {
    await delay(700);

    return {
        total: 2,
        contratos: [
            {
                idcontrato: 1,
                titulo: "Contrato de Compra e Venda",
                tipo: "Padrão",
                criado: "2023-01-10",

                unidade: {
                    idunidade: 1,
                    nome: "Apto 101",
                    bloco: {
                        idbloco: 10,
                        nome: "Bloco A"
                    },
                    etapa: {
                        idetapa: 1,
                        nome: "1",
                    },
                    empreendimento: {
                        idempreendimento: 100,
                        nome: "Residencial Flores",
                        foto: {
                            url: "https://placehold.co/600x400",
                        },
                        porcentagem_total_estagio_obra: 68,
                    },
                },

                arquivo: {
                    url: "https://example.com/contrato1.pdf",
                },
            },
            {
                idcontrato: 2,
                titulo: "Contrato de Compra e Venda",
                tipo: "Padrão",
                criado: "2024-01-10",

                unidade: {
                    idunidade: 2,
                    nome: "Apto 202",
                    bloco: {
                        idbloco: 10,
                        nome: "Bloco A"
                    },
                    etapa: {
                        idetapa: 2,
                        nome: "2",
                    },
                    empreendimento: {
                        idempreendimento: 101,
                        nome: "Residencial Flores",
                        foto: {
                            url: "https://placehold.co/600x400",
                        },
                        porcentagem_total_estagio_obra: 85,
                    },
                },

                arquivo: {
                    url: "https://example.com/contrato2.pdf",
                },
            },
            {
                idcontrato: 3,
                titulo: "Contrato de Manutenção Predial",
                tipo: "Manutenção",
                criado: "2022-08-01",

                unidade: {
                    idunidade: 3,
                    nome: "Apto 305",
                    bloco: {
                        idbloco: 12,
                        nome: "Bloco B"
                    },
                    etapa: {
                        idetapa: 3,
                        nome: "3",
                    },
                    empreendimento: {
                        idempreendimento: 102,
                        nome: "Condomínio Morada Azul",
                        foto: {
                            url: "https://placehold.co/600x400",
                        },
                        porcentagem_total_estagio_obra: 92
                    },
                },

                arquivo: {
                    url: "https://example.com/contrato3.pdf",
                },
            },
        ],
    };
}