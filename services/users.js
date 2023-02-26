import { auth, db } from "../config"
import { saveMediaToStorage } from "./random"

export const saveUserProfileImage = (image)=> new Promise((resolve,reject) =>{
    saveMediaToStorage(image, `profileImage/${auth.currentUser.uid}`).then((res) =>{
        db.collection('users')
        .doc(auth.currentUser.uid)
        .update({
            profilePic: res
        })
        .then(() => resolve())
        .catch(() => reject())
    })
})