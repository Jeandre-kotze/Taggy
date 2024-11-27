import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
const HomePage = () => {

return (
    <div className="w-full h-full relative">
      <div className="flex gap-3 flex-col mt-2 w-full h-full items-center justify-center">
      <img src="/taggiLogo.webp" alt="Animated girl" className="HomePage-photo"/>
        {/*<button type="button" onClick={handleShowModal} className="take-a-photo">Tag a friend</button>*/}
        <Link to={"photo/show/" +  auth?.currentUser?.uid}>
          <button className="font-semibold text-lg hover:text-white hover:bg-blue-500 w-60 h-12 rounded-lg outline outline-3 outline-blue-500 text-blue-500">My Library</button>
        </Link>
        <Link to={"photo/add/" + auth?.currentUser?.uid}>
          <button className="font-semibold  text-lg hover:text-white hover:bg-blue-500 w-60 h-12 rounded-lg outline outline-3 outline-blue-500 text-blue-500">Quick add</button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage