/* View da lista de baralhos (View padrão)*/

//exibe o título de cada baralho
//exibe o número de cartões em cada baralho

import React, { Component } from "react";
import {
  AsyncStorage,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import { Tab, Tabs, TabHeading, Title } from "native-base";
import { Actions } from "react-native-router-flux";
import { getDecks } from "../functions";
import NewDeck from "./newDeck";

export default class Standard extends Component {
  state = {
    decks: undefined
  };
  async componentDidMount() {
    const decks = await getDecks();
    await this.setState({ decks });
  }
  render() {
    const { decks } = this.state;
    return (
      <Tabs
        locked={true}
        tabBarPosition="top"
        tabBarUnderlineStyle={{
          backgroundColor: Platform.OS === "ios" ? "#A71C21" : "#46A8B4"
        }}
        page={this.state.tabIndex}
        onChangeTab={({ i, ref, from }) => this.setState({ tabIndex: i })}
      >
        <Tab
          heading={
            <TabHeading>
              <Text style={styles.txtTitle}>Decks</Text>
            </TabHeading>
          }
        >
          <ScrollView style={styles.scroll}>
            <View style={styles.container}>
              {this.state.decks !== undefined &&
                this.state.decks !== null &&
                this.state.decks.map(deck => (
                  <TouchableOpacity
                    style={styles.viewCard}
                    key={deck.title}
                    onPress={() => Actions.deck({ id: deck.title })}
                  >
                    <Text style={styles.txtBtn}>{deck.title}</Text>
                    <Text style={styles.txtCard}>
                      {deck.questions.length + " Cards"}
                    </Text>
                  </TouchableOpacity>
                ))}
              <TouchableOpacity
                style={styles.btnNew}
                onPress={() => Actions.newDeck()}
              >
                <Text style={styles.txtBtn}>New Deck</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Text style={styles.txtTitle}>New Deck</Text>
            </TabHeading>
          }
        >
          <View>
            <NewDeck />
          </View>
        </Tab>
      </Tabs>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F5FCFF"
  },
  viewCard: {
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#4169E1",
    borderBottomWidth: 5,
    borderRadius: 20,
    paddingTop: 10,
    backgroundColor: "#fff"
  },
  btnNew: {
    width: "100%",
    backgroundColor: "#00BFFF",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "transparent"
  },
  txtBtn: {
    fontSize: 27
  },
  txtCard: {
    color: "#A9A9A9",
    fontSize: 17
  },
  txtTitle: {
    fontSize: 20,
    color: "#fff"
  }
});
