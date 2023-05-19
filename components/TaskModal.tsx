import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard
} from "react-native";
import colors from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import tempData from "../tempData";

const TaskModal = ({ list, closeModal, updateList }: any) => {
  const taskCount = list.tasks.length;

  const [newTask, setNewTask] = useState("");

  const toggleTaskCompleted = (index: any) => {
    list.tasks[index].completed = !list.tasks[index].completed;

    updateList(list);
  };

  const addTask = () => {
    list.tasks.push({
        title: newTask,
        completed: false
    })

    updateList(list)
    setNewTask("")

    Keyboard.dismiss()
  }

  const renderTask = (task: any, index: any) => {
    return (
      <KeyboardAvoidingView style={styles.taskContainer}>
        <TouchableOpacity onPress={() => toggleTaskCompleted(index)}>
          <Ionicons
            name={task.completed ? "square" : "square-outline"}
            size={24}
            color={colors.lightGrey}
            style={{ width: 32 }}
          ></Ionicons>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: task.completed ? colors.lightGrey : colors.white,
            textDecorationLine: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </Text>
      </KeyboardAvoidingView>
    );
  };

  const completedCount = list.tasks.filter(
    (task: any) => task.completed
  ).length;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 32, right: 32, zIndex: 10 }}
        onPress={closeModal}
      >
        <Ionicons name="close" size={24} color={colors.white} />
      </TouchableOpacity>
      <View
        style={[
          styles.section,
          styles.header,
          { borderBottomColor: list.color },
        ]}
      >
        <Text style={styles.title}>{list.title}</Text>
        <Text style={styles.taskCount}>
          {completedCount} of {taskCount} tasks
        </Text>
      </View>

      <View style={[styles.section, { flex: 3 }]}>
        <FlatList
          data={list.tasks}
          renderItem={({ item, index }) => renderTask(item, index)}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <KeyboardAvoidingView
        style={[styles.section, styles.footer]}
        behavior="padding"
      >
        <TextInput
          style={[styles.input, { borderColor: list.color }]}
          onChangeText={(text) => setNewTask(text)}
          value={newTask}
        />
        <TouchableOpacity
          style={[styles.addTask, { backgroundColor: list.color }]}
          onPress={addTask}
        >
          <Ionicons name="add" size={16} color={colors.white} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.white,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.grey,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    marginRight: 8,
    paddingHorizontal: 8,
    color: colors.white
  },
  addTask: {
    borderRadius: 4,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TaskModal;
