import { cn } from '../../utils/cn'

const badgeVariants = {
  default: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200',
  secondary: 'border-white/10 bg-white/5 text-slate-200',
  critical: 'border-rose-400/20 bg-rose-400/10 text-rose-200',
  warning: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
  success: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
  outline: 'border-white/15 bg-transparent text-slate-200',
}

export function Badge({ className, variant = 'default', children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em]',
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}