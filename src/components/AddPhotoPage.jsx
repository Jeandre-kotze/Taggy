import { useState, useRef } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Wrapper from "./Wrapper";

const AddPhotoPage = () => {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]); // Initialize as an empty array
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const tagRef = useRef();

  const storage = getStorage();
  const db = getFirestore();
  const auth = getAuth();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess(false); // Reset success state when selecting a new file
  };

  const handleTagsUpload = () => {
    const tagValue = tagRef.current.value.trim().toLowerCase(); // Get the input value and trim whitespace
    if (tagValue.length === 0) return; // Check if the input is empty

    setTags((prevTags) => [...prevTags, tagValue]); // Add new tag to the state
    tagRef.current.value = ''; // Clear the input field
  };

  const removeTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to upload images.");
      return;
    }

    setUploading(true);
    try {
      // Upload image to Firebase Storage under the user's UID
      const storageRef = ref(storage, `photos/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Save metadata (tags) to Firestore under the user's UID
      const userPhotosCollection = collection(db, `users/${user.uid}/photos`);
      await addDoc(userPhotosCollection, {
        imageUrl: downloadURL,
        tags: tags, // Store tags as an array
        uploadedAt: new Date(),
      });

      setSuccess(true);
      setFile(null);
      setTags([]); // Reset tags to an empty array
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Wrapper title="Uploads" position="fixed">
    <div className="flex flex-col items-center p-3 max-w-md mx-auto mb-2 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Upload an Image</h1>
      <label className="w-full text-left px-2 py-1 text-lg font-medium" htmlFor="">
        Input Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm 
         border focus:ring-2 rounded-3xl file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
      />
      <label className="w-full text-left px-2 py-1 text-lg font-medium" htmlFor="">
        Add tags to image
      </label>
      <div className="flex mb-4 w-full">
        <input
          type="text"
          ref={tagRef}
          placeholder="Enter tags"
          className="w-full px-2 py-2 border rounded-l-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          className="border px-3 rounded-r-md text-white bg-indigo-600 hover:bg-indigo-500"
          onClick={handleTagsUpload}
        >
          Add
        </button>
      </div>
      <ul className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <li
            key={`${tag}-${index}`}
            className="py-1 px-3 bg-indigo-500 text-white rounded-lg shadow-sm flex items-center gap-2"
          >
            {tag}
            <button
              onClick={() => removeTag(index)} // Define removeTag function to handle deletion
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleUpload}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
          uploading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
        }`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {success && (
        <p className="mt-4 text-green-600 font-semibold">Image uploaded successfully!</p>
      )}
    </div>
    </Wrapper>
  );
};

export default AddPhotoPage;
