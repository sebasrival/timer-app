import { Stack } from "expo-router";
import {
  configureFonts,
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{ headerShown: false, statusBarColor: "#070417" }}
      />
    </PaperProvider>
  );
}
