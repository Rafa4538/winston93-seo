import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    amoSocialButton?: ((...args: any[]) => void) & { q?: any[] };
    amo_social_button?: {
      id: string;
      hash: string;
      locale?: string;
      inline?: boolean;
      setMeta?: (params: any) => void;
      params?: any[];
    };
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

type Props = {
  id?: string;
  hash?: string;
  locale?: string;
  trackEvents?: boolean;
  load?: boolean; // permite controlar la carga (útil para consentimiento)
};

export default function AmoCRMWithAnalytics({
  id = '238716',
  hash = '29c870677258fc88d0be09ef388efbacb487dc265acc4ee2e4bb24478ce29784',
  locale = 'es',
  trackEvents = true,
  load = true,
}: Props) {
  const loadedRef = useRef(false);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !load) return;

    // Evitar doble init
    if (loadedRef.current) return;
    loadedRef.current = true;

    // Config del widget (debe ir ANTES del script)
    window.amo_social_button = {
      id,
      hash,
      locale,
      inline: false,
      setMeta(p: any) {
        this.params = (this.params || []).concat([p]);
      },
    };

    // Cola de comandos (si en el futuro quieres window.amoSocialButton('open'))
    window.amoSocialButton =
      window.amoSocialButton ||
      function (...args: any[]) {
        (window.amoSocialButton!.q = window.amoSocialButton!.q || []).push(args);
      };

    // Inyectar script solo si no existe
    const EXISTING_ID = 'amo_social_button_script';
    if (!document.getElementById(EXISTING_ID)) {
      const s = document.createElement('script');
      s.async = true;
      s.id = EXISTING_ID;
      // Usa exactamente la URL que tengas en tu snippet de Kommo
      s.src = 'https://gso.amocrm.com/js/button.js?1658160430';

      s.onload = () => {
        if (trackEvents && typeof window.gtag === 'function') {
          window.gtag('event', 'widget_loaded', {
            event_category: 'CRM',
            event_label: 'AmoCRM Widget',
            value: 1,
          });
        }
        if (trackEvents && window.dataLayer) {
          window.dataLayer.push({ event: 'amocrm_loaded', crm_widget: 'AmoCRM', crm_id: id });
        }
      };

      s.onerror = () => {
        if (trackEvents && typeof window.gtag === 'function') {
          window.gtag('event', 'widget_error', {
            event_category: 'CRM',
            event_label: 'AmoCRM Load Error',
            value: 0,
          });
        }
      };

      document.head.appendChild(s);
    }

    // ---- Tracking de interacciones (más preciso) ----
    const track = (action: string) => {
      if (!trackEvents) return;
      if (typeof window.gtag === 'function') {
        window.gtag('event', action, {
          event_category: 'CRM_Interaction',
          event_label: 'AmoCRM Widget',
        });
      }
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'amocrm_interaction', interaction_type: action });
      }
    };

    // Observa aparición del contenedor del widget y engancha listeners
    const onMutations = (mutations: MutationRecord[]) => {
      for (const m of mutations) {
        if (m.type !== 'childList') continue;

        // Ajusta este selector al contenedor real que cree el script en tu DOM
        const widgetRoot =
          document.querySelector('[class*="amo-social"]') ||
          document.querySelector('[id*="amo"]');

        if (widgetRoot && !(widgetRoot as HTMLElement).dataset.tracked) {
          (widgetRoot as HTMLElement).dataset.tracked = 'true';
          widgetRoot.addEventListener('click', () => track('widget_clicked'), { passive: true });
        }
      }
    };

    const obs = new MutationObserver(onMutations);
    observerRef.current = obs;
    obs.observe(document.body, { childList: true, subtree: true });

    // Limpieza: solo desconecta el observer (no elimines el script)
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [id, hash, locale, trackEvents, load]);

  return null;
}

/* Helpers opcionales para usar en otras partes de la app */
export const trackChatOpen = () =>
  typeof window !== 'undefined' &&
  typeof window.gtag === 'function' &&
  window.gtag('event', 'chat_opened', {
    event_category: 'CRM_Interaction',
    event_label: 'User opened chat',
  });

export const trackMessageSent = () =>
  typeof window !== 'undefined' &&
  typeof window.gtag === 'function' &&
  window.gtag('event', 'message_sent', {
    event_category: 'CRM_Interaction',
    event_label: 'User sent message',
  });

export const trackChatClose = () =>
  typeof window !== 'undefined' &&
  typeof window.gtag === 'function' &&
  window.gtag('event', 'chat_closed', {
    event_category: 'CRM_Interaction',
    event_label: 'User closed chat',
  });

export const trackCustomCRMEvent = (eventName: string, eventData?: Record<string, any>) =>
  typeof window !== 'undefined' &&
  typeof window.gtag === 'function' &&
  window.gtag('event', eventName, { event_category: 'CRM_Interaction', ...eventData });
