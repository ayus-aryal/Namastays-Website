import Link from 'next/link';

type Props = { title: string; body: string; href?: string; linkLabel?: string };

export function EmptyState({ title, body, href, linkLabel }: Props) {
  return (
    <div className="rounded-3xl border border-dashed border-ink-200 bg-ink-50/60 px-6 py-12 text-center">
      <h2 className="text-lg font-bold text-ink-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-ink-600">{body}</p>
      {href && linkLabel && (
        <Link href={href} className="focus-ring mt-5 inline-block rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
