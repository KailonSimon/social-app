import dayjs from "dayjs";
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, collection, query, getDocs, where, FieldPath, Firestore, documentId, getDoc, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "./firebase-config"
const postsRef = collection(db, "posts");
const usersRef = collection(db, "users");

/*const createPost = async (userID, text) => {
    const currentDate = dayjs().toJSON();
    const user = await findUser(userID);
    try {
        const docRef = await addDoc((postsRef), {
            displayName: "hey",
            username: "het",
            favorites: [],
            reposts: [],
            replies: [],
            text: text,
            date: currentDate,
            userID
        });
    } catch (error) {
        console.error(error);
    }
}*/

const deletePost = async (postID) => {
    await deleteDoc(doc(postsRef, postID))
    //TODO: delete from user instances
};
const getFeedPosts = () => {
    const posts = [];
    const q = query(collection(db, "posts"))
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const postInfo = doc.data();
            const post = {
                id: doc.id,
                userID: postInfo.userID,
                displayName: postInfo.displayName,
                username: postInfo.username,
                text: postInfo.text,
                favorites: postInfo.favorites,
                reposts: postInfo.reposts,
                replies: postInfo.replies,
                date: postInfo.date
            }
            posts.push(post);
        });
        console.log("Posts: ", posts);
    });
    return posts;
}
const findPost = async (postID) => {
    const postRef = doc(postsRef, postID);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
        //console.log("Document data:", postSnap.data());
        return postSnap.data();
    } else {
        //console.log("Document not found!");
        return;
    }
};
const findUser = async (userID) => {
    const userRef = doc(usersRef, userID);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        //console.log("Document data:", userSnap.data());
        return userRef;
    } else {
        //console.log("Document not found!");
        return;
    }
};
const getPostFavorites = async (postID) => {
    const favorites = await findPost(postID).then(post => {
        return post.favorites;
    });
    return favorites;
};
const getPostReposts = async (postID) => {
    const reposts = await findPost(postID).then(post => {
        return post.reposts;
    });
    return reposts;
};
const getUserFavorites = async (userID) => {
    const favorites = await findUser(userID).then(user => {
        if (user) {
            return user.favorites;
        } else {
            return null;
        }
    });
    return favorites
};
const getUserReposts = async (userID) => {
    const reposts = await findUser(userID).then(user => {
        if (user) {
            return user.reposts;
        } else {
            return null;
        }
    });
    return reposts
};
const isPostFavorited = async (postID, userID) => {
    const postFavorited = await getPostFavorites(postID).then(favorites => {
        if (favorites.find(user => user == userID)) {
            return true;
        } else {
            return false;
        }
    });
    return postFavorited;
};
const isPostReposted = async (postID, userID) => {
    const postReposted = await getPostReposts(postID).then(reposts => {
        if (reposts.find(user => user == userID)) {
            return true;
        } else {
            return false;
        }
    });
    return postReposted;
};
const handleFavorite = async (postID, userID) => {
    const userRef = await findUser(userID);
    //console.log("userRef:", userRef)
    const postRef = doc(postsRef, postID);
    const favorited = await isPostFavorited(postID, userID);
    if (!favorited) {
        await updateDoc(userRef, {
            favorites: arrayUnion(postID)
        });
        await updateDoc(postRef, {
            favorites: arrayUnion(userID)
        });
        //console.log("Favorited post!");
    } else {
        await updateDoc(userRef, {
            favorites: arrayRemove(postID)
        });
        await updateDoc(postRef, {
            favorites: arrayRemove(userID)
        });
        //console.log("Unfavorited post!")
    }
};
const handleRepost = async (postID, userID) => {
    const userRef = await findUser(userID);
    //console.log("userRef:", userRef)
    const postRef = doc(postsRef, postID);
    const reposted = await isPostReposted(postID, userID);
    if (!reposted) {
        await updateDoc(userRef, {
            reposts: arrayUnion(postID)
        });
        await updateDoc(postRef, {
            reposts: arrayUnion(userID)
        });
        //console.log("Reposted post!");
    } else {
        await updateDoc(userRef, {
            reposts: arrayRemove(postID)
        });
        await updateDoc(postRef, {
            reposts: arrayRemove(userID)
        });
        //console.log("Unreposted post!")
    }
};

export {
    getFeedPosts,
    findPost,
    findUser,
    deletePost,
    getPostFavorites,
    getPostReposts,
    getUserFavorites,
    getUserReposts,
    isPostFavorited,
    isPostReposted,
    handleFavorite,
    handleRepost
}