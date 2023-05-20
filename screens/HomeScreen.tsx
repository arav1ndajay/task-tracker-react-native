import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import colors from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import TaskList from "../components/TaskList";
import NewListModal from "../components/NewListModal";

interface List {
  id: string;
  uid: string;
  title: string;
  color: string;
  tasks: {
    title: string;
    completed: boolean;
  }[];
}

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [lists, setLists] = useState<List[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const addList = async (list: any) => {
    await addDoc(collection(db, "lists"), {
      uid: auth.currentUser?.uid,
      ...list,
      tasks: [],
    });
  };

  const updateList = async (list: any) => {
    const docRef = doc(db, "lists", list.id);

    await updateDoc(docRef, list);
  };

  const deleteList = async (list: any) => {
    await deleteDoc(doc(db, "lists", list.id));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lists"));

        let lst: List[] = [];

        querySnapshot.forEach((doc) => {
          if (doc.data().uid === auth.currentUser?.uid) {
            lst.push({
              id: doc.id,
              uid: doc.data().uid,
              title: doc.data().title,
              color: doc.data().color,
              tasks: doc.data().tasks,
            });
          }
        });
        setLists(lst);
        setLoading(false);

        // listening for changes
        const unsubscribe = onSnapshot(collection(db, "lists"), (snapshot) => {
          let newLists: List[] = [];
          snapshot.forEach((doc) => {
            if (doc.data().uid === auth.currentUser?.uid) {
              newLists.push({
                id: doc.id,
                uid: doc.data().uid,
                title: doc.data().title,
                color: doc.data().color,
                tasks: doc.data().tasks,
              });
            }
          });
          setLists(newLists);
        });

        // Clean up the listener when the component unmounts
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchLists();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.purple} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <NewListModal
          closeModal={() => setShowModal(false)}
          addList={addList}
        />
      </Modal>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Task Lists</Text>
      </View>
      {lists === undefined || lists.length === 0 ? (
        <Text
          style={{
            color: colors.white,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          No Task Lists. Try adding some.
        </Text>
      ) : (
        <View style={{ height: 275, paddingLeft: 32, marginTop: 48 }}>
          <FlatList
            data={lists}
            keyExtractor={(item) => item.title}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TaskList
                list={item}
                updateList={updateList}
                deleteList={deleteList}
              />
            )}
            keyboardShouldPersistTaps="always"
          />
        </View>
      )}

      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity
          style={styles.addIcon}
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="add" size={18} color={colors.white}></Ionicons>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
  },
  button: {
    backgroundColor: colors.purple,
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  divider: {
    backgroundColor: colors.purple,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "800",
    color: colors.white,
    paddingHorizontal: 64,
  },
  addIcon: {
    padding: 12,
    borderWidth: 2,
    borderColor: colors.purple,
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: colors.purple,
    justifyContent: "center",
  },
});
