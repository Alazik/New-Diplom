import React, { useState } from "react"
import { AuthAPI } from "../../api/api"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { database } from "../../firebase"


export const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [myId, setMyId] = useState(null)

  const getAuthUserData = async () => {
    let response = await AuthAPI.me();
    if (response.data.resultCode === 0) {
      let { id } = response.data.data;
      setMyId(id)
      console.log(id)
      return id
    }
  }
  const loginPostData = (uuid, f) => {
    (async () => {
      try {
        if (f) {
          // console.log(f)
          const uid = await getAuthUserData()
          let q = query(collection(database, 'posts'), where('userId', '==', uid))
        onSnapshot(q, (snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              userId: doc.id,
              message: doc.data().message,
              createdAt: doc.data().createdAt
            }))
          )
        })
        localStorage.setItem('id', uid)
        } else{
          let q = query(collection(database, 'posts'), where('userId', '==', uuid))
        onSnapshot(q, (snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              userId: doc.id,
              message: doc.data().message,
              createdAt: doc.data().createdAt
            }))
          )
        })
        localStorage.setItem('id', uuid)
        }
        
      } catch (error) {

      }
    })()
  }
  return (
    <AppContext.Provider value={{ posts, setPosts, myId, setMyId, getAuthUserData, loginPostData }}>
      {children}
    </AppContext.Provider>
  )
}