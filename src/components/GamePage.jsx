import Wrapper from "./Wrapper"
import { useEffect, useRef, useState } from "react"
import PhotoModal from "./PhotoModal";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { profileCaptureIcon } from "./icons";

const GamePage = () => {
  const dialog = useRef();
  const [tagged, setTagged] = useState();
  const handleShowModal = () => {
    dialog.current.open();
   }

   const playersRef = collection(db, "players"); // Reference to the players collection in Firestore

   useEffect(() => {
    const queryPlayers = query(
      playersRef,
      where("tagged", "==", true)
    );
    
    const unsubscribe = onSnapshot(queryPlayers, (snapshot) => {
      const taggedPlayers = [];
      snapshot.forEach((doc) => {
        taggedPlayers.push(doc.data());
      });
      setTagged(taggedPlayers); // Set all tagged players
    });

    return () => unsubscribe();
  }, []);

  return (
    <Wrapper>
      <PhotoModal ref={dialog}/>
      <div className="flex flex-col justify-center items-center">
        <h2>{`${tagged} is Tagged`}</h2>
        {!tagged ? <p>{profileCaptureIcon}</p> : <img src={tagged} alt="" />}
        <button type="button" onClick={handleShowModal} className="take-a-photo">Tag a friend</button>
      </div>
    </Wrapper>
  )
}

export default GamePage
