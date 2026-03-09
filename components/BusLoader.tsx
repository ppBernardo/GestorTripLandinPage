'use client'

export default function BusLoader() {
  return (
    <div className="bus-loader">
      <div className="bus-wrapper">
        <div className="bus-body-loader">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 200 95"
            className="w-[140px] h-auto"
          >
            {/* Corpo do ônibus - retângulo longo verde */}
            <rect
              x="5"
              y="5"
              width="190"
              height="65"
              rx="6"
              stroke="#334155"
              strokeWidth="2"
              fill="#22c55e"
            />
            {/* Faixa inferior escura */}
            <rect
              x="5"
              y="58"
              width="190"
              height="12"
              rx="2"
              stroke="#334155"
              strokeWidth="2"
              fill="#16a34a"
            />
            {/* Janelas */}
            <rect x="25" y="15" width="22" height="18" rx="2" fill="#7dd3fc" stroke="#334155" strokeWidth="1" />
            <rect x="55" y="15" width="22" height="18" rx="2" fill="#7dd3fc" stroke="#334155" strokeWidth="1" />
            <rect x="85" y="15" width="22" height="18" rx="2" fill="#7dd3fc" stroke="#334155" strokeWidth="1" />
            <rect x="115" y="15" width="22" height="18" rx="2" fill="#7dd3fc" stroke="#334155" strokeWidth="1" />
            <rect x="145" y="15" width="22" height="18" rx="2" fill="#7dd3fc" stroke="#334155" strokeWidth="1" />
            {/* Porta */}
            <rect x="170" y="20" width="15" height="38" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            {/* Faróis */}
            <rect x="190" y="28" width="5" height="6" rx="1" fill="#fef08a" stroke="#334155" strokeWidth="1" />
            <rect x="190" y="38" width="5" height="6" rx="1" fill="#fef08a" stroke="#334155" strokeWidth="1" />
            {/* Parabrisa frontal */}
            <path d="M5 25 L5 50 L20 48 L20 27 Z" fill="#7dd3fc" stroke="#334155" strokeWidth="1" />
          </svg>
        </div>
        <div className="bus-tires-loader">
          <svg viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="13.5" stroke="#334155" strokeWidth="3" fill="#334155" />
            <circle cx="15" cy="15" r="7" fill="#64748b" />
          </svg>
          <svg viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="13.5" stroke="#334155" strokeWidth="3" fill="#334155" />
            <circle cx="15" cy="15" r="7" fill="#64748b" />
          </svg>
        </div>
        <div className="bus-road-loader" />
      </div>
    </div>
  )
}
