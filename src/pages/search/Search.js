import { Helmet } from "react-helmet-async";
import Wrapper from "../../components/Wrapper";
import { NO_IMG, POSTER_URL } from "../../constant/imgUrl";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovie } from "../../api";
import styled from "styled-components";

const Form = styled.form`
  input {
    all: unset;
    width: 100%;
    height: 60px;
    border: 2px solid rgba(201, 64, 64, 0.6);
    border-radius: 30px;
    box-sizing: border-box;
    padding: 0 20px;
    &::placeholder {
      font-size: 18px;
    }
  }
`;
const ConWrap = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 50px;
  column-gap: 30px;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
    row-gap: 40px;
    column-gap: 20px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 40px;
    column-gap: 20px;
  }

  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 30px;
    column-gap: 15px;
  }

  @media (max-width: 430px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
    row-gap: 20px;
  }
`;
const Con = styled.div`
  max-width: 310px;
  aspect-ratio: 2 / 3;
  width: 100%;
  object-fit: cover;
  a {
    color: white;
  }
  h3 {
    margin-top: 10px;
    font-size: 18px;
    @media (max-width: 650px) {
      font-size: 16px;
    }

    @media (max-width: 430px) {
      font-size: 14px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

const ResultText = styled.div`
  font-size: 24px;
  text-align: center;
  margin: 30px 0;
  opacity: 0.8;
`;

const NoResults = styled.p`
  margin-top: 50px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  @media (max-width: 650px) {
    font-size: 18px;
    margin-top: 40px;
  }

  @media (max-width: 430px) {
    font-size: 16px;
    margin-top: 30px;
  }
`;

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [term, setTerm] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState();

  const onSearch = async (data) => {
    const { search: keyword } = data;
    setSearchKeyword(keyword);
    setIsSearching(true);

    try {
      const { results } = await searchMovie(keyword);

      setTerm(results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>SEARCH | CINEPICK</title>
      </Helmet>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSearch)}>
          <input
            {...register("search", {
              required: "영화 제목은 필수 입니다.",
            })}
            type="text"
            placeholder="검색할 영화 제목을 입력해 주세요."
          />
        </Form>
        {isSearching && <NoResults>검색 중...</NoResults>}
        {!isSearching && term.length === 0 && (
          <NoResults>검색 결과가 없습니다.</NoResults>
        )}
        {!isSearching && term.length > 0 && (
          <ResultText>
            검색하신 "{searchKeyword}" 에 대한 결과입니다.
          </ResultText>
        )}

        {term && (
          <ConWrap>
            {term.map((data) => (
              <Con key={data.id}>
                <Link to={`/detail/${data.id}`}>
                  <img
                    src={
                      data.poster_path ? POSTER_URL + data.poster_path : NO_IMG
                    }
                    alt={data.title}
                  />
                  <h3>{data.title}</h3>
                </Link>
              </Con>
            ))}
          </ConWrap>
        )}
      </Wrapper>
    </>
  );
};

export default Search;
