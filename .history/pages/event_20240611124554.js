import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import EventCard from '../components/EventCard';
import { getEvents } from '../components/api/eventData';
import { useAuth } from '../utils/context/AuthContext';

function EventPage() {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  if (user) {
    console.warn('UID', user.uid);
  }

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      <Link href="/events/new" passHref>
        <button type="button">Register New Event</button>
      </Link>
      {Array.isArray(events) && events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard
            id={event.id}
            game={event.game}
            description={event.description}
            date={event.date}
            time={event.time}
            organizer={event.organizer}
            onUpdate={() => window.location.reload()}
          />
        </section>
      ))}
    </article>
  );
}
export default EventPage;
