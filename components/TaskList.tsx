import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import colors from "../utils/colors";
import TaskModal from "./TaskModal";

const TaskList = ({ list, updateList }: any) => {
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

  const tasksCompletedCount = list.tasks.filter(
    (task: any) => task.completed
  ).length;

  const tasksPendingCount = list.tasks.length - tasksCompletedCount;

  return (
    <View>
      <Modal
        animationType="slide"
        visible={showTaskModal}
        onRequestClose={() => setShowTaskModal(false)}
      >
        <TaskModal
          list={list}
          closeModal={() => setShowTaskModal(false)}
          updateList={updateList}
        />
      </Modal>
      <TouchableOpacity
        style={[styles.listContainer, { backgroundColor: list.color }]}
        onPress={() => setShowTaskModal(true)}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.title}
        </Text>

        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{tasksPendingCount}</Text>
            <Text style={styles.description}>Pending</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{tasksCompletedCount}</Text>
            <Text style={styles.description}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    borderRadius: 8,
    marginHorizontal: 14,
    width: 180,
    alignItems: "center",
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
  },
  count: {
    fontSize: 46,
    fontWeight: "200",
    color: colors.white,
  },
});

export default TaskList;
