import { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"

const mLocalizer = momentLocalizer(moment)

function CalendarPage() {
    const [calendarEvents, setCalendarEvents] = useState([]);

    const mapTrainingsToCalendarEvents = (trainings) => {
        return trainings.map((training) => ({
            title: training.activity,
            start: new Date(training.date),
            end: moment(training.date)
                .add(training.duration, "minutes")
                .toDate(),
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings', { method: 'GET' });
                const data = await response.json();

                setCalendarEvents(mapTrainingsToCalendarEvents(data));
            } catch (error) {
                console.error("Error fetching trainings:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ height: 600, marginTop: 20 }}>
            <Calendar
                localizer={mLocalizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    );
}

export default CalendarPage;