import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, getEvent } from '../api/eventData';
import { getGames } from '../api/gameData';
import getGamers from '../api/gamerData';

const initialState = {
  description: '',
  date: '',
  time: '',
  game_id: '',
  organizer_id: '',
};

const EventForm = ({ user }) => {
  const [games, setGames] = useState([]);
  const [gamers, setGamers] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  useEffect(() => {
    getGames()
      .then((fetchedGames) => {
        setGames(fetchedGames);
      })
      .catch((error) => {
        console.error(error);
      });

    getGamers()
      .then((fetchedGamers) => {
        setGamers(fetchedGamers); // Corrected from 'fetchGamers' to 'fetchedGamers'
      })
      .catch((error) => {
        console.error(error);
      });

    if (id) {
      getEvent(id)
        .then((fetchedEvent) => {
          setCurrentEvent(fetchedEvent);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setCurrentEvent(initialState);
    }
  }, [id, user?.uid]); // Dependency array

  const handleChange = (e) => {
    setCurrentEvent({
      ...currentEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: currentEvent.id,
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      game_id: currentEvent.game_id,
      organizer_id: currentEvent.gameType,
    };

    createEvent(newEvent).then(() => router.push('/event'));
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" required value={currentEvent.date} onChange={handleChange} />
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" name="time" required value={currentEvent.time} onChange={handleChange} />
          <Form.Label>Game</Form.Label>
          <Form.Select
            name="game"
            value={currentEvent.game_id}
            onChange={handleChange}
          >
            {games.map((gameItem) => (
              <option key={gameItem.id} value={gameItem.id}>
                {gameItem.title}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Organizer</Form.Label>
          <Form.Select
            name="organizer"
            value={currentEvent.organizer_id}
            onChange={handleChange}
          >
            {gamers.map((organizerItem) => ( // Use gamers instead of event
              <option key={organizerItem.id} value={organizerItem.id}>
                {organizerItem.bio}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit!
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
