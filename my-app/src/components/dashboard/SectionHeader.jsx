import { Badge } from '../ui/Badge'

export function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <Badge variant="outline" className="w-fit">
            {eyebrow}
          </Badge>
        ) : null}
        <div>
          <h2 className="text-xl font-semibold text-slate-50 lg:text-2xl">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{description}</p>
        </div>
      </div>
      {action}
    </div>
  )
}