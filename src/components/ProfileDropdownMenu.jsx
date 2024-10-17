import { useState } from "react"
import { profileIcon } from "./icons"
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// eslint-disable-next-line react/prop-types
const ProfileDropdownMenu = ({changeIsAuth}) => {

    const [showDropdown, setShowDropdown] = useState(false);

    async function handleSignOut(){
      try{
        await signOut(auth);
        cookies.remove("auth-token");
        changeIsAuth(false);
      } catch(err){
        console.error("Failed to sign out", err);
        // Handle the error appropriately, such as showing an error message to the user.
      }
    }

  return (
    <>
        <div onClick={() => setShowDropdown(prev => !prev)}>
            {profileIcon}
        </div>
        {showDropdown && 
            <div className="w-full fixed left-0 top-0 h-full bg-transparent flex ">
              <aside className="flex flex-col hover:cursor-pointer bg-white h-full
              w-40 text-black items-center rounded-lg p-3 ease-linear transition-all" value="">
                <Link to="/">Home</Link>
                <Link to="/store">Store</Link>
                <div onClick={handleSignOut}>Sign Out</div>
                <div onClick={() => setShowDropdown(prev => !prev)}>Cancel</div>
              </aside>
            </div>
        }
    </>
  )
}

export default ProfileDropdownMenu