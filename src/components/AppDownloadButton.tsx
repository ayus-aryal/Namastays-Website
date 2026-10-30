import { PLAY_STORE_URL } from '../lib/app';
import { cx } from '../utils/format';

const playPath =
  'M4 3.3v17.4c0 .5.5.8.9.6l9.3-5.4-3-3L4 3.3Zm12 6.2-2.3 2.3 2.3 2.3 3.4-2c.5-.3.5-1 0-1.3l-3.4-1.3ZM5.5 2.6l7.8 4.5 2.2-1.3-9-5.2c-.4-.2-1 0-1 .6v1.4Z';

type Props = { tone?: 'dark' | 'light'; className?: string };

/** Google Play badge. Shows "Coming soon" until PLAY_STORE_URL is set in lib/app.ts. */
export function AppDownloadButton({ tone = 'dark', className }: Props) {
  const classes = cx(
    'inline-flex items-center gap-2.5 rounded-2xl px-4 py-2.5',
    tone === 'dark' ? 'bg-ink-900 text-white' : 'bg-white text-forest-900',
    className
  );
  const content = (
    <>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d={playPath} />
      </svg>
      <span className="text-left text-[11px] leading-tight">
        {PLAY_STORE_URL ? 'Get it on' : 'Coming soon on'}
        <span className="block text-[14px] font-bold">Google Play</span>
      </span>
    </>
  );

  if (PLAY_STORE_URL) {
    return (
      <a href={PLAY_STORE_URL} className={cx(classes, 'focus-ring transition-opacity hover:opacity-90')}>
        {content}
      </a>
    );
  }
  return (
    <span className={cx(classes, 'cursor-default opacity-90')} aria-label="Namastays for Android is coming soon on Google Play">
      {content}
    </span>
  );
}
