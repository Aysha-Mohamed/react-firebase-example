import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db,auth,storage } from "./config/firebase";
import { getDocs, collection, addDoc,deleteDoc,doc, updateDoc } from "firebase/firestore";
import { ref,uploadBytes } from "firebase/storage";

function App() {
  //state to track dramas
  const [dramaList, setdramaList] = useState([]);

  // we are going to create states to store new drama details.
  const [newDramaTitle, setNewDramaTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewDramaSeoulAward, setIsNewDramaSeoulAward] = useState(false);

  //update drama title state.
  const [updateTitle,setUpdateTitle] = useState("");


  ///file upload state
  const [fileUpload,setFileUpload] = useState(null);

  //collection(db,key-which is equal to the collection name).

  const kdramasCollectionRef = collection(db, "Kdramas");

  //to get dramalist
  //when getting into website you have to get the dramalist , so useEffect hook is used.


  const getDramaList = async () => {
    //read the data - you can use getDocs function from firestore.
    //to get one , you can use getDoc
    //set the drama list

    //inside getDocs you have send which cllection you want.
    //for that firestore has a function collection()
    //collection(db,key-which is equal to the collection name).
    try {
      const data = await getDocs(kdramasCollectionRef);
      // this "data" has many unwanted details. To get the desired output,
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      //now set the data.
      setdramaList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };



  const deleteDrama = async (id) =>{

    const dramaDoc = doc(db,"Kdramas",id)
    await deleteDoc(dramaDoc);

  }


  const updateTitleHandler = async(id) =>{
    const dramaDoc = doc(db,"Kdramas",id);
    await updateDoc(dramaDoc,{title : updateTitle});
  }

  const uploadFileHandler = async ()=>{
    //create a file in firebase called "projectFiles."
    if(!fileUpload) return;
    const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef,fileUpload); //this will uploa file in firestore
    }
    catch(err){
      console.log(err);
    }
    
  }

  useEffect(() => {
    getDramaList();
  }, [dramaList]);

  // function while submitting new drama

  const handleNewDramaSubmit = async () => {
    //addDoc from firebase is used to add a doc . first parameter should be the collection and then the data
    try {
      await addDoc(kdramasCollectionRef, {
        title: newDramaTitle,
        releaseDate: newReleaseDate,
        receivedSeoulAward: isNewDramaSeoulAward,
        userId: auth?.currentUser?.uid,
      });

      getDramaList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />

      {/* create a new drama  */}
      <div>
        <h4>Add New Drama</h4>
        <input
          placeholder="Drama Title"
          onChange={(e) => setNewDramaTitle(e.target.value)}
        />
        <input
          placeholder="Release Year"
          type="number"
          onChange={(e) => Number(setNewReleaseDate(e.target.value))}
        />
        <input
          type="checkbox"
          onChange={(e) => setIsNewDramaSeoulAward(e.target.checked)}
        />
        <label>Received Seoul Award</label>
        <br />
        <br />
        <button onClick={handleNewDramaSubmit}>Submit Drama</button>
      </div>

      {/* drama list */}
      <div>
        {dramaList.map((drama) => (
          <div key={drama.id}>
            <h1 style={{ color: drama.receivedSeoulAward ? "green" : "red" }}>
              {drama.title}
            </h1>
            <p>Date: {drama.releaseDate}</p>
            <button onClick={()=>deleteDrama(drama.id)}>Delete Drama</button>
            <input placeholder="new title" onChange={(e)=>setUpdateTitle(e.target.value)}/>
            <button onClick={()=>updateTitleHandler(drama.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFileHandler}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
