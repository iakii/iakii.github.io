import { useEffect } from 'react';

/**
 * import React, { useRef } from 'react';
import { usePageVisibility } from './usePageVisibility';

function VideoPlayer() {
  const videoRef = useRef(null);

  usePageVisibility(
    () => videoRef.current?.play(),
    () => videoRef.current?.pause()
  );

  return <video ref={videoRef} src="your-video.mp4" controls />;
}

export default VideoPlayer;

 * usePageVisibility
 * @param {Function} onVisible - 页面可见时执行的函数
 * @param {Function} onHidden - 页面隐藏时执行的函数
 */
export function usePageVisibility(onVisible, onHidden) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        onHidden?.();
      } else {
        onVisible?.();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onVisible, onHidden]);
}
