import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header, Left, Icon, Body, Title } from "native-base";
import { getDeck } from "../functions";
import { Actions } from "react-native-router-flux";

export default class Quiz extends PureComponent {
  state = {
    hit: 0,
    pageAnswer: false,
    prg: 0,
    deck: undefined
  };

  async componentDidMount() {
    const deck = await getDeck(this.props.id);
    await this.setState({ deck });
  }

  async nextQuestion(answer) {
    const { hit, prg, deck } = this.state;
    this.setState({
      pageAnswer: false
    });
    await this.setState({
      hit: answer ? hit + 1 : hit
    });

    if (this.state.prg + 1 >= deck.questions.length) {
      Actions.results({
        tot: deck.questions.length,
        hit: this.state.hit,
        title: this.props.id
      });
    } else {
      this.setState({
        prg: prg + 1
      });
    }
  }

  render() {
    const { deck, prg, pageAnswer } = this.state;
    return (
      <View>
        <Header>
          <Left style={styles.left}>
            <Icon
              style={styles.icon}
              type="FontAwesome"
              name="arrow-left"
              onPress={() => Actions.standard()}
            />
            <Text style={styles.txtTitle}>Quiz</Text>
          </Left>
          <Body style={styles.body} />
        </Header>
        {deck !== undefined ? (
          <View style={styles.container}>
            <View>
              <Text style={styles.txtBtn}>
                {"Question: " + (prg + 1) + "/" + deck.questions.length}
              </Text>
            </View>
            {!pageAnswer ? (
              <View style={styles.container}>
                <View style={styles.viewQuest}>
                  <Text style={styles.txtQuestion}>
                    {deck.questions[prg].question}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => this.setState({ pageAnswer: true })}
                >
                  <Text style={styles.btnAnswer}>Show Answer</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.viewAnswer}>
                <Text style={styles.txtQuestion}>
                  {deck.questions[prg].answer}
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({ pageAnswer: false })}
                >
                  <Text style={styles.btnQuestion}>Question</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnCorrect}
                  onPress={() => this.nextQuestion(true)}
                >
                  <Text style={styles.txtBtn}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnIncorrect}
                  onPress={() => this.nextQuestion(false)}
                >
                  <Text style={styles.txtBtn}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View>
            <Text>Sem Dados</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center"
  },
  viewAnswer: {
    width: "100%",
    alignItems: "center"
  },
  txtBtn: {
    fontSize: 27,
    color: "#000"
  },
  viewQuest: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center"
  },
  txtQuestion: {
    fontSize: 35
  },
  btnQuestion: {
    fontSize: 27,
    color: "#FF0000"
  },
  btnAnswer: {
    fontSize: 27,
    color: "#008000"
  },
  btnCorrect: {
    width: 300,
    backgroundColor: "#008000",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "transparent"
  },
  btnIncorrect: {
    width: 300,
    backgroundColor: "#FF0000",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "transparent"
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
