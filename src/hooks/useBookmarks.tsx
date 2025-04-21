import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
};
