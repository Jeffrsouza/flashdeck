/*View de nova pergunta*/

// Uma opção de inserir uma pergunta
// Uma opção de inserir uma resposta
// Uma opção de enviar a nova pergunta e assim criar um cartão

import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { saveDeckTitle } from "../functions";
import { Actions } from "react-native-router-flux";
import { Body, Header, Left, Icon, Title } from "native-base";

export default class NewQuest extends Component {
  state = {
    question: "",
    answer: ""
  };

  async recordDeck() {
    const newDeck = {
      title: this.props.title,
      questions: [
        {
          question: this.state.question,
          answer: this.state.answer
        }
      ]
    };

    await saveDeckTitle(newDeck, this.props.edit);
    await Actions.standard();
  }
  render() {
    const { title } = this.props;
    const { question, answer } = this.state;
    return (
      <View>
        <Header>
          <Left style={styles.left}>
            <Icon
              type="FontAwesome"
              name="arrow-left"
              style={styles.icon}
              onPress={() => Actions.standard()}
            />
            <Text style={styles.txtTitle}>New Quest</Text>
          </Left>
          <Body style={styles.body} />
        </Header>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <TextInput
            style={styles.input}
            placeholder="Question"
            value={this.state.question}
            onChangeText={evt => this.setState({ question: evt })}
          />
          <TextInput
            style={styles.input}
            value={this.state.answer}
            placeholder="Answer"
            onChangeText={evt => this.setState({ answer: evt })}
          />
          <TouchableOpacity
            style={styles.btnNew}
            onPress={() => this.recordDeck()}
          >
            <Text style={styles.txtBtn}>Submit</Text>
          </TouchableOpacity>
        </View>
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
  btnNew: {
    width: "100%",
    backgroundColor: "#00BFFF",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "transparent"
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 3,
    width: "80%"
  },
  left: {
    flexDirection: "row",
    alignItems: "center"
  },
  body: {
    borderColor: "transparent",
    borderWidth: 5
  },
  icon: { margin: 12 },
  txtTitle: {
    fontSize: 20,
    color: "#fff"
  }
});
