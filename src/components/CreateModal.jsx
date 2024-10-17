import { createPortal } from 'react-dom';
import { useImperativeHandle, forwardRef, useRef, useState } from 'react';
import { createGroup } from '../config/firebaseActions.js';
import { useNavigate } from 'react-router-dom';

const CreateModal = forwardRef(function CreateModal(props, ref) {
  const dialog = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const name = useRef();
  const navigate = useNavigate();

  // Function to handle creating a group
  async function handleCreate() {
    const groupName = name.current.value.trim(); // Get the group name value and trim any spaces
    if (!groupName) {
      alert('Group name cannot be empty.');
      return;
    }

    try {
      const createdGroup = await createGroup(groupName); // Pass the group name to createGroup
      setIsOpen(false); // Optionally close the modal after successful creation
      navigate(`/group/${createdGroup.groupName}/${createdGroup.groupCode}`);
      // Add any additional success handling if needed (like clearing the input)
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    }
  }

  // Imperative handle to control the modal from the parent component
  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
  }));

  return isOpen
    ? createPortal(
        <dialog
          className="flex modal flex-col gap-2 rounded-lg bg-white h-4/5 w-[20rem] fixed max-w-3/4 mt-20 py-4 px-6 text-black"
          ref={dialog}
        >
          <h1 className="w-full text-center">Create Group</h1>
          <label htmlFor="groupName">Group Name</label>
          <input
            type="text"
            id="groupName"
            ref={name}
            className="outline outline-2"
            placeholder="Enter group name"
          />
          <button onClick={handleCreate} className="btn-primary">
            Create
          </button>
        </dialog>,
        document.getElementById('modal')
      )
    : null;
});

export default CreateModal;
