export interface Contrato {
    idcontrato: number,
    titulo: string;
    tipo: string;
    criado: string;
    unidade: {
        idunidade: number;
        nome: string;
        bloco: {
            idbloco: number;
            nome: string;
        };
        etapa: {
            idetapa: number;
            nome: string;
        };
        empreendimento: {
            idempreendimento: number;
            nome: string;
            foto?: {
                url: string;
            };
            porcentagem_total_estagio_obra?: number;
        };
    };
    arquivo: {
        url: string;
    };
}