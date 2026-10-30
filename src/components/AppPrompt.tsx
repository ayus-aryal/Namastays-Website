import { SmartphoneIcon } from 'lucide-react';
import { AppDownloadButton } from './AppDownloadButton';
import { cx } from '../utils/format';

type Props = { title: string; body: string; className?: string };

/** The "do this in the app" box used wherever the site hands off to the Namastays app. */
export function AppPrompt({ title, body, className }: Props) {
  return (
    <aside className={cx('rounded-2xl border border-brand-100 bg-brand-50 p-5', className)}>
      <p className="flex items-center gap-2 text-sm font-bold text-brand-900">
        <SmartphoneIcon width={16} height={16} aria-hidden="true" />
        {title}
      </p>
      <p className="mt-2 text-[14px] leading-relaxed text-brand-900/80">{body}</p>
      <AppDownloadButton className="mt-4" />
    </aside>
  );
}
