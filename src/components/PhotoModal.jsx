import { createPortal } from 'react-dom';
import { useImperativeHandle, forwardRef, useRef, useState } from 'react';
import { cancelIcon } from './icons';
import CameraSwitcher from './CameraSwitcher';


const PhotoModal = forwardRef(function PhotoModal({photoTaken}, ref) {

  const dialog = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  useImperativeHandle(ref, () => {
    return {
      open(){
       setIsOpen(true);
      },
      close(){
        setIsOpen(false);
      }
    }
  })

  
  return isOpen ? createPortal(
    <div className='h-full'>
      <dialog className="flex modal flex-col gap-2 rounded-lg
       bg-white h-4/5 w-[20rem] fixed max-w-3/4 mt-20 py-4 px-6" ref={dialog}>
        <div className="flex justify-between align-baseline">
        <button className='h-5 w-5' onClick={() => setIsFrontCamera(prev => !prev)}>
            <img src="/switch-camera.png" alt="" />
          </button>
          <div onClick={() => setIsOpen(false)} className="">
              {cancelIcon}
          </div>
        </div>
        <h1 className='text-center text-2xl font-ligth space-x-2 pt-2'>Take a Pic</h1>
        <div className='flex flex-col gap-4 justify-center align-center h-full pb-8'>
            <CameraSwitcher photoTaken={photoTaken} isFrontCamera={isFrontCamera} />
        </div>
      </dialog>
    </div>,
    document.getElementById('modal')
  ) : null;
})


export default PhotoModal;