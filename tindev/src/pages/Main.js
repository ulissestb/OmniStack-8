import React from "react";
import { View, Text, Image } from "react-native";

import logo from "../assets/logo.png";
import { SafeAreaView } from "react-navigation";

export default function Main() {
  return (
    <SafeAreaView>
      <Image source={logo} />
    </SafeAreaView>
  );
}
