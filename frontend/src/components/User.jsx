const UserProfile = (props) => {
    return (
        <article key={props.user.firebase_id}>
        {props.user.profilePicture ? (
            <img
            src={props.user.profilePicture}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
        ) : (
            <img
            src={props.defaultPicture} // Use the default picture URL directly
            alt="Default Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
        )}
        <br />
        Name: {props.user.name} <br />
        Email: {props.user.email}<br/>
        </article>
    );
    };

export default UserProfile;