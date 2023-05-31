import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  useColorScheme,
  StyleSheet,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../util";
import { Ionicons } from "@expo/vector-icons";

const API_KEY = "906f6b5f3ddf18f66152a5da07d24e3b";

// const isDark = useColorScheme() === "dark";

const Container = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.mainBgColor};
`;

const BgImg = styled.Image``;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-size: 16px;
  font-weight: 600;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 55%;
`;

const TagLine = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) => props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

const Votes = styled(TagLine)<{ isDark: boolean }>`
  font-size: 16px;
  color: ${(props) => props.isDark ? "rgba(255, 255, 255, 0.75)" : "rgba(0, 0, 0, 0.75)"} 
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [taglines, setTaglines] = useState({});

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR&api_key=${API_KEY}`
        );
        const data = await response.json();
        setNowPlaying(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNowPlaying();
  }, []);

  useEffect(() => {
    const fetchTaglines = async () => {
      const fetchedTaglines = await Promise.all(
        nowPlaying.map(async (movie) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?language=ko-KR&api_key=${API_KEY}`
          );
          const data = await response.json();
          return { [movie.id]: data.tagline };
        })
      );
      setTaglines(Object.assign({}, ...fetchedTaglines));
    };

    if (nowPlaying.length > 0) {
      fetchTaglines();
    }
  }, [nowPlaying]);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={true}
        paginationStyle={{ marginRight: "35%" }}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 2.5 }}
        activeDotColor="rgb(255, 255, 255)"
        dotColor="rgb(94, 94, 94)"
        dotStyle={{ width: "2%", height: "100%" }}
        activeDotStyle={{ width: "2%", height: "100%" }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(movie.backdrop_path) }}
            />
            <BlurView
              tint={isDark ? "dark" : "light"}
              intensity={120}
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <Column>
                  <Title isDark={isDark}>{movie.title}</Title>
                  {movie.vote_average > 0 ? (
                    <Votes isDark={isDark}>
                      <Ionicons name="star" size={16} color="#ff904c" />
                      {movie.vote_average}/10
                    </Votes>
                  ) : null}
                  <TagLine isDark={isDark}>
                    {(taglines[movie.id] || "").slice(0, 50)}...
                  </TagLine>
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
