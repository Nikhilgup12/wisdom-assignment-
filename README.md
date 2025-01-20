# User Details Application

**A React.js-based web application that displays a list of users fetched from an API. Users can click on any user to view detailed information.** The app is deployed on Vercel and can be accessed at [User Details App](https://wisdom-assignment.vercel.app/).

---

## Project Features

- **User Listing:** Displays a list of users fetched from a REST API.
- **User Details:** Clicking on a user navigates to a detailed view of the selected user.
- **API Status Handling:** Handles different states (loading, success, failure) during API calls with proper UI feedback.
- **Routing:** Implements client-side routing using `react-router-dom`.
- **Reusable Components:** Built using reusable components like `UserCard`.

---

## Technologies Used

- **Frontend:** React.js, CSS
- **Routing:** react-router-dom
- **Deployment:** Vercel
- **Third-party Libraries:** react-loader-spinner

---

## Project Structure

```plaintext
src/
├── components/
│   ├── UserCard/
│   │   ├── index.js
│   │   ├── index.css
│   ├── UserDetail/
│   │   ├── index.js
│   │   ├── index.css
│
├── App.js
├── index.js
├── index.css
Steps to Run the Project Locally
Follow these steps to set up and run the project on your local machine:

Clone the Repository

git clone <repository-link>
cd <repository-folder>
Install Dependencies Ensure Node.js is installed, then install the required dependencies:


npm install
Start the Development Server Run the app in development mode:


npm start
The app will be available at http://localhost:3000/ in your browser.

APIs Used
User List API

Endpoint: https://jsonplaceholder.typicode.com/users
Description: Fetches a list of users.
Method: GET
User Detail API

Endpoint: https://jsonplaceholder.typicode.com/users/:id
Description: Fetches detailed information for a specific user.
Method: GET
Features Implemented
User Listing Page

Displays a list of users using the API.
Users are shown in cards with their name, email, and city.
Each card is clickable, navigating to the respective user's detail page.
User Detail Page

Displays detailed information about the selected user, including:
Name
Email
Phone
Company Name
Website (with a clickable link)
Includes a "Go Back" button to return to the user listing page.
Loading and Error States

Loading: A spinner is displayed while API calls are in progress.
Error: Displays an error message with a "Retry" button if the API call fails.
Deployment
The application is deployed on Vercel and can be accessed here: User Details App.

Future Enhancements
Add user search functionality.
Implement sorting and filtering options for the user list.
Add unit and integration tests using Jest and React Testing Library.