import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Wrapper = ({children, title, position}) => {

    const [activeBell, setActiveBell] = useState(false);

  return (
    <div>
      <div className={`${position} flex justify-between items-center w-full top-0 left-0 px-2 sm:px-4 text-white z-10 mt-1 py-2`}>
          <Sidebar/>
        <Link to="/">
          <h1 className="text-3xl font-bold text-center text-blue-800">{title}</h1>
        </Link>
        <div className="bellIcon w-7 h-7" onClick={() => setActiveBell(!activeBell)}>
          {/*activeBell ? <BellIcon enableBackground={toolbar} className="w-7 h-7 text-blue-500"/> : <BellIcon enableBackground={true} className="w-7 h-7 text-blue-500"/>*/}
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Wrapper