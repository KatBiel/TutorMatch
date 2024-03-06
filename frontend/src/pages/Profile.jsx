import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, storage, storageRef } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../components/authContext";
import { getUser } from "../services/users";
import { searchSubjects } from "../services/subjects";
import { AddSubject } from "../components/AddSubject";
import { AddAvailability } from "../components/AddAvailability";
import UserProfile from "../components/User";
import ProfileSubjects from "../components/ProfileSubjects";
import axios from 'axios';
import { addProfilePicture } from "../services/users";


const DEFAULT_PFP = "https://res.cloudinary.com/dzkvzncgr/image/upload/v1707228333/ph2p8wvxud1qbsqqfxqk.png";

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuth()
    const handle = useParams()
    const firebase_id = handle.id
    const [userDetails, setUserDetails] = useState({})
    const [image, setImage] = useState(null)

    const [gcse, setGcse] = useState([])
    const [alevel, setAlevel] = useState([])
    console.log("user")
    console.log(user)
    const gcseQueryParams = {
        "firebaseId": firebase_id,
        "grade": "gcse"
    }
    const alevelQueryParams = {
        "firebaseId": firebase_id,
        "grade": "alevel"
    }

    const minDate = new Date();
    const maxDate = new Date("01/01/2025 01:00 AM");
    const dateValue = new Date()


    useEffect(() => {
        getUser(firebase_id)
            .then((data) => {
                setUserDetails(data.user)
            })
            .catch((err) => {
                console.log(err);
                navigate("/login");
            });
        searchSubjects(gcseQueryParams)
            .then((data) => {
                //console.log(data)
                //console.log(data.result[0].name)
                setGcse(data.result)
            })
            .catch((err) => {
                console.log(err);
            })
        searchSubjects(alevelQueryParams)
            .then((data) => {
                //console.log(data)
                setAlevel(data.result)
            })
            .catch((err) => {
                console.log(err);
            })
    },[]);


    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    
    const handleUpload = async () => {
        if (image) {
            const imageRef = ref(storage, `profile-images/${image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image);
            // Event listeners:
            // When you perform an upload or download operation, Firebase Storage provides you with a snapshot object that allows you to monitor the progress of the task and handle various events related to it.
            uploadTask.on('state_changed',
                (snapshot) => {
                    console.log('Uploaded file succesfully')
                },
                (error) => {
                    console.log(error);
                },
                );
            try {
                await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    setUserDetails((prevDetails) => ({
                        ...prevDetails,
                        profilePicture: downloadURL,
                    }));
                    const result = await addProfilePicture(firebase_id, downloadURL)
                    console.log(result)
                })
            } catch (error) {
                console.log(error);
            }
    };
    }


    return(
        <>
        <div className = "container-fluid">
            <div className = "row justify-content-center mt-3">
                <div className = "col-md-4 text-center">
        {userDetails.status === "Tutor" && <h2>Tutor Details</h2> }
        {userDetails.status === "Student" && <h2>Student Details</h2>}
        <div className = "profile">
            <UserProfile user = {userDetails} defaultPicture = {DEFAULT_PFP}/>
        </div>
        {userDetails.status === "Tutor" &&
        <ProfileSubjects gcse = {gcse} alevel = {alevel} />}
        </div>
        </div>
        </div>


        {user.uid === firebase_id && userDetails.status === "Tutor" && <div className = "addSubject">
            <AddSubject firebaseId={firebase_id} />
        </div>}

       {user.uid === firebase_id && userDetails.status === "Tutor" && <div className="add-availability">
            <AddAvailability firebaseId = {firebase_id}/>
        </div> }

        {user.uid === firebase_id && (
        <div>
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
        </>
    )    
}


export default Profile;