import { Component } from "react";
import Loader from "react-loader-spinner"

const apiStatusConstrant = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    loading: 'LOADING',
}

class UserDetail extends Component{
    state = {user:"",apiStatus: apiStatusConstrant.initial} 
    componentDidMount(){
        this.getUserDetail()
    }

    getUserDetail=async ()=>{
        this.setState({apiStatus: apiStatusConstrant.loading})
        const {match}= this.props
        const {params} = match 
        const {id} = params 
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        const data = await response.json() 
        if (response.ok){
            this.setState({user:data,apiStatus: apiStatusConstrant.success,})

        }
        else{
            this.setState({apiStatus: apiStatusConstrant.failure})
        }
    }
    
    renderSuccessView=()=>{
        const {user}= this.state
        return (
            <>
            <div>
                <h1> {user.email}</h1>
            </div>
            </>
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

    render(){
       
        return (
           <>
           <div>
            {this.apiStatusCheck()}
           </div>
           </>
        )
    }
}

export default UserDetail