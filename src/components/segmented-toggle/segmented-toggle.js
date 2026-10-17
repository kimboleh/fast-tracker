import './segmented-toggle.scss';

export function SegmentedToggle({ leftLabel, rightLabel, isLeftSelected, onChange, groupLabel }) {
  return (
    <div className="segmented-toggle" role="group" aria-label={groupLabel}>
      <button
        type="button"
        className={isLeftSelected ? 'selected' : ''}
        aria-pressed={isLeftSelected}
        onClick={() => onChange(true)}>
        {leftLabel}
      </button>
      <button
        type="button"
        className={!isLeftSelected ? 'selected' : ''}
        aria-pressed={!isLeftSelected}
        onClick={() => onChange(false)}>
        {rightLabel}
      </button>
    </div>
  );
}