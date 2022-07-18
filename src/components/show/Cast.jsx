import React from "react";
import { CastList } from "./Cast.styled";
import IMG_PLACEHOLDER from "./imageNotFound.jpeg";
const Cast = ({ cast }) => {
  return (
    <CastList>
      {cast.map(({ person, character, voice }, key) => (
        <div key={key} className='cast-item' >
          <div className="pic-wraper" >
            <img
              src={person.image ? person.image.medium : IMG_PLACEHOLDER}
              alt="cast-person"
            />
          </div>
          <div className="actor" >
            <span>
              <span className="bold" >{person.name}</span> | {character.name} {voice ? "| Voice" : ""}
            </span>
          </div>
        </div>
      ))}
    </CastList>
  );
};

export default Cast;
