import { useRef } from "react"
import JoinModal from "./JoinModal";
import CreateModal from "./CreateModal";

const HomePage = () => {

  const joinDialog = useRef();
  const createDialog = useRef();

return (
    <div className="HomePage-background">
      <div className="PhotoModal">
      <CreateModal ref={createDialog} />
      <JoinModal ref={joinDialog} />
      </div>
      <div className="HomePage">
        <img src="" alt="Animated girl" className="HomePage-photo"/>
        {/*<button type="button" onClick={handleShowModal} className="take-a-photo">Tag a friend</button>*/}
        <button type="button" onClick={() => createDialog.current.open()} className="take-a-photo">Create Group</button>
        <button type="button" onClick={() => joinDialog.current.open()} className="take-a-photo">Join Group</button>
      </div>
    </div>
  )
}

export default HomePage