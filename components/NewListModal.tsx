import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import colors from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { ColorPicker, toHsv, fromHsv } from "react-native-color-picker";
import tempData from "../tempData";

const NewListModal = ({ closeModal, addList }: any) => {
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState(toHsv("green"));

  const createTaskList = () => {

    const taskList = {
        title: title,
        color: fromHsv(color),
    }

    addList(taskList)

    setTitle("");
    closeModal();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{ position: "absolute", top: 32, right: 32 }}
        onPress={closeModal}
      >
        <Ionicons name="close" size={24} color={colors.white} />
      </TouchableOpacity>
      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.heading}>Create Task List</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name of list"
          onChangeText={(text) => setTitle(text)}
        />
        <View style={{ alignSelf: "center", width: 150, height: 150 }}>
          <ColorPicker
            oldColor="purple"
            color={color}
            onColorChange={(color) => setColor(color)}
            onColorSelected={(color) => alert(`Color selected: ${color}`)}
            onOldColorSelected={(color) =>
              alert(`Old color selected: ${color}`)
            }
            style={{ flex: 1 }}
            hideSliders={true}
          />
        </View>
        <TouchableOpacity
          style={[styles.createList, { backgroundColor: fromHsv(color) }]}
          onPress={createTaskList}
        >
          <Text style={{ color: colors.white, fontWeight: "600" }}>
            Create List
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.white,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.purple,
    borderRadius: 7,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.white
  },
  createList: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NewListModal;
