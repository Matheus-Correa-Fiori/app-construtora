import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOneSignalNotifications, OneSignalNotification } from "../../services/oneSignalNotifications";
import { getNotificacoes, marcarNotificacaoComoLida } from "../../services/notificacoesService";
import { styles } from "./notificationsStyles";
import { colors } from "../../types/Colors";
import { Bell, BellDot } from "lucide-react-native";
import { BottomNavigator } from "../../components/BottomNavigator/BottomNavigator";
import AppHeader from "../../components/AppHeader/AppHeader";

interface UnifiedNotification {
  id: string;
  title: string;
  body: string;
  date: number;
  url?: string;
  imageUrl?: string;
  origem: "ONESIGNAL" | "API";
  lido: boolean;
}

export const NotificationsScreen = ({ navigation }: any) => {
  const [notificacoes, setNotificacoes] = useState<UnifiedNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [notificacoesLidas, setNotificacoesLidas] = useState<string[]>([]);

  const getLidasFromStorage = async (): Promise<string[]> => {
    try {
      const saved = await AsyncStorage.getItem("notificacoesLidas");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const marcarComoLida = async (notificacao: UnifiedNotification) => {
    const {id, origem} = notificacao;

    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? {...n, lido: true} : n))
    );

    if (origem === "ONESIGNAL") {
      const lidas = await getLidasFromStorage();
      if (!lidas.includes(id)) {
        const novasLidas = [...lidas, id];
        await AsyncStorage.setItem("notificacoesLidas", JSON.stringify(novasLidas));
        setNotificacoesLidas(novasLidas);
      }
    } else if (origem === "API") {
      try {
        await marcarNotificacaoComoLida(Number(id));
      } catch (error) {
        console.error("Erro ao marcar notificação da API como lida:", error);
      }
    }
  };

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const lidas = await getLidasFromStorage();
        setNotificacoesLidas(lidas);

        const [oneSignalData, apiData] = await Promise.all([
          getOneSignalNotifications(),
          getNotificacoes(),
        ]);

        const oneSignalParsed: UnifiedNotification[] = oneSignalData.map(
          (n: OneSignalNotification, index: number) => ({
            id: n.id ? String(n.id) : `onesignal-${index}`,
            title: n.title,
            body: n.body,
            date:
              typeof n.date === "string"
                ? Date.parse(n.date)
                : Number(n.date) * 1000,
            url: n.url,
            imageUrl: n.imageUrl ?? undefined,
            origem: "ONESIGNAL",
            lido: lidas.includes(String(n.id)),
          })
        );

        const apiParsed: UnifiedNotification[] = apiData.map(
          (n: any, index: number) => {
            const idApi = String(n.id_mensagem ?? n.idmensagem ?? `api-${index}`);
            return {
              id: idApi,
              title: n.titulo || "Notificação",
              body: n.corpo || "",
              date: new Date(n.data_cad.replace(" ", "T")).getTime(),
              url: n.url || undefined,
              imageUrl: null,
              origem: "API",
              lido: Boolean(n.lido),
            };
          }
        );

        const merged = [...oneSignalParsed, ...apiParsed].sort(
          (a, b) => b.date - a.date
        );

        setNotificacoes(merged);
      } catch (error) {
        console.error("Erro ao carregar notificações", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificacoes();
  }, []);

  const openUrl = (url?: string) => {
    if (!url) return;
    Linking.openURL(url).catch(() => {
      alert("Não foi possível abrir o link.");
    });
  };

  const renderItem = ({item}: {item: UnifiedNotification}) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => {
        if (!item.lido) marcarComoLida(item);
        if (item.url) navigation.navigate("WebView", {url: item.url});
      }}
    >
      
      <View style={styles.notificationRow}>
        {!item.lido ? (
          <BellDot size={20} color={colors.yellow} style={styles.bellIcon} />
        ) : (
          <Bell size={20} color={colors.yellow} style={styles.bellIcon} />
        )}
        <Text style={styles.notificationTitle}>{item.title}</Text>
      </View>

      <Text style={styles.notificationBody}>{item.body}</Text>

      {item.url ? (
        <TouchableOpacity onPress={() => openUrl(item.url)}>
          <Text style={styles.notificationLink}>{item.url}</Text>
        </TouchableOpacity>
      ) : null}

      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.notificationImage}
          resizeMode="cover"
        />
      ) : null}

      <Text style={styles.notificationDate}>
        {new Date(item.date).toLocaleString("pt-BR")}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Notificações</Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : notificacoes.length === 0 ? (
          <Text>Nenhuma notificação encontrada.</Text>
        ) : (
          <FlatList
            data={notificacoes}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}
      </View>

      <BottomNavigator
        currentScreen="Notifications"
        onNavigate={(screen) => navigation.navigate(screen)}
      />
    </View>
  );
};