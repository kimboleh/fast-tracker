import { SegmentedToggle } from '../segmented-toggle/segmented-toggle.js';
import './settings-panel.scss';

export function SettingsPanel({ isOpen, isGregorian, isSlavic, onCalendarToggle, onTraditionToggle }) {
  return (
    <div id="settings-panel" className={isOpen ? 'open' : ''}>
        <h2>Site Settings</h2>
        <section className="settings-section">
            <h3>Fasting Calendar</h3>
            <SegmentedToggle
            groupLabel="Fasting Calendar"
            leftLabel="Gregorian"
            rightLabel="Julian"
            isLeftSelected={isGregorian}
            onChange={onCalendarToggle}
            />
        </section>
        <section className="settings-section">
            <h3>Fast Tradition</h3>
            <SegmentedToggle
            groupLabel="Fast Tradition"
            leftLabel="Slavic"
            rightLabel="Greek"
            isLeftSelected={isSlavic}
            onChange={onTraditionToggle}
            />
        </section>
    </div>
  );
}