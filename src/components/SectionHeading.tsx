import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  linkLabel?: string;
  linkHref?: string;
  as?: 'h2' | 'h3';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  linkLabel,
  linkHref,
  as = 'h2'
}: SectionHeadingProps) {
  const Tag = as;

  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow &&
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            {eyebrow}
          </p>
        }
        <Tag className={as === 'h2' ? 'text-2xl font-bold sm:text-3xl' : 'text-xl font-bold sm:text-2xl'}>
          {title}
        </Tag>
        {description && <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{description}</p>}
      </div>
      {linkLabel && linkHref &&
      <Link
        href={linkHref}
        className="focus-ring group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-800 transition-colors hover:border-brand-600 hover:text-brand-700">
        
          {linkLabel}
          <ArrowRightIcon
          width={15}
          height={15}
          className="transition-transform group-hover:translate-x-0.5" />
        
        </Link>
      }
    </div>);

}