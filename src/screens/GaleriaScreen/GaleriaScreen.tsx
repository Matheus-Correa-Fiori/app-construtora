import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { getGaleriaObraEmpreendimento } from '../../services/empreendimentosService';
import { styles } from './galeriaStyles';
import AppHeader from '../../components/AppHeader/AppHeader';
import ImageViewer from 'react-native-image-zoom-viewer';
import { EmptyCard } from '../../components/EmptyCard/EmptyCard';
import { ArrowLeft } from 'lucide-react-native';

type GaleriaRouteProp = RouteProp<{ params: { idEmpreendimento: number } }, 'params'>;

type Midia = {
  idmidia: number;
  url: string;
  titulo?: string;
  nome?: string;
  tipo?: string;
  tamanho?: number;
  thumbnail?: string | null;
  data_cad?: string;
};

export default function GaleriaScreen() {
  const route = useRoute<GaleriaRouteProp>();
  const navigation = useNavigation();
  const { idEmpreendimento } = route.params;

  const [galeriasAgrupadas, setGaleriasAgrupadas] = useState<
    Array<{rangeLabel: string; fotos: Midia[]}>
  >([]);
  const [galeriaSelecionada, setGaleriaSelecionada] = useState<{
    fotos: Midia[];
    index: number;
  } | null>(null);

  const agruparPorSemana = (dateStr?: string) => {
    const d = dateStr ? new Date(dateStr) : new Date();

    const day = d.getDay();
    const diffToSunday = d.getDate() - day;
    const sunday = new Date(d);
    sunday.setDate(diffToSunday);

    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);

    const formatDate = (date: Date) =>
        `${String(date.getDate()).padStart(2, '0')}/${String(
          date.getMonth() + 1
        ).padStart(2, '0')}/${date.getFullYear()}`;

    const key = `${sunday.getFullYear()}-${String(
        Math.ceil(
          ((d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 86400000 + 1) / 7
      )
    ).padStart(2, '0')}`;

    return {
        key,
        startDate: sunday,
        endDate: saturday,
        label: `De ${formatDate(sunday)} a ${formatDate(saturday)}`
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGaleriaObraEmpreendimento(idEmpreendimento);

      const todasMidias: Midia[] = (Array.isArray(data) ? data : []).flatMap((g: any) =>
        (g.midias || []).map((m: any) => ({...m, data_cad: g.data_cad}))
      );

      const agrupado: Record<string, {rangeLabel: string; fotos: Midia[]}> = {};

      todasMidias.forEach((midia) => {
        const {key, label} = agruparPorSemana(midia.data_cad);
        if (!agrupado[key]) agrupado[key] = {rangeLabel: label, fotos: []};
        agrupado[key].fotos.push(midia);
      });

      const semanasOrdenadas = Object.values(agrupado).sort((a, b) => {
        const sundayA = new Date(a.fotos[0].data_cad!);
        sundayA.setDate(sundayA.getDate() - sundayA.getDay());

        const sundayB = new Date(b.fotos[0].data_cad!);
        sundayB.setDate(sundayB.getDate() - sundayB.getDay());

        return sundayB.getTime() - sundayA.getTime();
    });

      setGaleriasAgrupadas(semanasOrdenadas);
    };

    fetchData();
  }, [idEmpreendimento]);

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Galeria</Text>
      </View>

      {galeriasAgrupadas.length > 0 ? (
        <FlatList
          data={galeriasAgrupadas}
          keyExtractor={(item) => item.rangeLabel}
          renderItem={({item}) => (
            <View style={styles.semanaContainer}>
              <Text style={styles.semanaTitulo}>{item.rangeLabel}</Text>
              <View style={styles.grid}>
                {item.fotos.map((foto) => (
                  <TouchableOpacity
                    key={foto.idmidia}
                    style={styles.thumbWrap}
                    onPress={() =>
                      setGaleriaSelecionada({
                        fotos: item.fotos,
                        index: item.fotos.findIndex((f) => f.idmidia === foto.idmidia),
                      })
                    }
                  >
                    <Image
                      source={{uri: foto.thumbnail || foto.url}}
                      style={styles.thumbnail}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        />
      ) : (
        <EmptyCard message="A galeria deste empreendimento não possui fotos." />
      )}

      <Modal
        visible={!!galeriaSelecionada}
        transparent
        onRequestClose={() => setGaleriaSelecionada(null)}
      >
        {galeriaSelecionada && (
          <ImageViewer
            imageUrls={galeriaSelecionada.fotos.map((f) => ({url: f.url}))}
            index={galeriaSelecionada.index}
            enableSwipeDown
            onSwipeDown={() => setGaleriaSelecionada(null)}
            renderHeader={() => (
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setGaleriaSelecionada(null)}
              >
                <Text style={styles.modalCloseText}>Fechar</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </Modal>
    </View>
  );
}