import { FilterType } from "./../context/BookmarksContext";
import { DocumentSnapshot } from "firebase/firestore";

export type Bookmark = {
  id: string;
  title: string;
  description: string;
  link: string;
  website: string;
  createdAt: string;
};

export interface BookmarkQueryParams {
  filter: FilterType;
  lastVisible?: DocumentSnapshot | null;
}
