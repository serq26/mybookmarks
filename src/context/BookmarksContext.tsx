import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { addItem, deleteItemById, getItems } from "../firebaseService";
import { Bookmark } from "../types/bookmark";

type BookmarkKey = keyof Bookmark;

type FilterType = {
  website: string | null;
};

interface BookmarksContextType {
  bookmarks: Bookmark[];
  loading: boolean;
  addBookmark: (
    title: string,
    description: string,
    link: string,
    website: string
  ) => Promise<Bookmark>;
  deleteBookmark: (title: string) => Promise<boolean>;
  filter: FilterType;
  filterBookmarks: (key: BookmarkKey, value: string) => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(
  undefined
);

export const BookmarksProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filter, setFilter] = useState<FilterType>({ website: null });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const response = await getItems();
        setBookmarks(response);
      } catch (err) {
        console.error("Error fetching bookmarks", err);
      } finally {
        setLoading(false);
      }
    };

    getBookmarks();
  }, []);

  const addBookmark = async (
    title: string,
    description: string,
    link: string,
    website: string
  ) => {
    return await addItem(title, description, link, website);
  };

  const deleteBookmark = async (documentId: string) => {
    return await deleteItemById(documentId);
  };

  const filterBookmarks = (key: BookmarkKey, value: string) => {
    setFilter({
      [key]: value,
    } as FilterType);
  };

  return (
    <BookmarksContext.Provider
      value={{
        addBookmark,
        bookmarks,
        loading,
        filterBookmarks,
        filter,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
};
