import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";
import "../styles/character-item.scss";
import Spinner from "../components/Spinner";

export default function Character() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const prevCharacter = queryClient
    .getQueryData(["characters"])
    ?.find((character) => character.char_id === Number(id) - 1);

  const nextCharacter = queryClient
    .getQueryData(["characters"])
    ?.find((character) => character.char_id === Number(id) + 1);

  const {
    isLoading,
    data: character,
    error,
  } = useQuery([id], () =>
    axiosClient(`/characters/${id}`).then((response) => response.data[0])
  );

  const characterStatus = character?.status;

  const { data: death } = useQuery(
    [id, characterStatus === "deceased"],
    () =>
      axiosClient(`/death?name=${character.name.replace(/\s+/g, "+")}`).then(
        (response) => {
          return response.data[0];
        }
      ),

    {
      enabled: !!characterStatus,
    }
  );

  const name = character?.name;

  const { data: quotes } = useQuery(
    [id, name],
    () =>
      axiosClient(`/quote?author=${character.name.replace(/\s+/g, "+")}`).then(
        (response) => {
          return response.data[0];
        }
      ),
    {
      enabled: !!name,
    }
  );

  if (error) {
    <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="container">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="character-item-page">
          <div className="top-row">
            <div className="left-controls">
              <button
                className="back-button"
                aria-label="Go back"
                onClick={() => navigate(-1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="feather feather-chevron-left"
                >
                  <path d="M15 18l-6-6 6-6"></path>
                </svg>
                Go Back
              </button>

              <button aria-label="Go to Homepage" onClick={() => navigate("/")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                  <path d="M9 22V12h6v10"></path>
                </svg>
              </button>
            </div>

            {(prevCharacter || nextCharacter) && (
              <div className="next-prev">
                {prevCharacter && (
                  <button
                    onClick={() =>
                      navigate(`/characters/${prevCharacter.char_id}`)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="feather feather-chevrons-left"
                    >
                      <path d="M11 17l-5-5 5-5m7 10l-5-5 5-5"></path>
                    </svg>{" "}
                    {prevCharacter.name}
                  </button>
                )}

                {nextCharacter && (
                  <button
                    onClick={() =>
                      navigate(`/characters/${nextCharacter.char_id}`)
                    }
                  >
                    {nextCharacter.name}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="feather feather-chevrons-right"
                    >
                      <path d="M13 17l5-5-5-5M6 17l5-5-5-5"></path>
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="image">
            <img src={character.img} alt={character.img} />
          </div>
          <div className="content">
            <div className="name-row">
              <h2>{character.name}</h2>{" "}
              <span
                className={`status ${character.status
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                {character.status}
              </span>
            </div>
            <p className="cast-name">
              {character.portrayed}
              {character.birthday !== "Unknown" && (
                <span>, born {character.birthday}</span>
              )}
            </p>

            <div className="occupation">
              <p>Occupation</p>
              <ul>
                {character.occupation.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {character.appearance.length > 0 && (
              <div className="episodes">
                <p>Breaking Bad Appearance (Seasons)</p>
                <ul>
                  {character.appearance.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {character.better_call_saul_appearance.length > 0 && (
              <div className="episodes">
                <p>Better Call Saul Appearance (Seasons)</p>
                <ul>
                  {character.better_call_saul_appearance.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {death?.cause && (
              <div className="death-status">
                <div className="row">
                  <h3 className="heading">Cause of Death</h3>
                  <p>{death.cause}</p>
                </div>
                <div className="row">
                  <h3 className="heading">Death Episode</h3>
                  <p>
                    Season {death.season}, Episode {death.episode}
                  </p>
                </div>
              </div>
            )}

            {quotes && (
              <div className="quote">
                <h3 className="heading">Quote(s)</h3>
                <p className="quote-item">{quotes.quote}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
