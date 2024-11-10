import styled from "styled-components";

const GenreButtons = styled.div`
  display: flex;
`;
const GenreButton = styled.button`
  padding: 5px 10px;
  cursor: pointer;
`;

const GenreSelector = ({ genres, selectGenre, onSelectGenre }) => {
  return (
    <GenreButtons>
      <GenreButton onClick={() => onSelectGenre(null)} $isActive={!selectGenre}>
        전체보기
      </GenreButton>
      {genres &&
        genres.map((genre) => (
          <GenreButton
            key={genre.id}
            onClick={() => onSelectGenre(genre.id)}
            $isActive={selectGenre === genre.id}
          >
            {genre.name}
          </GenreButton>
        ))}
    </GenreButtons>
  );
};

export default GenreSelector;
