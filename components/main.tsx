import { styled } from "nativewind";
import { useState } from "react";
import { View, Text as TextR } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../constants/global.styles";

const TextStyled = styled(Text);
const IconButtonStyled = styled(IconButton);

export default function Layout() {
  const insets = useSafeAreaInsets();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  const startAndPauseTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
      setIntervalId(interval);
    } else {
      setIsRunning(false);
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
    clearInterval(intervalId);
    setIntervalId(undefined);
  };

  const formatTimer = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemainder = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secondsRemainder.toString().padStart(2, "0")}`;
  };

  return (
    <View
      className="flex-1 px-4 py-2 items-center gap-24 justify-center"
      style={{ ...insets, ...styles.containter }}
    >
      <TextStyled
        className="text-white font-bold text-4xl"
        variant="headlineMedium"
      >
        Timer App
      </TextStyled>
      <View className="w-80 h-80 rounded-full justify-center items-center border-[15px] border-[#1b143f]">
        <TextStyled className="text-white font-bold text-6xl pb-0">
          {formatTimer(seconds)}
        </TextStyled>
      </View>
      <View className="flex-row w-full justify-center space-x-24">
        <IconButtonStyled
          mode="contained-tonal"
          icon={isRunning ? "pause" : "play"}
          size={55}
          animated={true}
          onPress={startAndPauseTimer}
          iconColor="white"
          containerColor="rgba(255, 255, 255, 0.1)"
        />
        <IconButtonStyled
          mode="contained-tonal"
          icon="stop"
          size={55}
          onPress={resetTimer}
          animated={true}
          iconColor="white"
          containerColor="rgba(255, 255, 255, 0.1)"
        />
      </View>
    </View>
  );
}
