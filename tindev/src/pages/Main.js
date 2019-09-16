import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from "react-native";

import api from "../services/api";

import logo from "../assets/logo.png";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";

export default function Main({ navigation }) {
  const id = navigation.getParam("user");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: {
          user: id
        }
      });
      setUsers(response.data);
    }
    loadUsers();
  }, [id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: id }
    });
    setUsers(users.filter(user => user._id !== id));
  }
  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: id }
    });
    setUsers(users.filter(user => user._id !== id));
  }

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>
      {users.length === 0 ? (
        <Text style={styles.empty}>Acabou :( </Text>
      ) : (
        users.map((user, index) => (
          <View style={styles.cardsContainer}>
            <View style={(styles.card, { zIndex: users.length - index })}>
              <Image style={styles.avatar} source={{ uri: null }} />
              <View style={styles.footer}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.bio} numberOfLines={3}>
                  {user.bio}
                </Text>
              </View>
            </View>
          </View>
        ))
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={dislike} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={like} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    marginTop: 30
  },
  cardsContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    maxHeight: 500
  },
  card: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    margin: 30,
    overflow: "hidden",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  avatar: {
    flex: 1,
    height: 300
  },
  footer: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  },
  bio: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
    lineHeight: 18
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 30
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    elevation: 2
  },
  empty: {
    alignSelf: "center",
    color: "#999",
    fontSize: 24,
    fontWeight: "bold"
  }
});
