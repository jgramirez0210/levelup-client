  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user && user.uid) {
      getGameTypes()
        .then((types) => {
          setGameTypes(types);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      getGame(id).then((gameDetails) => {
        setCurrentGame(gameDetails);
        setLoading(false);
      });
    } else {
      setCurrentGame(initialState);
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const gameToSave = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: currentGame.numberOfPlayers,
      skillLevel: currentGame.skillLevel,
      gameType: currentGame.gameType,
      userId: user.uid,
    };

    if (id) {
      updateGame(id, gameToSave).then(() => router.push(`/game/${id}`));
    } else {
      createGame(gameToSave).then((newGameId) => router.push(`/game/${newGameId}`));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{formInput.id ? 'Update' : 'Create'} Game</h2>

      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Chutes and Ladders"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Game Type" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Game Type"
          name="gameType"
          value={formInput.gameType}
          onChange={handleChange}>
          {getGameTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
          required
        </Form.Control>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Maker" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Milton Bradley"
          name="maker"
          value={formInput.maker}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Number of Players" className="mb-3">
        <Form.Control
          type="text"
          placeholder="2"
          name="numberOfPlayers"
          value={formInput.numberOfPlayers}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput5" label="Skill Level" className="mb-3">
        <Form.Control
          type="text"
          placeholder="easy"
          name="skillLevel"
          value={formInput.skillLevel}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">{id ? 'Update' : 'Create'} Game</Button>
    </Form>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string,
};

GameForm.defaultProps = {
  id: '',
};

export default GameForm;
