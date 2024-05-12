import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Import your Axios instance
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('/events');
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="eventDate"
        endAccessor="eventDate"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Dashboard;
