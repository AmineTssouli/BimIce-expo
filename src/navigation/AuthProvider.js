import React,{ createContext, useState } from 'react';
import { Alert } from 'react-native';
import { getAuth  ,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,sendPasswordResetEmail, signInAnonymously, sendEmailVerification} from 'firebase/auth';
import { doc, setDoc,getFirestore ,collection} from "firebase/firestore";




export const AuthContext = createContext();



export const AuthProvider = ({  children  }) => {
    const [user,setUser] = useState(null);
    const [err,setErr] = useState({});

    return (

        <AuthContext.Provider
        value ={{
            user,
            setUser,
            err,
            setErr,
            login : async (email,password) => {

                
                try {
                    const auth =  getAuth();
                    await signInWithEmailAndPassword(auth,email,password)
             

                      }
                
              
                catch(error) {
                    const auth =  getAuth();
                    console.log('auth',auth);
                
                  Alert.alert("Connection failed","Wrong  Email or Password, please try again!",);


                

                  setErr({
                    message :'Wrong  Email or password, please try again!',
                    input:'password',
                });

                
                 if (error.code === 'auth/user-not-found') {
                    console.log('No user corressponding to your email!');
                  }
                  if (error.code === 'auth/wrong-password') {
                    console.log('Invalid password');
 
                  }
            

                  
                }
            },
            guest: async() => {
              const auth = getAuth();
              await signInAnonymously(auth);

            },
            register : async (email,password,profession,fullname) => {
                setErr({});
                 try {
                    const auth = getAuth();
                    await createUserWithEmailAndPassword(auth,email,password)
                    .then( async() => {
                 
                      await sendEmailVerification(auth.currentUser).then(()=>{
                        console.log('Email was sent to you');
                        Alert.alert("Confirm your email","An Email was sent to you!",);
                        console.log('Email Verified :',auth.emailVerified);
                        const db = getFirestore();
                        const usersRef = collection(db, "Users");
                     
                         setDoc(doc(usersRef, auth.currentUser.uid), {
                            fullname: fullname,
                            email: email,
                            profession: profession,
                            userImg : '',
                            createdAt:new Date()
                      });
                
                        console.log('User added!');
                      }).catch((err)=> {
                        console.log("Email Couldn't be sent");
                      } )
                        

                    })
             
                }
            catch(error) {
                
                 if (error.code === 'auth/email-already-in-use') {
                    console.log('This email address is already in use!');
                    setErr({
                        message :'This email address is already in use!',
                        input:'email',
                    });
                  }
              
                  if (error.code === 'auth/invalid-email') {
                    console.log('This email address is invalid!');
                    setErr({
                        message :'This email address is invalid!',
                        input:'email',
                    });
                  } 
                  if (error.code === 'auth/weak-password') {
                    console.log('Password should be at least 6 characters!');
                    setErr({
                        message :'Password should be at least 6 characters!',
                        input:'password',
                    });

                  }
                  
               
                
            }
        }, logout : async () => {
                try {
                    const auth = getAuth();
                    await signOut(auth);
           }
           catch(e) {
               console.log(e);
           }
        }, 
         resetpassword : async (email) => {
           try {
            await sendPasswordResetEmail(email);            
           } catch (error) {
            console.log(error.message)
            
           }
         },
         sendVerificationAgain: async() => {
          try {
            const auth = getAuth();
            await sendEmailVerification(auth.currentUser);
            console.log('New Email was sent to you');
            Alert.alert("Confirm your email","An Email was sent to you!",);
            
          } catch (error) {
            console.log(error.code);
            
          }

         }
       
        }} >
            { children }

        </AuthContext.Provider>
    );
};