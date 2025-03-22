import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import axios from "axios";

const API_KEY = "87f226213453bf73c3bb3b4fc73ff2eb"; // Buraya kendi API anahtarını yaz
const CITY = "Bursa";


const getBackgroundImage = (weather) => {
  switch (weather) {
    case "Clear":
      return require("./assets/clear.jpg");
    case "Clouds":
      return require("./assets/cloud.jpg");
    case "Rain":
      return require("./assets/rainy.jpg");
    case "Snow":
      return require("./assets/snow.jpg");
    default:
      return require("./assets/default.jpg");
  }
};

const App = () => {
  const [temperature, setTemperature] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
        );
        setTemperature(response.data.main.temp);
        setWeather(response.data.weather[0].main);
      } catch (error) {
        console.error("Hava durumu verisi alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <ImageBackground source={getBackgroundImage(weather)} style={styles.background}>
      <View style={styles.overlay}>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            <Text style={styles.city}>{CITY}</Text>
            <Text style={styles.temperature}>{temperature}°C</Text>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  city: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  temperature: {
    fontSize: 32,
    color: "white",
    marginTop: 10,
  },
});

export default App;