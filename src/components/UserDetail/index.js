// import { Component } from "react";
// import { Link } from "react-router-dom";
// import Loader from "react-loader-spinner";
// import "./index.css";

// const apiStatusConstrant = {
//   initial: "INITIAL",
//   success: "SUCCESS",
//   failure: "FAILURE",
//   loading: "LOADING",
// };

// class UserDetail extends Component {
//   state = { user: "", apiStatus: apiStatusConstrant.initial };

//   componentDidMount() {
//     this.getUserDetail();
//   }

//   getUserDetail = async () => {
//     this.setState({ apiStatus: apiStatusConstrant.loading });
//     const { match } = this.props;
//     const { params } = match;
//     const { id } = params;
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//     const data = await response.json();
//     if (response.ok) {
//       this.setState({ user: data, apiStatus: apiStatusConstrant.success });
//     } else {
//       this.setState({ apiStatus: apiStatusConstrant.failure });
//     }
//   };

//   renderSuccessView = () => {
//     const { user } = this.state;
//     const { name, email, address, phone, website, company } = user;

//     return (
//       <div className="user-detail-container">
//         <h1 className="user-detail-heading">User Details</h1>
//         <div className="user-detail-card">
//           <p className="user-detail-item">
//             <strong>Name:</strong> {name}
//           </p>
//           <p className="user-detail-item">
//             <strong>Email:</strong> {email}
//           </p>
//           <p className="user-detail-item">
//             <strong>Phone:</strong> {phone}
//           </p>
//           <p className="user-detail-item">
//             <strong>Company:</strong> {company?.name}
//           </p>
//           <p className="user-detail-item">
//             <strong>Website:</strong>{" "}
//             <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">
//               {website}
//             </a>
//           </p>
//         </div>
//         <Link to="/" className="go-back-link">
//           <button className="go-back-btn">Go Back</button>
//         </Link>
//       </div>
//     );
//   };

//   renderFailureView = () => (
//     <div className="error-view-container">
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
//         className="failure-img"
//         alt="failure view"
//       />
//       <h1 className="failure-heading">Oops! Something Went Wrong</h1>
//       <p className="failure-description">We cannot seem to find the page you are looking for.</p>
//       <button className="retry-btn" onClick={this.getUserDetail} type="button">
//         Retry
//       </button>
//     </div>
//   );

//   renderLoadingView = () => (
//     <div className="loader-container">
//       <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
//     </div>
//   );

//   apiStatusCheck = () => {
//     const { apiStatus } = this.state;
//     switch (apiStatus) {
//       case apiStatusConstrant.success:
//         return this.renderSuccessView();
//       case apiStatusConstrant.failure:
//         return this.renderFailureView();
//       case apiStatusConstrant.loading:
//         return this.renderLoadingView();
//       default:
//         return null;
//     }
//   };

//   render() {
//     return <div className="user-detail-page">{this.apiStatusCheck()}</div>;
//   }
// }

// export default UserDetail;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "./index.css";

const apiStatusConstrant = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiStatusConstrant.initial);

  const { id } = useParams(); // Extracting `id` from the route parameters

  useEffect(() => {
    const getUserDetail = async () => {
      setApiStatus(apiStatusConstrant.loading);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setApiStatus(apiStatusConstrant.success);
        } else {
          setApiStatus(apiStatusConstrant.failure);
        }
      } catch {
        setApiStatus(apiStatusConstrant.failure);
      }
    };

    getUserDetail();
  }, [id]);

  const renderSuccessView = () => {
    const { name, email, address, phone, website, company } = user;

    return (
      <div className="user-detail-container">
        <h1 className="user-detail-heading">User Details</h1>
        <div className="user-detail-card">
          <p className="user-detail-item">
            <strong>Name:</strong> {name}
          </p>
          <p className="user-detail-item">
            <strong>Email:</strong> {email}
          </p>
          <p className="user-detail-item">
            <strong>Phone:</strong> {phone}
          </p>
          <p className="user-detail-item">
            <strong>Company:</strong> {company?.name}
          </p>
          <p className="user-detail-item">
            <strong>Website:</strong>{" "}
            <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </p>
        </div>
        <Link to="/" className="go-back-link">
          <button className="go-back-btn">Go Back</button>
        </Link>
      </div>
    );
  };

  const renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">We cannot seem to find the page you are looking for.</p>
      <button className="retry-btn" onClick={() => window.location.reload()} type="button">
        Retry
      </button>
    </div>
  );

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  const apiStatusCheck = () => {
    switch (apiStatus) {
      case apiStatusConstrant.success:
        return renderSuccessView();
      case apiStatusConstrant.failure:
        return renderFailureView();
      case apiStatusConstrant.loading:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return <div className="user-detail-page">{apiStatusCheck()}</div>;
};

export default UserDetail;
