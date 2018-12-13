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

export default class Teste extends Component {
  state = {};
  render() {
    return (
      <View>
        <Tabs
          locked={true}
          tabBarPosition="top"
          page={this.state.tabIndex}
          onChangeTab={({ i, ref, from }) => this.setState({ tabIndex: i })}
        >
          <Tab
            heading={
              <TabHeading>
                <Text style={{ fontSize: 15 }}>Decks</Text>
              </TabHeading>
            }
          >
            <ScrollView style={styles.scroll} />
          </Tab>
        </Tabs>
      </View>
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
    //fontSize: 27
  },
  txtCard: {
    color: "#A9A9A9"
    //fontSize: 17
  }
});
