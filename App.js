import AppLoading from "expo-app-loading";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Image, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);
  const isDark = useColorScheme() === "dark";

  useEffect(() => {
    const startLoading = async () => {
      const fonts = loadFonts([Ionicons.font]);
      await Promise.all([...fonts]);
      setReady(true);
    };
    startLoading();
  }, []);

  if (!ready) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
