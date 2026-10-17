import { SegmentedToggle } from '../segmented-toggle/segmented-toggle.js';
import moreInfo from "../fast-icons/more-info-icon.svg";

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
            <div className="title-with-info">
              <h3>Fast Tradition</h3>
              <div className="info-trigger" tabIndex={0} aria-describedby="tradition-tooltip">
                <img src={moreInfo} className="more-info" alt="more information" />
                <div className="tooltip" id="tradition-tooltip" role="tooltip">
                  <p>"Slavic" includes the OCA and ROCOR traditions. "Greek" includes the Antiochian and GOARCH traditions.</p>
                </div>
              </div>
            </div>
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