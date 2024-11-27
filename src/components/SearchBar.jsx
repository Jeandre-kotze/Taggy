import { SearchIcon } from '@heroicons/react/solid';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '../config/firebase';
import { useRef } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ handleNewPhotos }) => {
    const inputRef = useRef();

    const handleSubmit = async () => {
        const tag = inputRef.current.value.trim().toLowerCase();
        if (tag === '') {
            handleNewPhotos(null);
        }

        try {
            const result = await fetchImagesByTag(tag);
            console.log(result);
            handleNewPhotos(result); // Update parent with the result
        } catch (error) {
            console.error("Error in handleSubmit:", error);
        }
    };

    const fetchImagesByTag = async (tag) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error("No authenticated user found.");
            return [];
        }

        if(tag === '') {
            return null;
        }

        const userPhotosCollection = collection(db, `users/${user.uid}/photos`);

        try {
            // Query Firestore to find documents with the specific tag
            const q = query(userPhotosCollection, where("tags", "array-contains", tag));
            const querySnapshot = await getDocs(q);
            // Extract image URLs from the query results
            const imageUrls = querySnapshot.docs.map((doc) => doc.data().imageUrl);

            return imageUrls; // Return the array of image URLs
        } catch (error) {
            console.error("Error fetching images by tag:", error);
            return [];
        }
    };

    return (
        <div className="flex items-center justify-center w-full max-w-md mx-auto bg-white p-1 rounded-lg shadow-md border border-blue-200 mb-6 mt-3">
            <input
                type="text"
                className="w-full p-2 text-lg text-blue-600 rounded-l-lg focus:outline-none"
                placeholder="Search by tags..."
                ref={inputRef}
            />
            <button
                type="button"
                className="p-2.5 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onClick={handleSubmit}
            >
                <SearchIcon className="w-5 h-5 text-white" />
            </button>
        </div>
    );
};

SearchBar.propTypes = {
    handleNewPhotos: PropTypes.func,
}

export default SearchBar;
