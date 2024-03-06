const UserProfile = (props) => {
    return (
        
        <article key = {props.user.firebase_id}>
            Name: {props.user.name} <br/>
            Email: {props.user.email}<br/>
            About Me: {props.user.bio}
        </article>
        
    )
}
export default UserProfile