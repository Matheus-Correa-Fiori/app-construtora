import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { megaService } from '../../services/megaService';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './boletoStyles';

type BoletoRouteProp = RouteProp<RootStackParamList, 'Boleto'>;

interface BoletoFull {
    LINHA_DIGITAVEL: string;
    ERRO: boolean;
    DESCRICAO: string;
    VALOR_TOTAL?: string;
    VALOR_DESCONTO?: string;
    VALOR_ANTECIPADO?: string;
    SALDO_RESTANTE?: string;
}

export default function BoletoScreen() {
  const route = useRoute<BoletoRouteProp>();
  const { codigoContrato, codigoParcela } = route.params;

  const [loading, setLoading] = useState(true);
  const [boleto, setBoleto] = useState<BoletoFull | null>(null);

  useEffect(() => {
    const fetchBoleto = async () => {
      setLoading(true);
      try {
        const response = await megaService.obterBoleto2Via(codigoContrato, codigoParcela);
        
        if (response) {
            const extraFields = ['VALOR_TOTAL', 'VALOR_DESCONTO', 'VALOR_ANTECIPADO', 'SALDO_RESTANTE'];
            const boletoFull: BoletoFull = { ... response } as BoletoFull;

            extraFields.forEach(field => {
                const match = response.LINHA_DIGITAVEL ? null : null;
                const regex = new RegExp(`<${field}>(.*?)</${field}>`, 'i');
                const matchField = response ? response as any : null;
            });

            setBoleto(boletoFull);
        } else {
            setBoleto(null);
        }
      } catch (err) {
        console.error('Erro ao buscar boleto: ', err);
        setBoleto(null);
      }
      setLoading(false);
    };

    fetchBoleto();
  }, [codigoContrato, codigoParcela]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!boleto) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Não foi possível obter a segunda via do boleto.</Text>
      </SafeAreaView>
    );
  }

  if (boleto.ERRO) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color: 'red'}}>{boleto.DESCRICAO || 'Erro ao gerar boleto'}</Text>
        </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <Text style={styles.headerTitle}>Segunda Via do Boleto</Text>

            <View style={styles.card}>
              <Text style={styles.label}>Linha Digitável:</Text>
              <Text style={styles.value}>{boleto.LINHA_DIGITAVEL}</Text>

              <Text style={styles.label}>Valor Total:</Text>
              <Text style={styles.value}>{boleto.VALOR_TOTAL ?? '0'}</Text>

              <Text style={styles.label}>Valor Desconto:</Text>
              <Text style={styles.value}>{boleto.VALOR_DESCONTO ?? '0'}</Text>

              <Text style={styles.label}>Valor Antecipado:</Text>
              <Text style={styles.value}>{boleto.VALOR_ANTECIPADO ?? '0'}</Text>

              <Text style={styles.label}>Saldo Restante:</Text>
              <Text style={styles.value}>{boleto.SALDO_RESTANTE ?? '0'}</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}