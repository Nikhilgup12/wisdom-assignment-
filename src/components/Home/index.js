
// import { Component } from "react";
// import Loader from "react-loader-spinner";
// import UserCard from "../UserCard";
// import "./index.css";

// const apiStatusConstrant = {
//   initial: "INITIAL",
//   success: "SUCCESS",
//   failure: "FAILURE",
//   loading: "LOADING",
// };

// class Home extends Component {
//   state = {
//     userList: [],
//     searchInput: "",
//     sortOrder: "default", // Sort order state
//     apiStatus: apiStatusConstrant.initial,
//   };

//   componentDidMount() {
//     this.getUserList();
//   }

//   getUserList = async () => {
//     this.setState({ apiStatus: apiStatusConstrant.loading });
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     if (response.ok) {
//       const data = await response.json();
//       const updatedData = data.map((each) => ({
//         id: each.id,
//         name: each.name,
//         email: each.email,
//         address: {
//           street: each.address.street,
//           suite: each.address.suite,
//           city: each.address.city,
//           zipcode: each.address.zipcode,
//           geo: {
//             lat: each.address.geo.lat,
//             lng: each.address.geo.lng,
//           },
//         },
//         phone: each.phone,
//         website: each.website,
//         company: {
//           name: each.company.name,
//           catchPhrase: each.company.catchPhrase,
//           bs: each.company.bs,
//         },
//       }));
//       this.setState({
//         userList: updatedData,
//         apiStatus: apiStatusConstrant.success,
//       });
//     } else {
//       this.setState({ apiStatus: apiStatusConstrant.failure });
//     }
//   };

//   onClickRetry = () => {
//     this.getUserList();
//   };

//   onSearchInput = (event) => {
//     this.setState({ searchInput: event.target.value });
//   };

//   onSortChange = (event) => {
//     this.setState({ sortOrder: event.target.value });
//   };

//   getFilteredAndSortedUsers = () => {
//     const { searchInput, userList, sortOrder } = this.state;

//     let filteredUsers = userList.filter((each) =>
//       each.name.toLowerCase().includes(searchInput.toLowerCase())
//     );

//     if (sortOrder === "asc") {
//       filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortOrder === "desc") {
//       filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
//     }

//     return filteredUsers;
//   };

//   renderSuccessView = () => {
//     const { searchInput, sortOrder } = this.state;
//     const filteredUsers = this.getFilteredAndSortedUsers();

//     return (
//       <div className="home-success-view">
//         <div className="filters-container">
//           <input
//             type="search"
//             placeholder="Search by name"
//             onChange={this.onSearchInput}
//             value={searchInput}
//             className="search-input"
//           />
//           <select
//             onChange={this.onSortChange}
//             value={sortOrder}
//             className="sort-dropdown"
//           >
//             <option value="default">Sort by</option>
//             <option value="asc">Name (A-Z)</option>
//             <option value="desc">Name (Z-A)</option>
//           </select>
//         </div>
//         {filteredUsers.length === 0 ? (
//           <div className="no-users-container">
//             <h1 className="no-users-text">No Users Found</h1>
//           </div>
//         ) : (
//           <ul className="user-list">
//             {filteredUsers.map((each) => (
//               <UserCard key={each.id} user={each} />
//             ))}
//           </ul>
//         )}
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
//       <p className="failure-description">
//         We cannot seem to find the page you are looking for.
//       </p>
//       <button
//         className="retry-btn"
//         onClick={this.onClickRetry}
//         type="button"
//       >
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
//     return <div className="home-container">{this.apiStatusCheck()}</div>;
//   }
// }

// export default Home;


import React, { useState, useEffect, useCallback } from "react";
import Loader from "react-loader-spinner";
import UserCard from "../UserCard";
import "./index.css";

const apiStatusConstrant = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const Home = () => {
  const [userList, setUserList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [apiStatus, setApiStatus] = useState(apiStatusConstrant.initial);

  const getUserList = useCallback(async () => {
    setApiStatus(apiStatusConstrant.loading);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (response.ok) {
        const data = await response.json();
        const updatedData = data.map((each) => ({
          id: each.id,
          name: each.name,
          email: each.email,
          address: {
            street: each.address.street,
            suite: each.address.suite,
            city: each.address.city,
            zipcode: each.address.zipcode,
            geo: {
              lat: each.address.geo.lat,
              lng: each.address.geo.lng,
            },
          },
          phone: each.phone,
          website: each.website,
          company: {
            name: each.company.name,
            catchPhrase: each.company.catchPhrase,
            bs: each.company.bs,
          },
        }));
        setUserList(updatedData);
        setApiStatus(apiStatusConstrant.success);
      } else {
        setApiStatus(apiStatusConstrant.failure);
      }
    } catch (error) {
      setApiStatus(apiStatusConstrant.failure);
    }
  }, []);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  const onSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const onSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const getFilteredAndSortedUsers = () => {
    let filteredUsers = userList.filter((each) =>
      each.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (sortOrder === "asc") {
      filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filteredUsers;
  };

  const renderSuccessView = () => {
    const filteredUsers = getFilteredAndSortedUsers();

    return (
      <div className="home-success-view">
        <div className="filters-container">
          <input
            type="search"
            placeholder="Search by name"
            onChange={onSearchInput}
            value={searchInput}
            className="search-input"
          />
          <select
            onChange={onSortChange}
            value={sortOrder}
            className="sort-dropdown"
          >
            <option value="default">Sort by</option>
            <option value="asc">Name (A-Z)</option>
            <option value="desc">Name (Z-A)</option>
          </select>
        </div>
        {filteredUsers.length === 0 ? (
          <div className="no-users-container">
            <h1 className="no-users-text">No Users Found</h1>
          </div>
        ) : (
          <ul className="user-list">
            {filteredUsers.map((each) => (
              <UserCard key={each.id} user={each} />
            ))}
          </ul>
        )}
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
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" onClick={getUserList} type="button">
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

  return <div className="home-container">{apiStatusCheck()}</div>;
};

export default Home;
