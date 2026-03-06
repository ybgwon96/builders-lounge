export function LogoIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="7" fill="#C4713B" />
      <rect x="6" y="6" width="9" height="9" rx="1.5" fill="rgba(255,255,255,0.18)" />
      <rect x="17" y="6" width="9" height="9" rx="1.5" fill="rgba(255,255,255,0.18)" />
      <rect x="6" y="17" width="9" height="9" rx="1.5" fill="rgba(255,255,255,0.18)" />
      <rect x="17" y="17" width="9" height="9" rx="1.5" fill="white" />
    </svg>
  );
}
