/*View do novo baralho*/

// Uma opção de inserir o título do novo baralho
// Uma opção de enviar o novo título do baralho e assim criar o baralho
import React, { Component } from "react";
import {
  AsyncStorage,
  Container,
  Content,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View
} from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Header,
  Left,
  Item,
  Input,
  Icon,
  Body,
  Title,
  Right
} from "native-base";

export default class NewDeck extends Component {
  state = {
    title: ""
  };
  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>New deck</Text>
        <TextInput
          placeholder="Deck Title"
          style={styles.input}
          onChangeText={evt => this.setState({ title: evt })}
          value={title}
        />
        <TouchableOpacity
          style={styles.submit}
          onPress={() => Actions.newQuest({ title: title })}
        >
          <Text style={styles.txtBtn}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 30,
    color: "#000"
  },
  submit: {
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
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 3,
    width: "80%"
  }
});
