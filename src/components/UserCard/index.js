import { Link } from "react-router-dom";
import "./index.css";

const UserCard = (props) => {
  const { user } = props;
  const { id, name, email, address } = user;

  return (
    <Link to={`/user/${id}`} className="user-card">
      <div key={id} className="user-card-content">
        <h3 className="label">
          Name: <span className="value">{name}</span>
        </h3>
        <p className="label">
          Email: <span className="value">{email}</span>
        </p>
        <p className="label">
          City: <span className="value">{address.city}</span>
        </p>
      </div>
    </Link>
  );
};

export default UserCard;
