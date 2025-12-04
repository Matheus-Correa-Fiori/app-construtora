import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, Dimensions, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { getUnidades } from '../../services/unidadeService';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { BottomNavigator } from '../../components/BottomNavigator/BottomNavigator';
import { EmptyCard } from '../../components/EmptyCard/EmptyCard';
import { WhatsAppIcon } from '../../components/Icons/WhatsAppIcon';
import AppHeader from '../../components/AppHeader/AppHeader';
import { styles } from './dashboardStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1.idcontrato !== r2.idcontrato)
  );

  const layoutProvider = new LayoutProvider(
    () => 'CARD',
    (type, dim) => {
      dim.width = width;
      dim.height = 360;
    }
  );

  useEffect(() => {
    const initialize = async () => {
      try {
        const cache = await AsyncStorage.getItem('unidadesCache');
        if (cache) {
          const parsed = JSON.parse(cache);
          setDataProvider(prev => prev.cloneWithRows(preProcessUnidades(parsed)));
          setLoading(false);
        }

        const unidadesData = await getUnidades();
        const processed = preProcessUnidades(unidadesData || []);
        setDataProvider(prev => prev.cloneWithRows(processed));
        await AsyncStorage.setItem('unidadesCache', JSON.stringify(processed));
      } catch (err) {
        console.error('Erro ao buscar dados: ', err);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const preProcessUnidades = (unidades: any[]) => {
    return unidades.map(u => ({
      idcontrato: u.idunidade,
      cod_contrato: u.idunidade, // 🔥 necessário para carregar parcelas
  
      titulo: u.empreendimento?.nome || 'Unidade',
      tipo: u.perfil?.nome || '',
      criado: u.data_entrega_chaves,
  
      unidade: {
        nome: u.nome,
        bloco: u.bloco ? { idbloco: u.bloco.idbloco, nome: u.bloco.nome } : null,
        empreendimento: {
          idempreendimento: u.empreendimento?.idempreendimento,
          nome: u.empreendimento?.nome,
          foto: u.empreendimento?.foto,
          porcentagem_total_estagio_obra: u.empreendimento?.porcentagem_total_estagio_obra,
        },
      },
    }));
  };  

  const rowRenderer = (_type: string | number, data: any) => (
    <View style={styles.padding}>
      <ProjectCard
        data={data}
        onPress={idEmpreendimento =>
          navigation.navigate('Detalhes', { idEmpreendimento, contrato: data })
        }
      />
    </View>
  );

  const openWhatsApp = () => {
    const phoneNumber = '5541922227777';
    const url = `whatsapp://send?phone=${phoneNumber}&text=Olá, gostaria de mais informações.`;
    Linking.openURL(url).catch(() => {
      alert('Não foi possível abrir o WhatsApp.');
    });
  };
  
  if (loading && dataProvider.getSize() === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader />
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Unidades</Text>
      </View>

      {dataProvider.getSize() > 0 ? (
        <RecyclerListView
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          initialRenderIndex={0}
          renderAheadOffset={300}
        />
      ) : (
        <EmptyCard message="Você não possui unidades." />
      )}

      <TouchableOpacity style={styles.whatsapp} onPress={openWhatsApp}>
        <WhatsAppIcon size={28} color="#fff" />
      </TouchableOpacity>

      <BottomNavigator
        currentScreen="Dashboard"
        onNavigate={screen => navigation.navigate(screen)}
      />
    </SafeAreaView>
  );
}