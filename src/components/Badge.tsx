import React from 'react';
import { cx } from '../utils/format';

type BadgeProps = {
  children: React.ReactNode;
  tone?: 'forest' | 'ember' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
};

const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
  forest: 'bg-forest-50 text-forest-800 border-forest-100',
  ember: 'bg-ember-50 text-ember-800 border-ember-100',
  neutral: 'bg-ink-50 text-ink-700 border-ink-100',
  outline: 'bg-white/90 text-ink-800 border-ink-200 backdrop-blur'
};

export function Badge({ children, tone = 'neutral', size = 'sm', icon, className }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm',
        tones[tone],
        className
      )}>
      
      {icon}
      {children}
    </span>);

}