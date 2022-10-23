import { Link } from "react-router-dom";
import BrokenImage from "../../assets/broken.jpg";

export default function CharacterItem({ character, fromSearch = false }) {
  const { char_id, name, nickname, img: image } = character;

  return (
    <Link
      to={`/characters/${char_id}`}
      className={`character-card-item ${fromSearch && "from-search"}`}
    >
      <div>
        <figure>
          <img className="image" src={image} alt={name} />
        </figure>
        <h3 className="name">{name}</h3>
        {nickname && <span className="nickname">{nickname}</span>}
      </div>
    </Link>
  );
}
