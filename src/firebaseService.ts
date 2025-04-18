import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "./firebaseConfig";
import { firebaseTimestampToDate } from "./utils";
import { Bookmark } from "./types/bookmark";

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
    return { id: docRef.id, title, description, link, website } as Bookmark;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Data could not be saved");
  }
};

export const deleteItemById = async (documentId: string) => {
  try {
    await deleteDoc(doc(db, "items", documentId));
    console.log("Document deleted with ID:", documentId);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Item could not be deleted");
  }
};

export const getItems = async () => {
  try {
    const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const items: Bookmark[] = [];
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
      } as Bookmark);
    });
    return items;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw new Error("Data could not be retrieved");
  }
};
