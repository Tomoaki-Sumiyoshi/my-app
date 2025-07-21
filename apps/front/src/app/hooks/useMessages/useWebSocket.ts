import { useRef, useState, useEffect, useCallback } from 'react';

type WebSocketOptions = {
  url: string;
  onMessage?: (data: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  protocols?: string | string[];
};

export const useWebSockt = (options: WebSocketOptions) => {
  const { url, onMessage, onOpen, onClose, protocols } = options;
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // 接続を開始
  useEffect(() => {
    const ws = new WebSocket(url, protocols);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      onOpen?.();
    };

    ws.onmessage = (event) => {
      try {
        onMessage?.(event.data);
      } catch (e) {
        console.warn('Failed to parse WebSocket message:', event.data);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      onClose?.();
    };

    return () => {
      ws.close();
    };
  }, [url, protocols]);

  return { isConnected };
};
