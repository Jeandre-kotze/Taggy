import { collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from './firebase.js';
import { auth } from "./firebase.js";

const groups = collection(db, "groups");

// Create Group
export async function createGroup(groupName) {
    try {
        console.log("Group Name:", groupName);
        console.log(auth.currentUser.uid);
        if (auth.currentUser?.uid != null) {
            const docRef = await addDoc(groups, {
                groupName: groupName,
                groupCode: auth.currentUser.uid,  // Assuming you're using this as a unique identifier
                user: auth.currentUser.uid,
                access: true,  // Indicates group owner
                tagged: true,
            });
            console.log("Group created with ID: ", docRef.id);
            return {groupName: groupName, groupCode: docRef.id};
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Join Group
export async function joinGroup(groupName, id) {
    try {
        console.log("Group Name:", groupName);

        if (auth.currentUser?.uid != null) {
            await addDoc(groups, {
                groupName: groupName,
                groupCode: id,  // Reference to the existing group code
                user: auth.currentUser.uid,
                access: false,  // Access false means not the creator
                tagged: false,
            });
            alert("Group joined successfully");
        }
    } catch (e) {
        console.error("Error joining group: ", e);
    }
}

// Leave Group
export async function leaveGroup(groupId) {
    try {
        const groupDoc = doc(db, "groups", groupId);
        
        // Update the document to remove the user
        await updateDoc(groupDoc, {
            user: auth.currentUser.uid,
            access: false
        });
        console.log("User left the group.");
    } catch (e) {
        console.error("Error leaving group: ", e);
    }
}

// Delete Group
export async function deleteGroup(groupId) {
    try {
        const groupDoc = doc(db, "groups", groupId);
        const groupData = (await groupDoc.get()).data();
        
        // Check if the current user is the creator of the group
        if (groupData?.user === auth.currentUser?.uid) {
            await deleteDoc(groupDoc);
            console.log("Group deleted successfully.");
        } else {
            throw new Error("You are not the group creator, access not allowed");
        }
    } catch (e) {
        console.error("Error deleting group: ", e);
    }
}

    

