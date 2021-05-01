import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB4zemtnDjniVrayEhIYPQlaDw8t-v3nKs",
  authDomain: "todo-ts-redux-firebase.firebaseapp.com",
  projectId: "todo-ts-redux-firebase",
  storageBucket: "todo-ts-redux-firebase.appspot.com",
  messagingSenderId: "189740588475",
  appId: "1:189740588475:web:36f23945cb58884315f89e",
  measurementId: "G-PJD6Z7328F"
}

firebase.initializeApp( firebaseConfig )

export const firestore = firebase.firestore()
export const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup( provider )
export const signOut = () => auth.signOut()

export const createUserProfile = async ( authObject: any, additionalData: any ) => {
  if( !authObject ) return;

  const userRef = firestore.doc(`users/${ authObject.uid }/`)
  const userSnapshot = await userRef.get()

  if( !userSnapshot.exists ) {
    // @ts-ignore
    const { displayName, email } = authObject;
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch( error ) {
      console.error("Error adding user to database: ", error)
    }
  }

  return userRef
}

export const createUserTodos = async ( authObject: any ) => {
  if( !authObject ) return;

  const todoRef = firestore.doc(`todos/${ authObject.uid }/`)
  const todoSnapshot = await todoRef.get()

  if( !todoSnapshot.exists ) {
    const createdAt = new Date()

    try {
       todoRef.set({
         createdAt
       })

       const todosDocsRef = todoRef.collection('docs')

      await todosDocsRef.add({
        title: "Sample todo",
        desc: "Sample description"
      })

    } catch( error ) {
      console.error("Issue creatnig todo document for user: ", error)
    }
  }
}

export default firebase