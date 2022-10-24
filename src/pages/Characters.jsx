import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CharacterItem from "../components/Characters/CharacterItem";
import { axiosClient } from "../utils/axiosClient";
import "../styles/characters.scss";
import Spinner from "../components/Spinner";

export default function Characters() {
  const [search, setSearch] = useState("");

  const { isLoading, data, error } = useQuery(["characters"], () =>
    axiosClient("/characters").then((response) => response.data)
  );

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="container">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <header className="site-header">
            <h1>Breaking Bad</h1>
            <p>
              A mini app to browse Breaking Bad & Better Call Saul Character,
              Quotes and Episodes. Data provided by{" "}
              <a href="https://breakingbadapi.com/" target="_blank">
                breakingbadapi.com
              </a>
            </p>
          </header>

          <div className="controls">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search"
              placeholder="Search a Character..."
            />
          </div>

          <div className={`characters-grid ${search && "has-search-items"}`}>
            {!search ? (
              data.map((character) => (
                <CharacterItem character={character} key={character.char_id} />
              ))
            ) : data.filter((character) =>
                character.name.toLowerCase().startsWith(search.toLowerCase())
              ).length === 0 ? (
              <div className="no-data">
                <h3>No Characters Found</h3>
              </div>
            ) : (
              data
                .filter((character) =>
                  character.name.toLowerCase().startsWith(search.toLowerCase())
                )
                .map((character) => (
                  <CharacterItem
                    fromSearch
                    character={character}
                    key={character.char_id}
                  />
                ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
