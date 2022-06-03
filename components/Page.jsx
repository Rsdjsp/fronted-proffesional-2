import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../config/firebase";
import { login, logout } from "../features/auth";

export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authResult) => {
      if (authResult) {
        dispatch(
          login({
            id: authResult.uid,
            name: authResult.name,
            email: authResult.email,
            profilePic: authResult.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  },[dispatch]);
  return <div>Page</div>;
}
