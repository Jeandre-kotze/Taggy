import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getAuth, signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../store/LoginSlice";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const SidebarItem = ({ icon, text, link, color }) => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      dispatch(setLoggedIn(false));
      navigate("/"); // Redirect to home page after signing out
      console.log("Signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const baseClasses = `rounded-md flex gap-4 px-2 py-1 w-full items-center transition-all`;
  const colorClasses = `text-${color}-800 hover:bg-${color}-100`;

  if (link === "none") {
    return (
      <button
        onClick={handleSignOut}
        className={`${baseClasses} ${colorClasses}`}
        aria-label={`Sign out: ${text}`}
      >
        {icon}
        <h1 className="text-lg whitespace-nowrap">{text}</h1>
      </button>
    );
  }

  return (
    <Link
      to={link}
      className={`${baseClasses} ${colorClasses}`}
      aria-label={`Navigate to ${text}`}
    >
      {icon}
      <h1 className="text-lg whitespace-nowrap">{text}</h1>
    </Link>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.node.isRequired, // Allow JSX or string for the icon
  text: PropTypes.string.isRequired, // Text label for the item
  link: PropTypes.string.isRequired, // Route or "none" for non-linkable items
  color: PropTypes.string.isRequired, // Tailwind color classes
};

export default SidebarItem;
