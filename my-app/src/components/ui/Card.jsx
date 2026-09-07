import { cn } from '../../utils/cn'

export function Card({ className, ...props }) {
  return (
    <section
      className={cn(
        'rounded-[28px] border border-white/10 bg-slate-950/75 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('border-b border-white/10 px-6 py-5', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-lg font-semibold text-slate-50', className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('mt-1 text-sm text-slate-400', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('px-6 py-6', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={cn('border-t border-white/10 px-6 py-4', className)} {...props} />
}