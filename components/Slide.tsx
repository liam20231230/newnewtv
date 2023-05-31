import { BlurView } from "expo-blur";
import React from "react";
import { View } from "react-native";
import { styled } from "styled-components/native";

const Slide: React.FC = () => {
  return (
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
  );
};
export default Slide;
