import React from "react";

interface LoadingProps {
  color?: string;
  size?: number;
}

export const Loading: React.FC<LoadingProps> = ({ color = "#1976d2", size = 88 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="25 25 50 50"
        style={{ animation: "rotate 2s linear infinite" }}
      >
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="5"
          style={{
            animation: "dash 1.5s ease-in-out infinite",
            strokeDasharray: "31.4159 31.4159",
            strokeDashoffset: "0",
          }}
        />
      </svg>
      <style>{`
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes dash {
          0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 100, 200; stroke-dashoffset: -15; }
          100% { stroke-dasharray: 100, 200; stroke-dashoffset: -124; }
        }
      `}</style>
    </div>
  );
};

export default Loading;
