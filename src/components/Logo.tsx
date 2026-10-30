import Link from 'next/link';
import { cx } from '../utils/format';

type LogoProps = {
  /** Use the white version on dark backgrounds. */
  onDark?: boolean;
  className?: string;
};

// public/logo.svg and public/logo-white.svg share the same proportions (3687 x 674).
const RATIO = 3687 / 674;

export function Logo({ onDark = false, className }: LogoProps) {
  const height = 30;
  return (
    <Link
      href="/"
      className={cx('focus-ring inline-flex items-center rounded-lg', className)}
      aria-label="Namastays home">
      <img
        src={onDark ? '/logo-white.svg' : '/logo.svg'}
        alt=""
        width={Math.round(height * RATIO)}
        height={height}
        className="h-[26px] w-auto sm:h-[30px]" />
    </Link>
  );
}
