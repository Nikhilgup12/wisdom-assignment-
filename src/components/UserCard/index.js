import {Link} from "react-router-dom"
import "./index.css" 

const UserCard=(props)=>{
    const {user} = props
    const {
        id,
        name,
        email,
        address,
        phone,
        website,
        company
    } = user
    return (
        <>
        <Link to={`/user/${id}`}>
        <li>
            <h1>{name} </h1>
        </li>
        </Link>
       
        </>
    )
}

export default UserCard