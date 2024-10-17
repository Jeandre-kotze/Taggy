import { useState, useRef, useCallback } from 'react';
import { cameraIcon } from './icons';
import PropTypes from 'prop-types';
import Webcam from "react-webcam";

// eslint-disable-next-line react/prop-types
const CameraSwitcher = ({isFrontCamera, photoTaken}) => {
  const [photo, setPhoto] = useState(null); // Store the captured photo
  const videoRef = useRef(null);

  // Function to start the camera
  

  function handleSubmitPhoto(){
    try{
      if(photo != null){
        photoTaken(photo);
        console.log("Photo taken");
        setPhoto(null);
      } else {
        alert("No photo captured");
      }
    } catch(err){
      console.error(err)
    }
  }

  const videoConstraints = {
    facingMode: isFrontCamera? 'user' : 'environment',
  }

  const takePhoto = useCallback(() => {
      const screenshot = videoRef.current.getScreenshot();
      setPhoto(screenshot);
  }, [])

  return (
    <div>
      {!photo &&
      <div>
         <Webcam
          ref={videoRef}
          videoConstraints={videoConstraints}
        />
        <h2 
        className='outline outline-2 p-1 rounded-lg mt-8 hover:pointer flex justify-center '
        onClick={takePhoto}
        >{cameraIcon}</h2>
      </div>
      }


      {/* Display the captured photo */}
      {photo && (
        <div>
          <img src={photo} alt="Captured image" />
          <h2 
          className='outline outline-2 p-1 rounded-lg mt-8 hover:pointer flex justify-center hover:cursor-pointer'
          onClick={() => handleSubmitPhoto}
          >Submit</h2>
          <h2 
          className='outline outline-2 p-1 rounded-lg mt-8 hover:pointer flex justify-center hover:cursor-pointer'
          onClick={() => setPhoto(false)}
          >Retake Photo</h2>
        </div>
      )}
    
    </div>
  );
};

CameraSwitcher.propTypes = {
  isFrontCamera: PropTypes.bool.isRequired,
};


export default CameraSwitcher;
