import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import db from "./firebaseConfig";
import { firebaseTimestampToDate } from "./utils";
import { Bookmark, BookmarkQueryParams } from "./types/bookmark";
import { PAGINATION } from "./constants";

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

export const getItems = async (params?: BookmarkQueryParams | null) => {
  try {
    let q = query(collection(db, "items"), orderBy("createdAt", "desc"));

    // query filter
    const conditions = [];
    if (params?.filter.website && params?.filter.website !== "all") {
      conditions.push(where("website", "==", params?.filter.website));
    }

    // add all conditions for query filter
    if (conditions.length > 0) {
      q = query(q, ...conditions);
    }

    //for pagination
    q = query(q, limit(PAGINATION.ITEMS_PER_PAGE));

    if (params?.lastVisible) {
      q = query(q, startAfter(params?.lastVisible));
    }

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
    return {
      items,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
      hasMore: querySnapshot.docs.length === PAGINATION.ITEMS_PER_PAGE,
    };
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw new Error("Data could not be retrieved");
  }
};
