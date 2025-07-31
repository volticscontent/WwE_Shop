// Global type declarations
declare global {
  interface Window {
    pixelId?: string;
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
      load: (pixelId: string) => void;
      identify: (params?: Record<string, unknown>) => void;
      instances: Record<string, unknown>;
      debug: (enabled?: boolean) => void;
    };
    TiktokAnalyticsObject?: string;
  }
}

export {};