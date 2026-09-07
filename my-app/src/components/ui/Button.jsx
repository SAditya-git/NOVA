import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../utils/cn'

const buttonVariants = {
  default:
    'bg-cyan-400 text-slate-950 shadow-[0_12px_30px_rgba(34,211,238,0.18)] hover:bg-cyan-300',
  secondary: 'bg-white/5 text-slate-100 hover:bg-white/10 border border-white/10',
  ghost: 'bg-transparent text-slate-200 hover:bg-white/5',
  outline: 'border border-white/10 bg-transparent text-slate-100 hover:bg-white/5',
}

export function Button({ className, variant = 'default', asChild = false, ...props }) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/80 disabled:pointer-events-none disabled:opacity-50',
        buttonVariants[variant],
        className,
      )}
      {...props}
    />
  )
}