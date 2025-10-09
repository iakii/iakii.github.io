import { FlagTwoTone } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

export const Route = createFileRoute('/flag')({
  component: RouteComponent,
//     staticData: {
//     icon: <FlagTwoTone />,
//     name: "国旗",
//     index: 3,
//   },
})

// ★
function RouteComponent() {
  // 通过 CSS 动画实现旗面随风飘扬
  const flagRef = useRef();
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes flag-wave {
        0% { transform: perspective(600px) rotateY(0deg) skewY(0deg) scaleY(1); }
        10% { transform: perspective(600px) rotateY(-2deg) skewY(-1deg) scaleY(1.01); }
        20% { transform: perspective(600px) rotateY(2deg) skewY(1deg) scaleY(0.99); }
        30% { transform: perspective(600px) rotateY(-3deg) skewY(-2deg) scaleY(1.01); }
        40% { transform: perspective(600px) rotateY(2deg) skewY(1deg) scaleY(0.98); }
        50% { transform: perspective(600px) rotateY(-2deg) skewY(-1deg) scaleY(1.01); }
        60% { transform: perspective(600px) rotateY(2deg) skewY(1deg) scaleY(0.99); }
        70% { transform: perspective(600px) rotateY(-1deg) skewY(-1deg) scaleY(1.01); }
        80% { transform: perspective(600px) rotateY(1deg) skewY(1deg) scaleY(0.99); }
        90% { transform: perspective(600px) rotateY(-2deg) skewY(-1deg) scaleY(1.01); }
        100% { transform: perspective(600px) rotateY(0deg) skewY(0deg) scaleY(1); }
      }
      .flag-animate {
        animation: flag-wave 2.5s infinite linear;
        transform-origin: left center;
        will-change: transform;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', background: '#eee' }}>
      <svg ref={flagRef} className="flag-animate" width="480" height="320" viewBox="0 0 48 32" style={{ boxShadow: '0 2px 8px #888', border: '1px solid #ccc', background: 'none' }}>
        <rect width="48" height="32" fill="#DE2910" />
        {/* 大星 */}
        <polygon points="7.5,5.5 8.4,8.1 11.2,8.1 8.9,9.7 9.8,12.3 7.5,10.7 5.2,12.3 6.1,9.7 3.8,8.1 6.6,8.1" fill="#FFDE00" />
        {/* 四颗小星 */}
        <g transform="rotate(23.2 14.5 3.5)">
          <polygon points="14.5,3.5 14.8,4.3 15.6,4.3 15,4.8 15.3,5.6 14.5,5.1 13.7,5.6 14,4.8 13.4,4.3 14.2,4.3" fill="#FFDE00" />
        </g>
        <g transform="rotate(8 16.5 5.5)">
          <polygon points="16.5,5.5 16.8,6.3 17.6,6.3 17,6.8 17.3,7.6 16.5,7.1 15.7,7.6 16,6.8 15.4,6.3 16.2,6.3" fill="#FFDE00" />
        </g>
        <g transform="rotate(-8 16.5 8.5)">
          <polygon points="16.5,8.5 16.8,9.3 17.6,9.3 17,9.8 17.3,10.6 16.5,10.1 15.7,10.6 16,9.8 15.4,9.3 16.2,9.3" fill="#FFDE00" />
        </g>
        <g transform="rotate(-23 14.5 10.5)">
          <polygon points="14.5,10.5 14.8,11.3 15.6,11.3 15,11.8 15.3,12.6 14.5,12.1 13.7,12.6 14,11.8 13.4,11.3 14.2,11.3" fill="#FFDE00" />
        </g>
      </svg>
    </div>
  );
}
