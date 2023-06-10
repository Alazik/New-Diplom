import React, { useState } from "react"
import { AuthAPI, profileAPI } from "../../api/api"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { database } from "../../firebase"


export const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [myId, setMyId] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [nick, setNick] = useState(null)
  const getAuthUserData = async () => {
    let response = await AuthAPI.me();
    
    if (response.data.resultCode === 0) {
      let { id } = response.data.data;
      setMyId(id)
      
      let data = await profileAPI.getProfile(id)
      
      setPhoto(data.data.photos.large)
      setNick(data.data.fullName)
      
      return id
    }
  }

  
  const loginPostData = (uuid, f) => {
    (async () => {
      try {
        if (f) {
  
          const uid = await getAuthUserData()
          let q = query(collection(database, 'posts'), where('userId', '==', uid),orderBy('createdAt'))
        onSnapshot(q, (snapshot) => {
          setPosts(
            snapshot.docs.reverse().map((doc) => ({
              userId: doc.id,
              message: doc.data().message,
              createdAt: doc.data().createdAt,
              image: doc.data().image,
              avatar: doc.data().avatar,
              nick: doc.data().nick
            }))
          )
        })
        localStorage.setItem('id', uid)
        } else{
          let q = query(collection(database, 'posts'), where('userId', '==', uuid), orderBy('createdAt'))
        onSnapshot(q, (snapshot) => {
          setPosts(
            snapshot.docs.reverse().map((doc) => ({
              userId: doc.id,
              message: doc.data().message,
              createdAt: doc.data().createdAt,
              image: doc.data().image,
              avatar: doc.data().avatar,
              nick: doc.data().nick
            }))
          )
        })
        localStorage.setItem('id', uuid)
        }
        
      } catch (error) {

      }
    }
    )()
  }
  return (
    <AppContext.Provider value={{ posts, setPosts, myId, setMyId, getAuthUserData, loginPostData, photo, nick }}>
      {children}
    </AppContext.Provider>
  )
}