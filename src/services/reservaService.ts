import { Pessoa } from "./pessoaService";

export interface ComissaoItem {
    comissao_para: string;
    cpf_faturamento: string;
    cnpj_faturamento: string;
    comissao_quem: string;
    comissao_id_quem: number;
    comissao_tipo: string;
    comissao_porcentagem: string;
    comissao_valor: string;
    enviar_pagadoria: string;
}

export interface Comissoes {
    idregra_comissao: number;
    regra_comissao: string;
    comissao_valortotal: string;
    premio_valortotal: string;

    [codigo: string]: ComissaoItem | string | number;
}

export interface Reserva {
  situacao: {
      idsituacao: number;
      situacao: string;
      idgrupo: number;
      grupo: string;
  };
  imobiliaria: {
      email: string;
      telefone: string;
      cnpj: string;
  };
  unidade: {
      empreendimento: string;
      idempreendimento_cv: number;
      idempreendimento_int: string;
      etapa: string;
      idetapa_cv: number;
      idetapa_int: string;
      bloco: string;
      idbloco_cv: number;
      idbloco_int: string;
      unidade: string;
      idunidade_cv: number;
      idunidade_int: string;
      planta: string;
      tipologia: string;
      posicao: string;
      area_privativa: string;
      andar: number;
      coluna: number;
      tipo: string;
      numeracao_deposito: string;
      vagas_garagem: string;
      area_garagem: string;
      area_comum: string;
      area_terreno: string;
      fracao_ideal: string;
  };
  titular: {
      nome: string;
      idpessoa_cv: number;
      porcentagem: number;
      idpessoa_int: string;
      documento_tipo: string;
      nascimento: string;
      documento: string;
      rg: string;
      rg_orgao_emissor: string;
      rg_data_emissao: string;
      estado_civil: string;
      profissao: string;
      profissao_select: string;
      logradouro: string;
      idlogradouro: string;
      endereco: string;
      numero: string;
      complemento: string;
      bairro: string;
      cep: string;
      cidade: string;
      estado: string;
      pais: string;
      telefone: string;
      celular: string;
      email: string;
      sexo: string;
      marketing_pos_venda: string;
      naturalidade: string;
      nacionalidade: string;
      como_ficou_sabendo: string;
      renda_familiar: string;
  };
  associados: Record<string, any>;
  corretor: {
      corretor: string;
      idcorretor_int: string;
      idcorretor_cv: number;
      idimobiliaria_cv: number;
      idimobiliaria_int: string;
      email: string;
      telefone: string;
      documento: string;
      cnpj_faturamento: string;
      razaosocial_faturamento: string;
      nomefantasia_faturamento: string;
      data_nasc: string;
      sexo: string;
      creci: string;
      imobiliaria: string;
  };
  condicoes: {
      valor_contrato: string;
      vpl_reserva: string;
      vgv_tabela: string;
      vpl_tabela: string;
      valor_venda: string;
      idtabela: number;
      idtabela_origem: number;
      idtabela_condicao_aprovada: number;
      series: Array<{
          idcondicao: string;
          indexador: string;
          forma_pagamento: string;
          quantidade: string;
          serie: string;
          possui_juros: string;
          possui_correcao: string;
          juros_condicao: string;
          juros_contrato: string;
          prestacao_saf: number;
          idserie_int: string;
          valor: string;
          sigla: string;
          vencimento: string;
          fixo: number;
          valor_seriecomissaoforadocontrato: string;
          valor_seriecomissaonocontrato: string;
          programacao: {
              comissao: Array<{ valor: string; contrato: string; retirarSubTotal: string }>;
              premio: Array<{ valor: string; contrato: string; retirarSubTotal: string }>;
          };
      }>;
      total_proposta: string;
  };
  comissoes: Comissoes;
  leads_associados: Array<{
      idlead: number;
      idsituacao: number;
      data_cad: string;
  }>;
  idproposta_cv: number;
  idproposta_int: string;
  vendida: string;
  observacoes: string;
  data_contrato: string;
  data: string;
  data_venda: string;
  idtipovenda: number;
  tipovenda: string;
  idprecadastro: number;
  ultima_mensagem: string;
  idtime: number;
  contratos: Array<{ idcontrato: number; contrato: string; data: string }>;
  campos_adicionais: Array<{
      idcampo_adicional: number;
      nome: string;
      valor: string;
      nome_referencia: string;
      funcionalidade: string;
  }>;
  empresaCorrespondente: {
      idempresa: number;
      nome: string;
  };
}

const mockReservas: Record<string, Reserva> = {
    "123": {
      situacao: {
        idsituacao: 1,
        situacao: "Ativa",
        idgrupo: 10,
        grupo: "Residencial",
      },
  
      imobiliaria: {
        email: "contato@imobiliaria.com",
        telefone: "41999999999",
        cnpj: "00000000000100",
      },
  
      unidade: {
        empreendimento: "Residencial Flores",
        idempreendimento_cv: 100,
        idempreendimento_int: "EMP100",
        etapa: "1",
        idetapa_cv: 1,
        idetapa_int: "ETP1",
        bloco: "A",
        idbloco_cv: 10,
        idbloco_int: "BL10",
        unidade: "202",
        idunidade_cv: 202,
        idunidade_int: "UND202",
        planta: "2Q 60m²",
        tipologia: "Padrão",
        posicao: "Frente",
        area_privativa: "60",
        andar: 2,
        coluna: 1,
        tipo: "Apartamento",
        numeracao_deposito: "",
        vagas_garagem: "1",
        area_garagem: "10",
        area_comum: "5",
        area_terreno: "2000",
        fracao_ideal: "0.0123",
      },
  
      titular: {
        nome: "João da Silva",
        idpessoa_cv: 1,
        porcentagem: 100,
        idpessoa_int: "INT1",
        documento_tipo: "CPF",
        nascimento: "1990-01-01",
        documento: "12345678901",
        rg: "1234567",
        rg_orgao_emissor: "SSP",
        rg_data_emissao: "2010-01-01",
        estado_civil: "Solteiro",
        profissao: "Analista",
        profissao_select: "Analista",
        logradouro: "Rua Exemplo",
        idlogradouro: "1",
        endereco: "Rua Exemplo",
        numero: "100",
        complemento: "",
        bairro: "Centro",
        cep: "80000000",
        cidade: "Curitiba",
        estado: "PR",
        pais: "Brasil",
        telefone: "4130000000",
        celular: "41999999999",
        email: "email@email.com",
        sexo: "M",
        marketing_pos_venda: "S",
        naturalidade: "Brasileiro",
        nacionalidade: "Brasileiro",
        como_ficou_sabendo: "Indicação",
        renda_familiar: "5000",
      },
  
      associados: {},

      corretor: {
        corretor: "Maria Corretora",
        idcorretor_int: "CRT1",
        idcorretor_cv: 1,
        idimobiliaria_cv: 1,
        idimobiliaria_int: "IMOB1",
        email: "corretora@email.com",
        telefone: "41988888888",
        documento: "99999999999",
        cnpj_faturamento: "11111111000111",
        razaosocial_faturamento: "Imobiliária XYZ",
        nomefantasia_faturamento: "XYZ Imóveis",
        data_nasc: "1985-10-10",
        sexo: "F",
        creci: "12345",
        imobiliaria: "Imobiliária XYZ",
      },

      condicoes: {
        valor_contrato: "250000",
        vpl_reserva: "250000",
        vgv_tabela: "250000",
        vpl_tabela: "250000",
        valor_venda: "250000",
        idtabela: 1,
        idtabela_origem: 1,
        idtabela_condicao_aprovada: 1,
        series: [
          {
            idcondicao: "1",
            indexador: "IPCA",
            forma_pagamento: "Mensal",
            quantidade: "120",
            serie: "A",
            possui_juros: "S",
            possui_correcao: "S",
            juros_condicao: "0.5",
            juros_contrato: "0.5",
            prestacao_saf: 0,
            idserie_int: "SER1",
            valor: "2000",
            sigla: "PARC",
            vencimento: "2025-01-10",
            fixo: 0,
            valor_seriecomissaoforadocontrato: "0",
            valor_seriecomissaonocontrato: "0",
            programacao: {
              comissao: [],
              premio: [],
            },
          },
        ],
        total_proposta: "250000",
      },
  
      comissoes: {
        idregra_comissao: 1,
        regra_comissao: "Padrão",
        comissao_valortotal: "5000",
        premio_valortotal: "0",
      
        COM1: {
          comissao_para: "Corretor",
          cpf_faturamento: "12345678901",
          cnpj_faturamento: "",
          comissao_quem: "Maria Corretora",
          comissao_id_quem: 1,
          comissao_tipo: "Percentual",
          comissao_porcentagem: "2",
          comissao_valor: "5000",
          enviar_pagadoria: "N",
        },
      },

      leads_associados: [],
  
      idproposta_cv: 123,
      idproposta_int: "PROP123",
      vendida: "N",
      observacoes: "",
      data_contrato: "2024-01-01",
      data: "2024-01-01",
      data_venda: "2024-01-10",
      idtipovenda: 1,
      tipovenda: "Direta",
      idprecadastro: 0,
      ultima_mensagem: "Aguardando documentação",
      idtime: 1,
  
      contratos: [
        {
          idcontrato: 1,
          contrato: "CTR123",
          data: "2024-01-01",
        },
      ],
  
      campos_adicionais: [],
  
      empresaCorrespondente: {
        idempresa: 1,
        nome: "Banco XPTO",
      },
    },
  };
  

export const reservaService = {
    async getReservas(
        pessoa: Pessoa,
        options?: {
            situacao?: "todas" | "vendida" | "pode_faturar";
            faturar?: boolean;
            retornar_integradas?: boolean;
        }
    ): Promise<Record<string, Reserva>> {
        console.log("Usando reservaService mockado");

        await new Promise(res => setTimeout(res, 400));

        if (!pessoa.documento) {
            throw new Error("Documento inválido.");
        }

        return mockReservas;
    },
};