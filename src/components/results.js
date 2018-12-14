import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";

export default class Results extends Component {
  render() {
    const { tot, hit } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.viewProgressBar}>
            <View style={styles.prgBack}>
              <View
                style={[
                  styles.viewResult,
                  {
                    width: `${(hit / tot) * 100}%`
                  }
                ]}
              />
              <Text style={styles.txtBtn}>
                {"Result: " + hit + " of " + tot}
              </Text>
            </View>
          </View>

          <View style={styles.viewBtn}>
            <TouchableOpacity
              style={styles.btnRestart}
              onPress={() => Actions.quiz({ id: this.props.title })}
            >
              <Text style={styles.txtBtn}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnDeck}
              onPress={() => Actions.deck({ id: this.props.title })}
            >
              <Text style={styles.txtBtn}>Go to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  container2: {
    flexDirection: "column",
    alignItems: "center"
  },
  viewProgressBar: {
    flexDirection: "row",
    height: 50
  },
  viewResult: {
    height: 50,
    backgroundColor: "#32CD32",
    borderRadius: 5,
    position: "absolute"
  },
  txtBtn: {
    fontSize: 27,
    color: "#000"
  },
  viewBtn: {
    margin: 20
  },
  prgBack: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#C0C0C0",
    borderRadius: 5
  },
  btnRestart: {
    width: 300,
    backgroundColor: "#4682B4",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "transparent"
  },
  btnDeck: {
    width: 300,
    backgroundColor: "#708090",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "transparent"
  }
});
