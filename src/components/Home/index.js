import { Component } from "react";
import Loader from "react-loader-spinner"
import UserCard from "../UserCard"

const apiStatusConstrant = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    loading: 'LOADING',
}

class Home extends Component {
  state = { userList: [],apiStatus: apiStatusConstrant.initial };

  componentDidMount() {
    this.getUserList();
  }
  


  getUserList = async () => {
    this.setState({apiStatus: apiStatusConstrant.loading})
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.ok) {
      const data = await response.json();
      const updatedData = data.map((each) => ({
        id: each.id,
        name: each.name,
        email: each.email, // Corrected the spelling here
        address: {
          street: each.address.street,
          suite: each.address.suite,
          city: each.address.city,
          zipcode: each.address.zipcode,
          geo: {
            lat: each.address.geo.lat,
            lng: each.address.geo.lng, // Fixed typo from 'ing' to 'lng'
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
      this.setState({ userList: updatedData,apiStatus: apiStatusConstrant.success });
    }
    else{
        this.setState({apiStatus: apiStatusConstrant.failure})
    }
  };
  onClickRetry = () => {
    this.getUserList()
  }

  renderSuccessView =()=>{
    const {userList}= this.state
    return (
        <div>
        <h1>Home Nikhil</h1>
        <ul>
          {userList.map((each) => (
            <UserCard key={each.id} user={each} />
          ))}
        </ul>
      </div>
    )
  }
  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="products-failure-img"
        alt="failure view"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="failure-btn" onClick={this.onClickRetry} type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  apiStatusCheck = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstrant.success:
        return this.renderSuccessView()
      case apiStatusConstrant.failure:
        return this.renderFailureView()
      case apiStatusConstrant.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
        <>
        <h1> Nikhil </h1>
        {this.apiStatusCheck()}
        </>
    )
  }
}

export default Home;
