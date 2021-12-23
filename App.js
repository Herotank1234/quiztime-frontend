import React from "react";
import {
  Center,
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import QuizScreen from './screens/QuizScreen'
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <QuizScreen />
      </Center>
    </NativeBaseProvider>
  );
}