import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase-config"

const deletePost = async (postID) => {
    await deleteDoc(doc(db, "posts", postID))
};

export {
    deletePost
}