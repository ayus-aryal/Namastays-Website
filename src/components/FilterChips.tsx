import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cx } from '../utils/format';

export type FilterGroup = {
  id: string;
  label: string;
  options: string[];
};

type FilterChipsProps = {
  groups: FilterGroup[];
  active: Record<string, string | null>;
  onChange: (groupId: string, value: string | null) => void;
};

export function FilterChips({ groups, active, onChange }: FilterChipsProps) {
  const activeCount = Object.values(active).filter(Boolean).length;

  return (
    <div className="space-y-3">
      {groups.map((group) =>
      <div key={group.id} className="flex flex-wrap items-center gap-2">
          <span className="mr-1 w-[92px] shrink-0 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
            {group.label}
          </span>
          {group.options.map((option) => {
          const isActive = active[group.id] === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(group.id, isActive ? null : option)}
              className={cx(
                'focus-ring inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors',
                isActive ?
                'border-forest-700 bg-forest-700 text-white' :
                'border-ink-200 bg-white text-ink-700 hover:border-ink-400'
              )}>
              
                {isActive && <CheckIcon width={13} height={13} aria-hidden="true" />}
                {option}
              </button>);

        })}
        </div>
      )}

      {activeCount > 0 &&
      <button
        type="button"
        onClick={() => groups.forEach((g) => onChange(g.id, null))}
        className="focus-ring rounded-full text-[13px] font-semibold text-ember-600 underline-offset-2 hover:underline">
        
          Clear {activeCount} filter{activeCount > 1 ? 's' : ''}
        </button>
      }
    </div>);

}