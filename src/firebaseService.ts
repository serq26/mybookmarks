import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import db from "./firebaseConfig";
import { firebaseTimestampToDate } from "./utils";

export interface FirebaseItem {
  id: string;
  title: string;
  description: string;
  link: string;
  website: string;
  createdAt: string;
}

export const addItem = async (
  title: string,
  description: string,
  link: string,
  website: string
) => {
  try {
    const docRef = await addDoc(collection(db, "items"), {
      title,
      description,
      link,
      website,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    return { id: docRef.id, title, description, link, website };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Data could not be saved");
  }
};

export const getItems = async () => {
  try {
    const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const items: FirebaseItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.createdAt = firebaseTimestampToDate(data.createdAt).toLocaleString(
        "tr-TR",
        {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }
      );

      items.push({
        id: doc.id,
        ...data,
      } as FirebaseItem);
    });
    return items;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw new Error("Data could not be retrieved");
  }
};
