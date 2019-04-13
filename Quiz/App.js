import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

//Components
import MainScreen from "./screens/MainScreen";
import GameScreen from "./screens/GameScreen";
import HistoryScreen from "./screens/HistoryScreen";
//Screen names
// import { MainScreen, GameScreen, HistoryScreen } from "./screenNames";

const App = StackNavigator({
  MainScreen: {
    screen: MainScreen
  },
  GameScreen: {
    screen: GameScreen
  },
  HistoryScreen: {
    screen: HistoryScreen
  }
});

export default App;
