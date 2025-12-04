export interface ExtratoParcela {
    CODIGO_CONTRATO: number;
    CODIGO_PARCELA: number;
    DATA_GERACAO_PARCELA: string;
    DATA_VENCTO_PARCELA: string;
    VALOR_ORIGINAL: string;
    VALOR_PAGO: string;
    VALOR_MULTA: string;
    VALOR_ATRASO: string;
    VALOR_JUROS: string;
    VALOR_DESCONTO: string;
    DATA_BAIXA_PARCELA: string | null;
}

export interface Boleto2Via {
    LINHA_DIGITAVEL: string;
    ERRO: boolean;
    DESCRICAO: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const megaService = {
    async getExtratoFinanceiro(codigoContrato: number): Promise<ExtratoParcela[]> {
        await delay(500);

        return [
            {
                CODIGO_CONTRATO: codigoContrato,
                CODIGO_PARCELA: 1,
                DATA_GERACAO_PARCELA: "2024-01-01",
                DATA_VENCTO_PARCELA: "2024-01-10",
                VALOR_ORIGINAL: "1200.00",
                VALOR_PAGO: "1200.00",
                VALOR_MULTA: "0.00",
                VALOR_ATRASO: "0.00",
                VALOR_JUROS: "0.00",
                VALOR_DESCONTO: "0.00",
                DATA_BAIXA_PARCELA: "2024-01-09"
            },
            {
                CODIGO_CONTRATO: codigoContrato,
                CODIGO_PARCELA: 2,
                DATA_GERACAO_PARCELA: "2024-02-01",
                DATA_VENCTO_PARCELA: "2024-02-10",
                VALOR_ORIGINAL: "1200.00",
                VALOR_PAGO: "0.00",
                VALOR_MULTA: "15.00",
                VALOR_ATRASO: "8.90",
                VALOR_JUROS: "2.10",
                VALOR_DESCONTO: "0.00",
                DATA_BAIXA_PARCELA: null
            }
        ];
    },

    async obterBoleto2Via(
        codigoContrato: number,
        codigoParcela: number
    ): Promise<
        Boleto2Via & {
            VALOR_TOTAL?: string;
            VALOR_DESCONTO?: string;
            VALOR_ANTECIPADO?: string;
            SALDO_RESTANTE?: string;
        } | null
    > {
        await delay(500);

        const valor = "1200.00";

        return {
            LINHA_DIGITAVEL: "01234.56789 11111.222333 01234.556677 8 12340000010000",
            ERRO: false,
            DESCRICAO: `Boleto gerado para contrato ${codigoContrato}, parcela ${codigoParcela}`,
            VALOR_TOTAL: valor,
            VALOR_DESCONTO: "0.00",
            VALOR_ANTECIPADO: "0.00",
            SALDO_RESTANTE: valor
        };
    }
};