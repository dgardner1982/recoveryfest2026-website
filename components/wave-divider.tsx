type WaveDividerProps = {
  color?: string
  flip?: boolean
  className?: string
}

/**
 * Signature festival-ribbon wave used to transition between sections.
 * Pass the CSS color of the *next* section via `color` (e.g. "var(--background)").
 */
export function WaveDivider({ color = 'var(--background)', flip = false, className = '' }: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 translate-y-1/2 md:h-14 ${
        flip ? 'rotate-180' : ''
      } ${className}`}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M0,30 C150,60 350,0 600,20 C850,40 1050,0 1200,25 L1200,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
