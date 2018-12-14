import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const NOT_KEY = "Flash:Notification";

export async function getDecks() {
  let decks = [];
  await AsyncStorage.getItem("DECKS").then(
    response => (decks = JSON.parse(response))
  );
  return decks;
}

export async function getDeck(id) {
  let deck = [];
  await AsyncStorage.getItem("DECKS").then(
    response => (deck = JSON.parse(response).filter(res => res.title === id)[0])
  );
  return deck;
}

export async function saveDeckTitle(newDeck, edit = false) {
  if (edit) {
    let deckTemp = [];
    let deckQuestions = [];
    await AsyncStorage.getItem("DECKS").then(
      decks => (deckTemp = JSON.parse(decks))
    );

    await AsyncStorage.getItem("DECKS").then(
      decks =>
        (deckQuestions = JSON.parse(decks).filter(
          dk => dk.title === newDeck.title
        )[0].questions)
    );

    deckQuestions = await [...deckQuestions, newDeck.questions[0]];
    const newDeckAdd = {
      title: newDeck.title,
      questions: deckQuestions
    };

    let index = deckTemp.indexOf(
      deckTemp.filter(dk => dk.title === newDeck.title)[0]
    );
    await deckTemp.splice(index, 1);
    await AsyncStorage.setItem("DECKS", JSON.stringify(deckTemp));

    await AsyncStorage.getItem("DECKS").then(deck => {
      if (deck === null) {
        return AsyncStorage.setItem("DECKS", JSON.stringify([newDeckAdd]));
      } else {
        let prePost = JSON.parse(deck);
        prePost = [...prePost, newDeckAdd];
        return AsyncStorage.setItem("DECKS", JSON.stringify(prePost));
      }
    });
  } else {
    await AsyncStorage.getItem("DECKS").then(deck => {
      if (deck === null) {
        return AsyncStorage.setItem("DECKS", JSON.stringify([newDeck]));
      } else {
        let prePost = JSON.parse(deck);
        prePost = [...prePost, newDeck];
        return AsyncStorage.setItem("DECKS", JSON.stringify(prePost));
      }
    });
  }
}

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOT_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

const newNotification = {
  title: "Flash Cards",
  body: "You have not even studied today.",
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: "high",
    sticky: false,
    vibrate: true
  }
};

export function setLocalNotification() {
  AsyncStorage.getItem(NOT_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(10);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(newNotification, {
              time: tomorrow,
              repeat: "day"
            });

            AsyncStorage.setItem(NOT_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
