import { SmartphoneIcon, ArrowUpRightIcon } from 'lucide-react';
import { PLAY_BADGE_IMAGE, PLAY_STORE_URL } from '../lib/app';
import { cx } from '../utils/format';

type Props = { tone?: 'dark' | 'light'; className?: string };

/**
 * Download button for the Android app.
 * - App not published yet (PLAY_STORE_URL empty): a "Coming soon" pill.
 * - Published: Google's official badge if PLAY_BADGE_IMAGE is set, otherwise a text button.
 * Google's logo is never redrawn here, because Google requires its official artwork.
 */
export function AppDownloadButton({ tone = 'dark', className }: Props) {
  if (PLAY_STORE_URL && PLAY_BADGE_IMAGE) {
    return (
      <a href={PLAY_STORE_URL} className={cx('focus-ring inline-block rounded-lg transition-transform hover:-translate-y-0.5', className)}>
        <img src={PLAY_BADGE_IMAGE} alt="Get it on Google Play" className="h-12 w-auto" />
      </a>
    );
  }

  const dark = tone === 'dark';
  const shell = cx(
    'inline-flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-5',
    dark ? 'bg-ink-900 text-white' : 'bg-white text-brand-900',
    className
  );
  const chip = cx(
    'grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white',
    PLAY_STORE_URL ? 'bg-brand-600' : 'bg-gradient-to-br from-ember-400 to-ember-600'
  );
  const content = (
    <>
      <span className={chip}>
        <SmartphoneIcon width={20} height={20} aria-hidden="true" />
      </span>
      <span className="text-left leading-tight">
        <span className={cx('block text-[11px] font-medium', dark ? 'text-white/70' : 'text-brand-900/70')}>
          {PLAY_STORE_URL ? 'Android app' : 'Namastays for Android'}
        </span>
        <span className="block text-[15px] font-bold">{PLAY_STORE_URL ? 'Get it on Google Play' : 'Coming soon'}</span>
      </span>
      {PLAY_STORE_URL && <ArrowUpRightIcon width={16} height={16} className="opacity-70" aria-hidden="true" />}
    </>
  );

  return PLAY_STORE_URL ? (
    <a href={PLAY_STORE_URL} className={cx(shell, 'focus-ring transition-transform hover:-translate-y-0.5')}>
      {content}
    </a>
  ) : (
    <span className={cx(shell, 'cursor-default')} role="note" aria-label="Namastays for Android is coming soon">
      {content}
    </span>
  );
}
