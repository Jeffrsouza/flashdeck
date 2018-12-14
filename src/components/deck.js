import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image
} from "react-native";
import { Header, Left, Icon, Body } from "native-base";
import { getDeck } from "../functions";
import { Actions } from "react-native-router-flux";

export default class Deck extends Component {
  state = {
    deck: undefined,
    opacity: new Animated.Value(0)
  };

  async componentDidMount() {
    const deck = await getDeck(this.props.id);
    await this.setState({ deck });
    const { opacity } = this.state;
    Animated.timing(opacity, { toValue: 1, duration: 1000 }).start();
  }

  render() {
    const { deck } = this.state;
    const { opacity } = this.state;
    return (
      <Animated.View style={[{ opacity }]}>
        <Header>
          <Left style={styles.left}>
            <Icon
              type="FontAwesome"
              name="arrow-left"
              style={styles.icon}
              onPress={() => Actions.standard()}
            />
            <Text style={styles.txtTitle}>
              {deck !== undefined ? deck.title : "Not Found"}
            </Text>
          </Left>
          <Body style={styles.body} />
        </Header>
        {deck !== undefined ? (
          <View style={styles.container}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.subtitle}>
              {deck.questions.length + " Cards"}
            </Text>
            <TouchableOpacity
              onPress={() =>
                Actions.newQuest({ title: deck.title, edit: true })
              }
              style={styles.addCard}
            >
              <Text style={styles.txtBtn}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.start}
              onPress={() => Actions.quiz({ id: deck.title })}
            >
              <Text style={styles.txtBtn}> Start Quiz</Text>
            </TouchableOpacity>
            <Animated.Image
              style={[styles.img, { opacity }]}
              source={{
                uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRddtMgOyChrEqWvmZaBlbWChihWiLxhm9KG6lTsXtKYN-uzRPFIQ`
              }}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <Text>Sem Dados</Text>
          </View>
        )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  container2: {
    borderColor: "#000",
    borderWidth: 5
  },
  title: {
    color: "#000",
    fontSize: 40
  },
  subtitle: {
    color: "#000",
    fontSize: 30
  },
  txtBtn: {
    fontSize: 27
  },
  addCard: {
    width: 300,
    backgroundColor: "#00CED1",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "transparent"
  },
  start: {
    width: 300,
    backgroundColor: "#228B22",
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
