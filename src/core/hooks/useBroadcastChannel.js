import { useEffect, useRef, useCallback } from 'react';

/**
 *
 * import React, { useState } from 'react';
import { useBroadcastChannel } from './useBroadcastChannel';

function LoginChannel() {
  const [token, setToken] = useState(null);

  const sendMessage = useBroadcastChannel('login', (data) => {
    console.log('收到消息:', data);
    setToken(data.token);
  });

  return (
    <div>
      <p>当前 token: {token}</p>
      <button onClick={() => sendMessage({ token: 'abc123' })}>
        发送登录消息
      </button>
    </div>
  );
}

export default LoginChannel;
 * useBroadcastChannel
 * @param {string} channelName - 通道名称
 * @param {Function} onMessage - 收到消息时的回调
 * @returns {Function} sendMessage - 发送消息的函数
 */
export function useBroadcastChannel(channelName, onMessage) {
  const channelRef = useRef(null);

  useEffect(() => {
    const bc = new BroadcastChannel(channelName);
    channelRef.current = bc;

    bc.onmessage = (event) => {
      onMessage?.(event.data);
    };

    return () => {
      bc.close();
    };
  }, [channelName, onMessage]);

  const sendMessage = useCallback((msg) => {
    channelRef.current?.postMessage(msg);
  }, []);

  return sendMessage;
}
