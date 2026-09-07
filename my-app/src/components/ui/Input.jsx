import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Input = forwardRef(function Input({ className, type = 'text', ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'h-11 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-100 placeholder:text-slate-500 shadow-inner outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15',
        className,
      )}
      {...props}
    />
  )
})