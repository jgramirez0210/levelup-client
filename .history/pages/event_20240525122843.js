import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { getEvents } from '../utils/data/eventData'; // replace this with your actual function for fetching events

function EventPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard
            game={event.game}
            description={event.description}
            date={event.date}
            time={event.time}
            organizer={event.organizer}
          />
        </section>
      ))}
    </article>
  );
}

export default EventPage;
