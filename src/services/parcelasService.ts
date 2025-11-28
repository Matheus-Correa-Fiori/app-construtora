const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export interface NovaParcela {
    cod_contrato: number;
    cod_parcela: number;
    cod_condicao: number;
    cod_serie: number;
    status_parcela: string;
    data_status: string;
    tipo_parcela: string;
    sequencia: string;
    data_vencimento: string;
    data_movimento: string;
    vlr_original: number;
    vlr_corrigido: number;
    vlr_multa: number;
    vlr_atraso: number;
    vlr_juros: number;
    vlr_desconto: number;
    vlr_taxas: number;
    vlr_pago: number;
    data_baixa: string | null;
    receita_pgto: string;
    situacao: string;
    parcela_contratual: string;
    parcela_termo: string;
    parcela_processo: string;
    nosso_numero: string;
    data_Venc_boleto: string;
    nome_banco: string;
    agencia: string;
    conta_corrente: string;
}

const parcelasFake: NovaParcela[] = [
    {
        cod_contrato: 1,
        cod_parcela: 1,
        cod_condicao: 1,
        cod_serie: 1,
        status_parcela: "PAGA",
        data_status: "2024-01-05",
        tipo_parcela: "Mensal",
        sequencia: "001",
        data_vencimento: "2024-01-10",
        data_movimento: "2024-01-02",
        vlr_original: 1200,
        vlr_corrigido: 1200,
        vlr_multa: 0,
        vlr_atraso: 0,
        vlr_juros: 0,
        vlr_desconto: 100,
        vlr_taxas: 0,
        vlr_pago: 1100,
        data_baixa: "2024-01-03",
        receita_pgto: "PIX",
        situacao: "PAGA",
        parcela_contratual: "1/12",
        parcela_termo: "Primeira",
        parcela_processo: "Proc-ABC",
        nosso_numero: "0000000001",
        data_Venc_boleto: "2024-01-10",
        nome_banco: "Banco Exemplo",
        agencia: "1234",
        conta_corrente: "98765-4",
    },
    {
        cod_contrato: 101,
        cod_parcela: 2,
        cod_condicao: 1,
        cod_serie: 1,
        status_parcela: "PAGA",
        data_status: "2024-02-05",
        tipo_parcela: "Mensal",
        sequencia: "002",
        data_vencimento: "2024-02-10",
        data_movimento: "2024-02-01",
        vlr_original: 1200,
        vlr_corrigido: 1200,
        vlr_multa: 0,
        vlr_atraso: 0,
        vlr_juros: 0,
        vlr_desconto: 0,
        vlr_taxas: 0,
        vlr_pago: 1200,
        data_baixa: "2024-02-06",
        receita_pgto: "BOLETO",
        situacao: "PAGA",
        parcela_contratual: "2/12",
        parcela_termo: "Segunda",
        parcela_processo: "Proc-ABC",
        nosso_numero: "0000000002",
        data_Venc_boleto: "2024-02-10",
        nome_banco: "Banco Exemplo",
        agencia: "1234",
        conta_corrente: "98765-4",
    },
    {
        cod_contrato: 101,
        cod_parcela: 3,
        cod_condicao: 1,
        cod_serie: 1,
        status_parcela: "EM_ATRASO",
        data_status: "2024-03-15",
        tipo_parcela: "Mensal",
        sequencia: "003",
        data_vencimento: "2024-03-10",
        data_movimento: "2024-03-01",
        vlr_original: 1200,
        vlr_corrigido: 1350,
        vlr_multa: 80,
        vlr_atraso: 70,
        vlr_juros: 0,
        vlr_desconto: 0,
        vlr_taxas: 0,
        vlr_pago: 0,
        data_baixa: null,
        receita_pgto: "",
        situacao: "EM ATRASO",
        parcela_contratual: "3/12",
        parcela_termo: "Terceira",
        parcela_processo: "Proc-ABC",
        nosso_numero: "0000000003",
        data_Venc_boleto: "2024-03-10",
        nome_banco: "Banco Exemplo",
        agencia: "1234",
        conta_corrente: "98765-4",
    },
    {
        cod_contrato: 101,
        cod_parcela: 4,
        cod_condicao: 1,
        cod_serie: 1,
        status_parcela: "EM ABERTO",
        data_status: "2024-04-01",
        tipo_parcela: "Mensal",
        sequencia: "004",
        data_vencimento: "2024-04-10",
        data_movimento: "",
        vlr_original: 1200,
        vlr_corrigido: 1200,
        vlr_multa: 0,
        vlr_atraso: 0,
        vlr_juros: 0,
        vlr_desconto: 0,
        vlr_taxas: 0,
        vlr_pago: 0,
        data_baixa: null,
        receita_pgto: "",
        situacao: "EM_ABERTO",
        parcela_contratual: "4/12",
        parcela_termo: "Quarta",
        parcela_processo: "Proc-ABC",
        nosso_numero: "0000000004",
        data_Venc_boleto: "2024-04-10",
        nome_banco: "Banco Exemplo",
        agencia: "1234",
        conta_corrente: "98765-4",
    },
];

export const parcelasService = {
    async getParcelasByContrato(idContrato: number): Promise<NovaParcela[]> {
        console.log("Buscando parcelas do contrato:", idContrato);
        await delay(480);

        return parcelasFake.filter(p => p.cod_contrato === idContrato);
    },
};