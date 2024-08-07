import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { signupEvent, leaveEvent } from './api/eventData';
import { getCurrentUid } from '../utils/context/authContext';

function EventCard({
  id,
  description,
  date,
  time,
  organizer,
  onUpdate,
  joined,
}) {
  const datetime = new Date(`${date}T${time}`);

  const handleJoin = () => {
    const uid = getCurrentUid();
    signupEvent(id, uid).then(() => {
      onUpdate();
    });
  };

  const handleLeave = () => {
    const uid = getCurrentUid();
    leaveEvent(id, uid).then(() => {
      onUpdate();
    });
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Description: {description}</Card.Title>
        <Card.Text>Date and Time: {datetime.toString()}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Organizer: {organizer}</Card.Footer>
      <Link href={`/events/edit/${id}`} passHref>
        <Button>Edit Events</Button>
      </Link>
      <Link href={`/events/${id}`} passHref>
        <Button>View Event</Button>
      </Link>
      {joined ? (
        <Button onClick={handleLeave}>Leave Event</Button>
      ) : (
        <Button onClick={handleJoin}>Join Event</Button>
      )}
    </Card>
  );
}

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  joined: PropTypes.bool.isRequired,
};

export default EventCard;
