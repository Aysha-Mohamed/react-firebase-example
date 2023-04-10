import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { googleProvider } from "../config/firebase";

export const Auth = () => {
  //keep track of submitted values.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log()

  //on sigin button click
  //async functio bcoz we are dealing with promises.
  const signIn = async () => {
    try{
        await createUserWithEmailAndPassword(auth,email,password);  
    }
    catch(err){
        console.error(err);
    }
    
  };


  //logout function

  const logout = async() =>{
    try{
        await signOut(auth)
    }
    catch(err){
        console.error(err);
    }
  }


  //sign in with google

  const signInWithGoogle = async() => {
    try{
        await signInWithPopup(auth,googleProvider)
    }
    catch(err){
        console.error(err);
    }
  }

  return (
    <div>
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
