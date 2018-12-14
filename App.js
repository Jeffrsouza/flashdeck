import React, { Component } from "react";

import { setLocalNotification } from "./src/functions";

import { Root, Container, Text } from "native-base";

import { Router, Scene } from "react-native-router-flux";
import { StyleSheet } from "react-native";

import Deck from "./src/components/deck";
import NewDeck from "./src/components/newDeck";
import NewQuest from "./src/components/newQuest";
import Quiz from "./src/components/quiz";
import Results from "./src/components/results";
import Standard from "./src/components";

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
