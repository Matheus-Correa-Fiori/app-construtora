export interface Unidade {
    idunidade: number;
    nome: string;
    data_entrega_chaves: string | null;
    
    perfil: {
        nome: string;
    } | null;

    bloco: {
        idbloco: number;
        nome: string;
    } | null;

    empreendimento: {
        idempreendimento: number;
        nome: string;
        foto: string | null;
        porcentagem_total_estagio_obra: number;
    };
}

const mockUnidades: Unidade[] = [
    {
        idunidade: 1,
        nome: "Apto 101",
        data_entrega_chaves: "2024-01-15",
        perfil: {nome: "Residencial"},
        bloco: {idbloco: 10, nome: "Bloco A"},
        empreendimento: {
            idempreendimento: 100,
            nome: "Residencial Flores",
            foto: null,
            porcentagem_total_estagio_obra: 68,
        }
    },
    {
        idunidade: 2,
        nome: "Apto 202",
        data_entrega_chaves: "2024-01-20",
        perfil: {nome: "Residencial"},
        bloco: {idbloco: 10, nome: "Bloco A"},
        empreendimento: {
            idempreendimento: 101,
            nome: "Residencial Flores",
            foto: null,
            porcentagem_total_estagio_obra: 85,
        }
    },
    {
        idunidade: 3,
        nome: "Apto 305",
        data_entrega_chaves: "2024-02-10",
        perfil: {nome: "Premium"},
        bloco: {idbloco: 12, nome: "Bloco B"},
        empreendimento: {
            idempreendimento: 102,
            nome: "Condomínio Morada Azul",
            foto: null,
            porcentagem_total_estagio_obra: 92,
        }
    }
];

export async function getUnidades(): Promise<Unidade[]> {
    console.log("getUnidades() → usando dados mockados");

    await new Promise(resolve => setTimeout(resolve, 400));

    return mockUnidades;
}