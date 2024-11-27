import { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DownloadIcon, TrashIcon } from "@heroicons/react/outline";
import SearchBar from "./SearchBar";
import Wrapper from "./Wrapper";
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from "@firebase/firestore";

const ShowPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [originalPhotos, setOriginalPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true); // Loading state for auth initialization
  const auth = getAuth();
  const storage = getStorage();

  const handleNewPhotos = (url) => {

    if(!url){
      setPhotos(originalPhotos);
      console.log(photos);
      return;
    }

    setPhotos(url);
  }

  useEffect(() => {
    const fetchPhotos = async (user) => {
      try {
        // Reference to the 'photos/{UID}' folder in Firebase Storage
        const photosRef = ref(storage, `photos/${user.uid}/`);

        // Get a list of all items (photos) in the 'photos/{UID}' directory
        const photoList = await listAll(photosRef);

        // Fetch the download URL for each photo
        const photoUrls = await Promise.all(
          photoList.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          })
        );

        setPhotos(photoUrls); // Store the URLs in the state
        setOriginalPhotos(photoUrls); // Store the original URLs for comparison
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    // Set up the authentication listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthLoading(false); // Authentication state is now determined
      if (user) {
        fetchPhotos(user);
      } else {
        console.warn("User is not logged in");
        setLoading(false); // Stop loading if no user is found
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [auth, storage]);

  if (authLoading || loading) {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-full bg-blue-50">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-600 mt-4 text-xl font-semibold">Loading...</p>
        </div>
    );
  }

  const handleDelete = async (imagePath) => {
    const imageRef = ref(storage, imagePath);
  
    try {
      await deleteDocumentsByUrl(imagePath);
      await deleteObject(imageRef); // Delete from Firebase Storage
      setPhotos(urls => urls.filter(url => url !== imagePath)); // Update state
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image.");
    }
  };

  const deleteDocumentsByUrl = async (url) => {
    const db = getFirestore();
    const user = auth.currentUser; // Assuming the user is logged in
    const userPhotosCollection = collection(db, `users/${user.uid}/photos`);
  
    try {
      // Query documents where "tags" array contains the specific value
      const q = query(userPhotosCollection, where("imageUrl", "==", url));
      const querySnapshot = await getDocs(q);
  
      // Iterate through the results and delete each document
      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, `users/${user.uid}/photos`, document.id));
        console.log(`Deleted document with ID: ${document.id}`);
      });
  
      console.log("Documents successfully deleted.");
    } catch (error) {
      console.error("Error deleting documents:", error);
      alert("Failed to delete documents.");
    }
  };
  
  return (
    <div className="px-12 bg-blue-50 min-h-screen w-full mt-3">
      <Wrapper title="Your Photos" position="relative">
      <SearchBar handleNewPhotos={(e) => handleNewPhotos(e)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {photos.length === 0 ? (
          <p className="text-xl text-center text-blue-500 col-span-full">No photos available.</p>
        ) : (
          photos.map((url, index) => {
            return (
              <div key={index} className="relative flex-col w-full">
                <div
                  className="absolute top-2 right-2 flex flex-col gap-1"
                >
                  <DownloadIcon className="text-white w-7 bg-slate-400 bg-opacity-40 rounded-md p-1" />
                  <TrashIcon className="w-7 p-1 text-red-600 bg-red-400 rounded-md bg-opacity-40" onClick={() => handleDelete(url)}/>
                </div>
                <a href={url}>
                  <img
                    src={url}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-60 object-cover rounded-lg shadow-lg"
                  />
                </a>
              </div>
            );
          })
        )}
      </div>
      </Wrapper>
    </div>
  );
};

export default ShowPhotos;
