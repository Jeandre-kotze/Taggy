import { createPortal } from 'react-dom';
import { useImperativeHandle, forwardRef, useRef, useState } from 'react';
import { joinGroup } from '../config/firebaseActions.js';

const JoinModal = forwardRef(function JoinModal(props, ref) {
  const dialog = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const nameRef = useRef();  // Renamed for clarity
  const codeRef = useRef();

  async function handleJoin() {
    const groupName = nameRef.current.value;
    const groupCode = codeRef.current.value;

    try {
      await joinGroup(groupName, groupCode);  // Await the joinGroup call
      setIsOpen(false);  // Close modal on successful join
    } catch (error) {
      console.error("Error joining group: ", error);
    }
  }

  // Methods for opening and closing the modal via ref
  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    }
  }));

  return isOpen ? createPortal(
    <div className="h-full">
      <dialog className="flex modal flex-col gap-2 rounded-lg bg-white h-4/5 w-[20rem] fixed max-w-3/4 mt-20 py-4 px-6 text-black" ref={dialog}>
        <h1 className="w-full text-center">Join Group</h1>
        <label htmlFor="groupName">Group Name</label>
        <input type="text" ref={nameRef} id="groupName" className="outline outline-2" />
        <label htmlFor="groupCode">Group Code</label>
        <input type="text" ref={codeRef} id="groupCode" className="outline outline-2" />
        <button onClick={handleJoin}>Submit</button>
      </dialog>
    </div>,
    document.getElementById('modal')
  ) : null;
});

export default JoinModal;
