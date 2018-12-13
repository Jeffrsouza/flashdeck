import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import Standard from "./src/components";
import NewDeck from "./src/components/newDeck";
import NewQuest from "./src/components/newQuest";
import Deck from "./src/components/deck";
import Quiz from "./src/components/quiz";
import Results from "./src/components/results";

import {
  Actions,
  Drawer,
  Router,
  Scene,
  Modal
} from "react-native-router-flux";
import { Container, Root } from "native-base";
import { setLocalNotification } from "./src/functions";
import { Font, AppLoading } from "expo";

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Container style={styles.container}>
        <Root>
          <Router>
            <Scene key="root">
              <Scene
                key="standard"
                component={Standard}
                hideNavBar
                direction="horizontal"
                initial
              />

              <Scene
                key="deck"
                component={Deck}
                hideNavBar
                direction="horizontal"
              />
              <Scene
                key="quiz"
                component={Quiz}
                hideNavBar
                direction="horizontal"
              />
              <Scene
                key="results"
                component={Results}
                hideNavBar
                direction="horizontal"
              />
              <Scene
                key="newDeck"
                component={NewDeck}
                hideNavBar
                direction="horizontal"
              />
              <Scene
                key="newQuest"
                component={NewQuest}
                hideNavBar
                direction="horizontal"
              />
            </Scene>
          </Router>
        </Root>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25
  }
});
