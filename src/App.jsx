import * as React from "react";
import {
  MagnifyingGlass,
  SmileyNervous,
  Info,
  X,
  IdentificationCard,
  Cake,
  MonitorPlay,
} from "phosphor-react";
import { styled, keyframes } from "@stitches/react";
import * as Dialog from "@radix-ui/react-dialog";

const charactersApi = "https://breakingbadapi.com/api/characters";

// Modal Styles

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(Dialog.Overlay, {
  backgroundColor: "rgba(0, 0, 0, .5)",
  backdropFilter: "blur(8px)",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(Dialog.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  overflowY: "auto",
  padding: "1.5rem",
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
  "& .avatar": {
    width: "180px",
    height: "180px",
    borderRadius: "3px",
    flexShrink: "0",
    backgroundPosition: "center 0%",
    backgroundSize: "cover",
    objectFit: "cover",
    "& .content": {
      flex: "1",
    },
  },
  "& .points": {
    fontSize: 12,
  },
});

const StyledTitle = styled(Dialog.Title, {
  marginBottom: 4,
  fontWeight: 700,
  fontSize: "1.5rem",
  color: "var(--surface)",
});

const StyledClose = styled(Dialog.Close, {
  position: "absolute",
  right: "1rem",
  top: "1rem",
  border: "none",
  outline: "none",
  background: "transparent",
});

function App() {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  React.useEffect(async () => {
    const characters = await fetch(charactersApi)
      .then((res) => res.json())
      .then((characters) => setData(characters));
    setIsLoading(false);
  }, []);

  const filtered = !search
    ? data
    : data.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="App">
      <div className="site-header">
        <h2 className="title">Breaking Bad Characters</h2>

        <div className="filters mt-5">
          <div className="search-input-wrapper position-relative mx-auto">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearchInput}
              className="search-input d-block w-100"
            />
            <div className="icon position-absolute">
              <MagnifyingGlass size={20} />
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="loading">
          <div className="spinner-border text-light mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>Loading...</h4>
        </div>
      ) : (
        <div className="characters-grid container">
          {filtered.length > 0 ? (
            filtered.map((character) => (
              <div
                className={`character-card ${character.name
                  .split(" ")
                  .join("_")}`}
                key={character.char_id}
              >
                <div
                  className="avatar"
                  style={{ backgroundImage: `url('${character.img}')` }}
                ></div>
                <h3 className="name mt-3 mb-2">{character.name}</h3>
                <ul className="points mb-0">
                  <li>{character.category}</li>
                  <li>{character.status}</li>
                </ul>
                <div className="seasons mt-2 d-flex align-items-center gap-1">
                  <span className="label">Seasons:</span>
                  <p className="mb-0">{character.appearance.join(",")}</p>
                </div>

                <div className="footer d-flex align-items-center gap-2 mt-3">
                  {character.nickname ? (
                    <span className="nickname d-inline-flex py-1 px-3 rounded-pill">
                      {character.nickname}
                    </span>
                  ) : null}
                  <Dialog.Root>
                    <Dialog.Trigger className="modal-trigger">
                      <Info size={20} />
                    </Dialog.Trigger>
                    <StyledOverlay />
                    <StyledContent>
                      <div className="card d-flex flex-column align-items-center gap-3">
                        <div
                          className="avatar"
                          style={{
                            backgroundImage: `url('${character.img}')`,
                          }}
                        ></div>
                        <div className="content">
                          <StyledTitle>{character.name}</StyledTitle>
                          <small className="text-secondary">
                            - {character.nickname}
                          </small>
                          <ul className="points text-body ps-3 mb-0 mt-1">
                            <li>{character.category}</li>
                            <li>{character.status}</li>
                            {character.occupation.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>

                          <small className="text-muted d-flex align-items-center mt-2">
                            <IdentificationCard size={18} className="me-2" />
                            {character.portrayed}
                          </small>

                          <small className="text-muted d-flex align-items-center mt-2">
                            <Cake size={18} className="me-2" />
                            {character.birthday}
                          </small>

                          <div className="seasons mt-2 d-flex align-items-center text-muted mt-2">
                            <span className="label d-inline-flex align-items-center ">
                              <MonitorPlay size={18} className="me-2" />
                              Seasons:
                            </span>
                            <small className="mb-0 d-inline-flex ms-2">
                              {character.appearance.join(",")}
                            </small>
                          </div>
                        </div>
                      </div>

                      <StyledClose>
                        <X />
                      </StyledClose>
                    </StyledContent>
                  </Dialog.Root>
                </div>
              </div>
            ))
          ) : (
            <h3 className="not-found-message text-center mt-5 d-flex align-items-center justify-content-center">
              <SmileyNervous size={28} className="me-2" /> Data Not Found
            </h3>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
