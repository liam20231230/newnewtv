import React, { useState } from "react";
import { Alert } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, TV, tvApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  padding: 10px 15px;
  width: 100%;
  margin: 10px 0px;
  margin-bottom: 40px;
  color: white;
`;
const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: white;
  margin-bottom: 20px;
  margin-top: -30px;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      <Line />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? <HList title="Movie" data={moviesData.results} /> : null}
      {tvData ? <HList title="TV" data={tvData.results} /> : null}
    </Container>
  );
};
export default Search;
