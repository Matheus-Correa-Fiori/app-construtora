import React, { useCallback, useEffect, useState, useRef } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { 
  View,
  ScrollView,
  Text,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Modal,
  findNodeHandle,
  UIManager
} from 'react-native';
import { ArrowLeft, Copy, Menu as MenuIcon, ImageIcon, CircleCheck, CircleX, CircleEllipsis } from 'lucide-react-native';
import { styles } from './detalhesStyles';
import { colors } from '../../types/Colors';
import {
  getGaleriaObraEmpreendimento,
  getAndamentoObraEmpreendimento,
  getComunicadosEmpreendimento
} from '../../services/empreendimentosService';
import { NovaParcela, parcelasService } from '../../services/parcelasService';
import { megaService } from '../../services/megaService';
import { reservaService } from '../../services/reservaService';
import { pessoaService, Pessoa } from '../../services/pessoaService';
import { getContratos } from '../../services/contratoService';
import Clipboard from '@react-native-clipboard/clipboard';
import AppHeader from '../../components/AppHeader/AppHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-reanimated-carousel';
import { CircularProgress } from '../../components/CircularProgress/CircularProgress';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { useSharedValue } from 'react-native-reanimated';
import { Contrato } from '../../types/Contrato';
import { EmptyCard } from '../../components/EmptyCard/EmptyCard';
import { WhatsAppIcon } from '../../components/Icons/WhatsAppIcon';

type ParcelasPorUnidade = {
  unidadeId: number;
  unidadeNome: string;
  parcelas: NovaParcela[];
}[];

interface Midia {
  idmidia: number;
  url: string;
  titulo?: string;
  nome?: string;
  tipo?: string;
  tamanho?: number;
  thumbnail?: string | null;
}

interface BoletoFull {
  LINHA_DIGITAVEL: string
  ERRO: boolean
  DESCRICAO: string
  VALOR_TOTAL?: string
  VALOR_DESCONTO?: string
  VALOR_ANTECIPADO?: string
  SALDO_RESTANTE?: string
}

interface BoletoSelecionado extends BoletoFull {
  VALOR_TOTAL_PARCELA?: string;
}

type DetalhesRouteProp = RouteProp<RootStackParamList, 'Detalhes'>

export default function DetalhesScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const route = useRoute<DetalhesRouteProp>();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['40%', '80%'], []);
  const {idEmpreendimento, contrato: contratoInicial} = route.params;
  const {width} = Dimensions.get("window");

  const [loading, setLoading] = useState(true)
  const [contrato, setContrato] = useState<Contrato | null>(contratoInicial ?? null);
  const [contratoAPI, setContratoAPI] = useState<Contrato | null>(null);
  const [parcelas, setParcelas] = useState<NovaParcela[]>([])
  const [parcelaSelecionada, setParcelaSelecionada] = useState<NovaParcela | null>(null);
  const [galeriaData, setGaleriaData] = useState<Midia[]>([])
  const [andamentoObra, setAndamentoObra] = useState<any>(null)
  const [comunicados, setComunicados] = useState<any[]>([])
  const [ParcelasPorUnidade, setParcelasPorUnidade] = useState<ParcelasPorUnidade>([])
  const [boletoModalVisible, setBoletoModalVisible] = useState(false);
  const [loadingBoleto, setLoadingBoleto] = useState(false)
  const [visibleCounts, setVisibleCounts] = useState<{[key: number]: number}>({});
  const [boletoSelecionado, setBoletoSelecionado] = useState<BoletoSelecionado | null>(null)
  const [copiado, setCopiado] = useState(false);

  const scrollRef = useRef<FlatList<any> | null>(null);
  const galeriaRef = useRef<View>(null);
  const contratoRef = useRef<View>(null);
  const andamentoRef = useRef<View>(null);
  const comunicadosRef = useRef<View>(null);
  const financeiroRef = useRef<View>(null);

  const [menuVisible, setMenuVisible] = useState(false);

  const parseDateBR = (s: string) => {
    if (!s) return new Date(0);
    const parts = s.split('/');
    if (parts.length !== 3) return new Date(0);
    const [day, month, year] = parts;
    return new Date(Number(year), Number(month) -1, Number(day));
  }

  const getValorParcela = (item: NovaParcela) => {
    if (item.vlr_pago && Number(item.vlr_pago) !== 0) {
      return Number(item.vlr_pago);
    }
    return Number(item.vlr_original) || 0;
  }
    
  const copiarCodigoBarras = (codigo: string) => {
    Clipboard.setString(codigo);
  };

  const comunicadoDataBR = (data: string) => {
    if (!data) return '';
    const dt = new Date(data);
    const day = dt.getDate().toString().padStart(2, '0');
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const year = dt.getFullYear();
    const hours = dt.getHours().toString().padStart(2, '0');
    const minutes = dt.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  const ordenarParcelas = useCallback((parcelas: NovaParcela[]) => {
    return [...parcelas].sort((a, b) => {
      const da = parseDateBR(a.data_vencimento).getTime();
      const db = parseDateBR(b.data_vencimento).getTime();
      return da - db;
    });
  }, []);

  const abrirDetalhesParcela = (item: NovaParcela) => {
    setParcelaSelecionada(item);
    bottomSheetRef.current?.expand();
  };

  const scrollAutomatico = (ref: React.RefObject<View | null>) => {
    if (!ref?.current || !scrollRef.current) return;
  
    try {
      const scrollNode = findNodeHandle(scrollRef.current);
      const targetNode = findNodeHandle(ref.current);
  
      if (!scrollNode || !targetNode) {
        console.warn("Não foi possível encontrar um node nativo para scroll automático.");
        return;
      }
  
      UIManager.measureLayout(
        targetNode,
        scrollNode,
        () => {
          console.warn("Falha ao medir layout.");
        },
        (x: number, y: number) => {
          scrollRef.current?.scrollToOffset({
            offset: y,
            animated: true,
          });
        }
      );
    } catch (error) {
      console.error("Erro no scroll automático:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          console.error('Token não encontrado');
          setLoading(false);
          return;
        }

        const [galeriaData, andamentoData, comunicadosData] = await Promise.all([
          getGaleriaObraEmpreendimento(idEmpreendimento),
          getAndamentoObraEmpreendimento(idEmpreendimento),
          getComunicadosEmpreendimento(idEmpreendimento),
        ]);

        try {
          const contratosData = await getContratos();
          const contratoEncontrado = contratosData.contratos.find(
            (c: any) =>
              c.unidade?.empreendimento?.idempreendimento === idEmpreendimento
          );
          setContratoAPI(contratoEncontrado ?? null);
        } catch (err) {
          console.error('Erro ao buscar contrato da API: ', err);
          setContratoAPI(null);
        }
  
        try {
          const pessoa: Pessoa = await pessoaService.getPessoa();
          const reservasMap = await reservaService.getReservas(pessoa, {
            situacao: 'todas',
            faturar: false,
            retornar_integradas: false,
          });
          const reservas = Object.values(reservasMap || {});
          const reservasDoEmpreendimento = reservas.filter((r) => {
            const idCV = r?.unidade?.idempreendimento_cv;
            return idCV === idEmpreendimento;
          });

          const unidadesParcelas: ParcelasPorUnidade = [];
  
          for (const reserva of reservasDoEmpreendimento) {
            try {
              const idContrato = Number(reserva?.idproposta_int);
              if (!idContrato) continue;
  
              const parcelasAPI = await parcelasService.getParcelasByContrato(idContrato);   

              const parcelasOrdenadas = ordenarParcelas(parcelasAPI);
              unidadesParcelas.push({
                unidadeId: reserva?.unidade?.idunidade_cv ?? 0,
                unidadeNome:
                  (reserva?.unidade?.bloco ? `${reserva.unidade.bloco} - ` : '') +
                  (reserva?.unidade?.unidade ?? 'Unidade'),
                parcelas: parcelasOrdenadas,
              });
            } catch (innerErr) {
              console.error('Erro ao obter parcelas do MegaERP:', innerErr);
            }
          }
  
          setParcelasPorUnidade(unidadesParcelas);  
          setParcelas(unidadesParcelas[0]?.parcelas ?? []);  
        } catch (e) {
          console.error('Erro ao montar extrato financeiro via MegaERP: ', e);
          setParcelas([]);
          setParcelasPorUnidade([]);
        }
  
        const agruparFotos = Array.isArray(galeriaData)
          ? galeriaData
            .flatMap((g: { midias: Midia[]; data_cad: string }) =>
              g.midias.map((m: Midia) => ({ ...m, data_cad: g.data_cad }))
            )
            .sort((a, b) => new Date(b.data_cad).getTime() - new Date(a.data_cad).getTime())
            .slice(0, 5)
          : [];
        setGaleriaData(agruparFotos);
  
        setAndamentoObra(andamentoData || null);
        setComunicados(comunicadosData || []);

        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados: ', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [idEmpreendimento, ordenarParcelas]);

  const openWhatsApp = () => {
    const phoneNumber = '5541922227777';
    const url = `whatsapp://send?phone=${phoneNumber}&text=Olá, gostaria de mais informações.`;
    Linking.openURL(url).catch(() => {
      alert('Não foi possível abrir o WhatsApp.');
    });
  };

  useEffect(() => {
    if (ParcelasPorUnidade.length > 0) {
      const parcelasIniciais: {[key: number]: number} = {};
      ParcelasPorUnidade.forEach(u => {
        parcelasIniciais[u.unidadeId] = 6;
      });
      setVisibleCounts(parcelasIniciais);
    }
  }, [ParcelasPorUnidade]);

  const mostrarMais = (unidadeId: number) => {
    setVisibleCounts(prev => ({
      ...prev,
      [unidadeId]: (prev[unidadeId] || 6) + 3,
    }));
  };

  const filtrarParcelasRecentes = (parcelas: NovaParcela[]) => {
    const agora = new Date();
    const limite = new Date(agora.setMonth(agora.getMonth() - 3));

    return parcelas.filter(p => {
      const vencimento = parseDateBR(p.data_vencimento);
      return vencimento >= limite;
    });
  };

  const abrirBoleto = async (parcela: NovaParcela) => {
    setLoadingBoleto(true)
    setBoletoModalVisible(true)
  
    try {
      const response = await megaService.obterBoleto2Via(
        parcela.cod_contrato,
        parcela.cod_parcela
      );

      if (response) {
        setBoletoSelecionado({
          ...response,
          VALOR_TOTAL_PARCELA: parcela.vlr_corrigido.toString(),
        });
      } else {
        setBoletoSelecionado(null);
      }
    } catch (err) {
      console.error('Erro ao buscar boleto: ', err);
      setBoletoSelecionado(null);
    }

    setLoadingBoleto(false);
  };

  const statusIcone = (item: NovaParcela) => {
    const hoje = new Date();
    const vencimento = parseDateBR(item.data_vencimento);

    if (item.situacao === "Pago") {
      return <CircleCheck color={colors.green} size={24} />;
    }

    if (vencimento < hoje && item.situacao !== "Pago") {
      return <CircleX color={colors.red} size={24} />;
    }

    if (item.situacao === "Aberto") {
      return <CircleEllipsis color={colors.yellow} size={24} />;
    }

    return null;
  };

  const renderParcela = ({item}: {item: NovaParcela}) => (
    <TouchableOpacity onPress={() => abrirDetalhesParcela(item)}>
      <View style={styles.parcelaItem}>
        <View style={styles.parcelaInfo}>
          <Text style={styles.parcelaText}>
            Parcela {item.sequencia} - R$ {getValorParcela(item).toFixed(2)}
          </Text>
          <Text style={styles.parcelaText}>Vencimento: {item.data_vencimento}</Text>
          <Text style={styles.parcelaStatus}>Status: {item.situacao}</Text>
        </View>

        <View style={styles.parcelaActions}>
          {statusIcone(item)}
          {item.situacao === 'Aberto' && (
            <TouchableOpacity
              style={styles.botaoBoleto}
              onPress={() => abrirBoleto(item)}
            >
              <Text style={styles.botaoBoletoTexto}>Emitir Boleto</Text>
            </TouchableOpacity>      
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const ListHeader = () => {
    const progress = useSharedValue(0);
    const {width} = Dimensions.get("window");
    const ITEM_WIDTH = width * 0.91;
    const ITEM_HEIGHT = ITEM_WIDTH * 0.75;

    const [expandedItems, setExpandedItems] = React.useState<{ [key: number]: boolean }>({});
    const [comunicadosVisibleCount, setComunicadosVisibleCount] = React.useState(3);
    
    const toggleExpand = (index: number) => {
      setExpandedItems(prev => ({
        ...prev,
        [index]: !prev[index],
      }));
    };

    const mostrarMaisComunicados = () => {
      setComunicadosVisibleCount(prev => prev + 3);
    };

    return (
      <>
        <View style={styles.header}>
          <Text style={styles.title}>{contrato?.unidade?.empreendimento?.nome}</Text>
          <Text style={styles.location}>BLOCO {contrato?.unidade?.bloco.idbloco} - {contrato?.unidade?.bloco.nome}</Text>
          <Text style={styles.location}>UNIDADE: {contrato?.unidade?.nome}</Text>
        </View>

        {!contrato && (
          <EmptyCard message="Este empreendimento não possui um contrato." />
        )}

        <View ref={galeriaRef} style={styles.section}>
          <Text style={styles.sectionTitle}>Galeria</Text>
          {galeriaData.length > 0 ? (
            <>
              <View style={styles.carouselContainer}>
                <Carousel
                  loop
                  autoPlay
                  autoPlayInterval={3000}
                  width={ITEM_WIDTH}
                  height={ITEM_HEIGHT}
                  data={galeriaData}
                  mode="parallax"
                  modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 10,
                    parallaxAdjacentItemScale: 1,
                  }}
                  renderItem={({ item }) => (
                    <View style={styles.carouselItem}>
                      <Image source={{ uri: item.url }} style={styles.carouselImage} resizeMode="cover" />
                    </View>
                  )}
                />
              </View>


              <View style={styles.galeriaButtonContainer}>
                <TouchableOpacity
                  style={styles.botaoGaleria}
                  onPress={() => navigation.navigate('Galeria', {idEmpreendimento})}
                >
                  <ImageIcon style={styles.iconGaleria} />
                  <Text style={styles.botaoGaleriaTexto}> Galeria</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <EmptyCard message="Este empreendimento não possui uma galeria." />
          )}
        </View>

        <View ref={contratoRef} style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes do Contrato</Text>

          {contratoAPI ? (
            <View style={styles.infoContainer}>
              <Text style={styles.status}>Status: {contratoAPI.tipo}</Text>
              <Text style={styles.description}>
                Esse empreendimento é parte do seu contrato &quot;{contratoAPI.titulo}&quot;
                criado em {new Date(contratoAPI.criado).toLocaleDateString('pt-BR')}.
              </Text>
            </View>
          ) : (
            <EmptyCard message="Contrato não encontrado." />
          )}
        </View>
        
        <View ref={andamentoRef}>
          {andamentoObra ? (
            <View style={styles.andamentoContainer}>
              <Text style={styles.sectionTitle}>Andamento da Obra</Text>

              <View style={styles.andamentoWrapper}>
                <CircularProgress size={100} strokeWidth={10} progress={andamentoObra.porcentagem_total} />
              </View>

              {andamentoObra.etapas.map((etapa: any, idx: number) => (
                <View key={idx} style={{marginTop: 10}}>
                  <Text style={styles.etapaTitulo}>{etapa.nome}</Text>
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${etapa.porcentagem}%`,
                          backgroundColor: etapa.porcentagem === 100 ? colors.green : colors.blue
                        }
                      ]}
                    />
                  </View>
                  <Text>{etapa.porcentagem}%</Text>
                </View>
              ))}
            </View>
          ) : (
            <EmptyCard message="Este empreendimento não possui registros de andamento." />
          )}
        </View>

        <View ref={comunicadosRef} style={styles.section}>
          {comunicados.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>Comunicados</Text>

              {comunicados
                .slice(0, comunicadosVisibleCount)
                .filter(Boolean)
                .map((comunicado, idx) => {
                  const expanded = expandedItems[idx] || false;
                  const cleanDescricao = (comunicado.descricao ?? "").replace(/<[^>]+>/g, "");

                  return (
                    <View key={idx} style={styles.comunicadoContainer}>
                      <Text style={[styles.comunicadoTitulo, {textTransform: 'uppercase'}]}>
                        {comunicado.titulo}
                      </Text>
                                
                      <Text style={styles.comunicadoData}>
                        {comunicadoDataBR(comunicado.data_cadastro)}
                      </Text>
                
                      <Text style={styles.label}>
                        Tipo: {comunicado.tipo}
                      </Text>
                  
                      <Text style={styles.label}>
                        Categoria: {comunicado.categoria}
                      </Text>

                      <View>
                        <Text style={styles.label}>Mensagem:</Text>
                        <Text
                          style={styles.comunicadoDescricao}
                          numberOfLines={expanded ? undefined : 4}
                          ellipsizeMode="tail"
                        >
                          {cleanDescricao}
                        </Text>
                      </View>

                      <TouchableOpacity onPress={() => toggleExpand(idx)}>
                        <Text style={{color: colors.blue, marginTop: 5}}>
                          {expanded ? "Ver menos" : "Ver mais"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}

              {comunicadosVisibleCount < comunicados.length && (
                <View style={{marginHorizontal: 64}}>
                  <TouchableOpacity
                    style={styles.botaoVerMais}
                    onPress={mostrarMaisComunicados}
                  >
                    <Text style={styles.botaoVerMaisTexto}>Ver mais</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <EmptyCard message="Este empreendimento não possui registros de comunicados." />
          )}
        </View>

        <View ref={financeiroRef} style={styles.section}>
          <Text style={styles.sectionTitle}>Financeiro</Text>
        </View>
      </>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          showMenu={true}
          onSectionSelect={(section) => {
            switch (section) {
              case 'Galeria':
                scrollAutomatico(galeriaRef);
                break;
              case 'Detalhes do Contrato':
                scrollAutomatico(contratoRef);
                break;
              case 'Andamento da Obra':
                scrollAutomatico(andamentoRef);
                break;
              case 'Comunicados':
                scrollAutomatico(comunicadosRef);
                break;
              case 'Financeiro':
                scrollAutomatico(financeiroRef);
                break;
            }
          }}
        />
        <ActivityIndicator size="large" style={{marginTop: 20}} />
      </SafeAreaView>
    )
  }

  const outerData = ParcelasPorUnidade.length
    ? ParcelasPorUnidade
    : parcelas.length
      ? [{unidadeId: 0, unidadeNome: contrato?.unidade.nome ?? 'Unidade', parcelas}]
      : [];

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
      <AppHeader
          showMenu={true}
          onSectionSelect={(section) => {
            switch (section) {
              case 'Galeria':
                scrollAutomatico(galeriaRef);
                break;
              case 'Detalhes do Contrato':
                scrollAutomatico(contratoRef);
                break;
              case 'Andamento da Obra':
                scrollAutomatico(andamentoRef);
                break;
              case 'Comunicados':
                scrollAutomatico(comunicadosRef);
                break;
              case 'Financeiro':
                scrollAutomatico(financeiroRef);
                break;
            }
          }}
        />
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowLeft}>
            <ArrowLeft size={24} color="black" />
          </TouchableOpacity>
          
          <Text style={styles.empreendimentoTitle}>Empreendimento</Text>
        </View>

          <FlatList
            ref={scrollRef}
            data={outerData}
            keyExtractor={(item) => item.unidadeId.toString()}
            ListHeaderComponent={ListHeader}
            contentContainerStyle={styles.financeContainer}
            ListEmptyComponent={<EmptyCard message="Nenhuma parcela encontrada." />}
            renderItem={({item}) => {
              const parcelasFiltradas = filtrarParcelasRecentes(item.parcelas);
              const parcelasOrdenadas = ordenarParcelas(parcelasFiltradas);
              const visibleCount = visibleCounts[item.unidadeId] || 6;
              const parcelasVisiveis = parcelasOrdenadas.slice(0, visibleCount);

              return (
                <View style={{marginBottom: 20}}>
                  {parcelasVisiveis.length > 0 ? (
                    <>
                      <FlatList
                        data={parcelasVisiveis}
                        keyExtractor={(p) => p.cod_parcela.toString()}
                        renderItem={renderParcela}
                        ListEmptyComponent={<EmptyCard message="Nenhuma parcela encontrada" />}
                      />

                      {visibleCount < parcelasFiltradas.length && (
                        <View style={{marginHorizontal: 64}}>
                          <TouchableOpacity
                            style={styles.botaoVerMais}
                            onPress={() => mostrarMais(item.unidadeId)}
                          >
                            <Text style={styles.botaoVerMaisTexto}>Ver mais</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </>
                  ) : (
                    <EmptyCard message="Nenhuma parcela encontrada para esta unidade." />
                  )}
                </View>
              );
            }}
          />

          <TouchableOpacity style={styles.whatsapp} onPress={openWhatsApp}>
            <WhatsAppIcon size={28} color="#fff" />
          </TouchableOpacity>

          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
            backgroundStyle={styles.sheetBackground}
            backdropComponent={(props) => (
              <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                opacity={0.5}
                pressBehavior="close"
                style={styles.backdropStyle}
              />
            )}
          >
            <BottomSheetView style={styles.sheetContent}>
              {parcelaSelecionada ? (
                <>
                  <Text style={styles.sheetTitle}>Detalhes da Parcela</Text>

                  <View style={styles.sheetBox}>
                    <Text style={styles.sheetLabel}>Sequência</Text>
                    <Text style={styles.sheetValue}>{parcelaSelecionada.sequencia ?? '-'}</Text>

                    <Text style={styles.sheetLabel}>Vencimento</Text>
                    <Text style={styles.sheetValue}>{parcelaSelecionada.data_vencimento ?? '-'}</Text>

                    <Text style={styles.sheetLabel}>Situação</Text>
                    <Text style={styles.sheetValue}>{parcelaSelecionada.situacao ?? '-'}</Text>

                    <Text style={styles.sheetLabel}>Valor Original</Text>
                    <Text style={styles.sheetValue}>
                      R$ {Number(parcelaSelecionada.vlr_original ?? 0).toFixed(2)}
                    </Text>
                      
                    <Text style={styles.sheetLabel}>Valor Corrigido</Text>
                    <Text style={styles.sheetValue}>
                      R$ {Number(parcelaSelecionada.vlr_corrigido ?? 0).toFixed(2)}
                    </Text>
                      
                    <Text style={styles.sheetLabel}>Multa</Text>
                    <Text style={styles.sheetValue}>
                      R$ {Number(parcelaSelecionada.vlr_multa ?? 0).toFixed(2)}
                    </Text>
                      
                    <Text style={styles.sheetLabel}>Juros</Text>
                    <Text style={styles.sheetValue}>
                      R$ {Number(parcelaSelecionada.vlr_juros ?? 0).toFixed(2)}
                    </Text>
                      
                    <Text style={styles.sheetLabel}>Atraso</Text>
                    <Text style={styles.sheetValue}>
                      R$ {Number(parcelaSelecionada.vlr_atraso ?? 0).toFixed(2)}
                    </Text>
                      
                    <Text style={styles.sheetLabel}>Desconto</Text>
                    <Text style={styles.sheetValue}>
                      R$ {Number(parcelaSelecionada.vlr_desconto ?? 0).toFixed(2)}
                    </Text>
                      
                    <Text style={styles.sheetLabel}>Taxas</Text>
                    <Text style={styles.sheetValue}>
                      R$ {Number(parcelaSelecionada.vlr_taxas ?? 0).toFixed(2)}
                    </Text>
                      
                    <Text style={styles.sheetLabel}>Valor Pago</Text>
                    <Text style={styles.sheetValue}>
                      R$ {Number(parcelaSelecionada.vlr_pago ?? 0).toFixed(2)}
                    </Text>
                  </View>
                </>
              ) : (
                <Text style={styles.sheetValue}>Nenhuma parcela selecionada</Text>
              )}
            </BottomSheetView>
          </BottomSheet>

          <Modal
            visible={boletoModalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setBoletoModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <ScrollView>
                  <Text style={styles.headerTitle}>Segunda Via do Boleto</Text>

                  {loadingBoleto ? (
                    <ActivityIndicator size="large" />
                  ) : boletoSelecionado ? (
                    boletoSelecionado.ERRO ? (
                      <View style={styles.modalError}>
                        <Text style={styles.copiedButton}>
                          {boletoSelecionado.DESCRICAO || 'Ocorreu um erro ao gerar o boleto. Tente novamente mais tarde!'}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.card}>
                        <Text style={styles.label}>Código de Barras:</Text>

                        <View style={styles.codigoBarrasContainer}>
                          <Text style={styles.codigoBarrasText} numberOfLines={1} ellipsizeMode="middle">
                            {boletoSelecionado.LINHA_DIGITAVEL}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              copiarCodigoBarras(boletoSelecionado.LINHA_DIGITAVEL);
                              setCopiado(true);
                            }}
                            style={styles.copyButton}
                          >
                            <Copy size={24} color="#ccc" />
                          </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Valor Total:</Text>
                        <Text style={styles.value}>R$ {boletoSelecionado?.VALOR_TOTAL_PARCELA ?? '0,00'}</Text>
                      </View>
                    )
                  ) : (
                    <Text>Não foi possível obter a segunda via do boleto.</Text>
                  )}

                  {copiado && (
                    <View style={styles.modalBottom}>
                      <Text style={styles.copiedButton}>
                        Copiado para a área de transferência.
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.botaoFechar}
                    onPress={() => {
                      setBoletoModalVisible(false);
                      setCopiado(false);
                    }}
                  >
                    <Text style={styles.botaoFecharTexto}>Fechar</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </GestureHandlerRootView>
    )
  }