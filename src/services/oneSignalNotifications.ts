import axios from "axios";

const ONESIGNAL_APP_ID = "";
const ONESIGNAL_REST_API_KEY = "";

export interface OneSignalNotification {
  id: string;
  title: string;
  body: string;
  date: string;
  url?: string;
  imageUrl?: string | null;
}

export const getOneSignalNotifications = async (): Promise<OneSignalNotification[]> => {
  try {
    const response = await axios.get(
      `https://api.onesignal.com/notifications?app_id=${ONESIGNAL_APP_ID}&limit=20`,
      {
        headers: {
          "Authorization": `Basic ${ONESIGNAL_REST_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.notifications.map((n: any) => ({
      id: n.id,
      title: n.headings?.en || "Sem título",
      body: n.contents?.en || "",
      date: n.send_after,
      url: n.url,
      imageUrl: n.big_picture || n.chrome_big_picture || n.global_image || null,
    }));
  } catch (error) {
    console.error("Erro ao buscar notificações OneSignal", error);
    return [];
  }
};