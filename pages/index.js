import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import { getGames } from '../components/api/gameData';

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then((data) => {
      setGames(data);
    });

    import('@fvilers/disable-react-devtools').then(({ disableReactDevTools }) => {
      disableReactDevTools();
    });
  }, []);

  return (
    <article className="games">
      <h1>Games</h1>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard
            id={game.id.toString()}
            title={game.title}
            maker={game.maker}
            numberOfPlayers={game.number_of_players}
            skillLevel={game.skill_level}
            onUpdate={() => window.location.reload()}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
