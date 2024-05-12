import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment-timezone';
import useAxios from '../../../hooks/axios';

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const axiosInstance = useAxios();

  const transformEventData = (eventsData) => {
    return eventsData.map((event) => {
      const { eventName, eventDate, eventTime, venue, status } = event;
      const startTime = moment
        .tz(`${eventDate} ${eventTime}`, 'YYYY-MM-DD HH:mm', 'UTC')
        .toDate();
      const endTime = moment(startTime).add(1, 'hour').toDate();

      return {
        title: eventName,
        start: startTime,
        end: endTime,
        venue: venue,
        status: status, // Include the status in the transformed event object
      };
    });
  };

  const eventPropGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: 'lightgray',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };

    switch (event.status) {
      case 'approved':
        style.backgroundColor = 'green';
        style.color = 'white';
        break;
      case 'rejected':
        style.backgroundColor = 'red';
        style.color = 'white';
        break;
      case 'pending':
        style.backgroundColor = 'yellow';
        style.color = 'black';
        break;
      default:
        break;
    }

    const startTimeString = moment(start).format('h:mm A');
    const endTimeString = moment(end).format('h:mm A');
    const title = `${event.title} (${startTimeString} - ${endTimeString})`;

    return {
      style: style,
      title: title,
    };
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('/events');
        console.log(response.data.events); // Log the API response

        const transformedEvents = transformEventData(response.data.events);
        console.log(transformedEvents); // Log the transformed events

        setEvents(transformedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1 className="my-5 text-2xl font-semibold">Dashboard</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '75vh' }}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};

export default Dashboard;