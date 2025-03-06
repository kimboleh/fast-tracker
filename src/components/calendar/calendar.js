import React, { useState, useEffect } from 'react';
import './calendar.scss';
import arrow from '../fast-icons/arrow.svg';

import dairy from '../fast-icons/dairy.svg';
import fish from '../fast-icons/fish.svg';
import alcohol from '../fast-icons/alcohol.svg';
import oil from '../fast-icons/oil.svg';
import circle from '../fast-icons/circle.svg';
import today from '../fast-icons/today-icon.svg';

const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [events, setEvents] = useState([]); // Store API data

    const currentMonth = month;

    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    useEffect(() => {
        fetchData();
    }, [month, year]); // Fetch new data when month or year changes

    const fetchData = async () => {
        try {
            const response = await fetch(`https://orthocal.info/api/gregorian/${year}/${month + 1}`);
            const data = await response.json();
            setEvents(data); // Store the API response
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const setDateToCurrent = () => {
        const today = new Date();
        const monthAlreadyCurrent = (month === today.getMonth());

        setDate(today);
        setMonth(today.getMonth());
        setYear(today.getFullYear());
        if (!monthAlreadyCurrent) {
            setEvents([]);
        }
    }

    const generateDayDiv = (dateNumber, extraClass = "", eventData) => {
        return (
            <div className={`calendar-day ${extraClass}`}>
                <span className="date-number">{dateNumber}</span>
                <div class="fasting-icons">{eventData ? 
                    getFastingIcons(eventData.fast_level, eventData.fast_exception)
                : ""}
                </div>
            </div>
        );
    };

    const getFastingIcons = (fastLevel, fastException) => {
        let icons = [];

        if (fastLevel !== 0) {
            switch (fastException) {
              case 0:
              case 10:
              case 9:
              case 8: // 8 is "Strict Fast (Wine & Oil), 9 is "Strict Fast", 10 is "No overrides"
                icons = [circle].map((src, index) => (
                    <img key={index} src={src} className="icon" title="strict fast" alt="strict fast" />
                ));
                break;
              case 7: // Cheesefare
                icons = icons.push(<img key="dairy" src={dairy} className="icon" title="dairy, fish, oil, and wine allowed" alt="dairy" />);
                break;
              case 5: // Wine allowed
                icons = [alcohol].map((src, index) => (
                    <img key={index} src={src} className="icon" title="only wine allowed" alt="wine allowed" />
                ));
                break;
              case 4:
              case 2: // Fish, oil, & wine allowed
                icons = [fish].map((src, index) => (
                    <img key={index} src={src} className="icon" title="fish, oil, and wine allowed" alt="fish day" />
                ));
                break;
              case 3:
              case 1: // Wine & oil allowed
                icons = [alcohol, oil].map((src, index) => (
                    <img key={index} src={src} className="icon" title="wine & oil allowed" alt="wine and oil allowed" />
                ));
                break;
              default:
                break;
            }
        }

        return icons;
    }

    const renderCalendar = () => {
        const firstDayIndex = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const lastDayPrevMonth = new Date(year, month, 0).getDate();
        const lastDayIndex = new Date(year, month, lastDay).getDay();

        let days = [];

        // Previous month's tailing days
        for (let i = firstDayIndex; i > 0; i--) {
            days.push(generateDayDiv(lastDayPrevMonth - i + 1, "inactive", null));
        }

        // Current month’s days
        for (let i = 1; i <= lastDay; i++) {
            let isToday = i === date.getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear() ? "active" : "";

            const eventData = events[i - 1] || null; // Match API data to the correct day
            days.push(generateDayDiv(i, isToday, eventData));
        }

        // Next month’s leading days
        for (let i = lastDayIndex; i < 6; i++) {
            days.push(generateDayDiv(i - lastDayIndex + 1, "inactive", null));
        }

        return days;
    };

    return (
        <div id="cal-page" className='main-content'>
            <div id='text-body' className='light'>
                <div className="calendar-container">
                    <header className="calendar-header">
                        <div id="next-previous-buttons" className="calendar-navigation">
                            <button
                                id="calendar-prev"
                                className="material-symbols-rounded"
                                onClick={() => {
                                    if (month === 0) {
                                        setMonth(11);  // Wrap around to December
                                        setYear(year - 1);  // Go back one year
                                    } else {
                                        setMonth(month - 1);
                                    }
                                }}>
                                <img src={arrow} id="previous-arrow" alt="previous month" />
                            </button>
                            <div id="calendar-current-data">
                                <p className="calendar-current-date">{months[month]} {year}</p>
                                <button onClick={setDateToCurrent} title="Current Month">
                                    <img src={today} id="current-month" alt="current month"></img>
                                </button>
                            </div>
                            <button
                                id="calendar-next"
                                className="material-symbols-rounded"
                                onClick={() => {
                                    if (month === 11) {
                                        setMonth(0);  // Wrap around to January
                                        setYear(year + 1);  // Go forward one year
                                    } else {
                                        setMonth(month + 1);
                                    }
                                }}>
                                <img src={arrow} id="next-arrow" alt="next month" />
                            </button>
                        </div>
                    </header>

                    <div className="calendar-body">
                        <div className="calendar-weekdays">
                            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
                            <div>Thu</div><div>Fri</div><div>Sat</div>
                        </div>
                        <div className="calendar-dates">{renderCalendar()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Calendar };
