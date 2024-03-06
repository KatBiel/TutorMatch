const BACKEND_URL = "http://localhost:5000";

export const signup = async (firebase_id, name, email, status, safeguarding) => {
    const payload = {
        firebase_id: firebase_id,
        name: name,
        email: email,
        status: status,
        safeguarding: safeguarding
    };
    console.log(payload)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    };

    let response = await fetch(`${BACKEND_URL}/signup`, requestOptions);

    if (response.status === 201) {
        const data = await response.json();
        return data;
    } else {
        throw new Error (await response.json().then((data) => data.message));
    }
};

export const getUser = async (firebase_id, idToken) => {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${idToken}`
        }
    }

    try {
    let response = await fetch(`${BACKEND_URL}/users/${firebase_id}`, requestOptions);
    var data = await response.json()
    
    if (response.status === 200) {
        return data;
    } else {
        throw new Error('Error fetching user')
    }
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const addAvailability = async (firebase_id, idToken, startTime, endTime) => {

    const availabilityInHourSlots = [];
    let currentSlot = new Date(startTime);
    currentSlot.setMinutes(0, 0, 0);

    while (currentSlot < endTime) {
        const nextSlot = new Date(currentSlot);
        nextSlot.setHours(currentSlot.getHours() + 1);

        availabilityInHourSlots.push({
            start_time: new Date(currentSlot),
            end_time: new Date(nextSlot)
        });

        currentSlot.setHours(currentSlot.getHours() + 1);
    }

    const payload = {
        "availability": availabilityInHourSlots
    };
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(payload)
    }

    try {
        let response = await fetch(`${BACKEND_URL}/tutors/${firebase_id}/availability`, requestOptions);

        const data = await response.json()

        if (response.status === 201) {
            return data;
        } else {
            console.error("Error adding availability:", data.message);
            throw new Error(data.message);
        }
    } catch (error){
        console.error("Unexpected error:", error);
        throw error;
    }

}

<<<<<<< HEAD
export const addProfilePicture = async (firebase_id, profilePictureUrl) => {
    
    const payload = {
        "profilePictureUrl": profilePictureUrl
    };
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    try {
        let response = await fetch(`${BACKEND_URL}/users/${firebase_id}/profile-picture`, requestOptions);

        const data = await response.json()

        if (response.status === 201) {
            return data;
        } else {
            console.error("Error adding profile picture:", data.message);
            throw new Error(data.message);
        }
    } catch (error){
        console.error("Unexpected error:", error);
        throw error;
    }

=======
export const getPendingTutors = async(idToken) => {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${idToken}`
        }
    }

    try {
    let response = await fetch(`${BACKEND_URL}/pending`, requestOptions);
    var data = await response.json()
    
    if (response.status === 200) {
        return data;
    } else {
        throw new Error('Error fetching users')
    }
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const updatePendingTutor = async(idToken,firebase_id) => {
    const requestOptions = {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${idToken}`
        }
    }
    let response = await fetch(`${BACKEND_URL}/pending/${firebase_id}`, requestOptions);

    if (response.status === 204) {
        return;
    } else {
        throw new Error (await response.json().then((data) => data.message));
    }
    
>>>>>>> main
}
