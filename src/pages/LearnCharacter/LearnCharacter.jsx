import { useLocation } from "react-router-dom";

const LearnCharacter = () => {
  const location = useLocation();
  const { character } = location.state || {};

  console.log(character)

  return (
    <>
      {character.name}
      <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
      <p>{character.description}</p>
    </>
  );
};

export default LearnCharacter;
