<h1 align="center" style="font-size:50px;"><a href="https://library-managment-varshith.vercel.app/home">Library Management System</a></h1>


It is a simple web application consisting of two parts: an admin management section and a user interface for viewing the books in the library. The application is built using React.js and integrated with Firebase for data management and authentication.

## Features

- **Adding New books(Admin)**
- **Deleting books(Admin)**
- **Updating the books(Admin)**
- **Membership Management (Admin)**
- **No Login Required to View the books(Users)**
- **Universal Search is implemented**
- **Pagination is implemented for arranging books**
- **Simple and Easy to use UI**
- **Authentication Context is Managed**

## Usage

- To use the web application, follow these steps:

1. Ensure that you have a compatible web browser installed on your device.
2. Visit the application's URL ([https://library-managment-varshith.vercel.app/home](https://library-managment-varshith.vercel.app/home)).
3. If you are an admin user, log in to access the admin management section. Otherwise, proceed as a regular user.
4. Explore the available books, use the search functionality, and navigate through different pages using pagination.
5. If you are an admin user, utilize the provided functionalities to add, delete, update books, and manage user memberships.

## Technology Used

- **ReactJS** :  A JavaScript library for building user     interfaces, used as the foundation of the web application.
- **Firebase Authentication** : A service provided by Firebase for user authentication, ensuring secure access to the application.
- **Firebase Firestore**:  A cloud-based NoSQL database provided by Firebase, used for data management and storage of books and user information.
- **MUI (Material UI Framework)**:A popular React UI framework that provides pre-designed components and styling for a visually appealing and responsive user interface.
- **React Routers** :A library for handling routing in React applications, used for navigation between different pages and components within the application.


## Setting up Project Locally

To set up the project locally, follow these steps:
 1. Make sure you have Node.js and npm (Node Package Manager) installed on your computer. You can download them from the official Node.js website.
 2. Clone the project repository from the version control system (e.g., GitHub) using Git or download the source code as a ZIP file from the repo [Library Management](https://github.com/Varshithvhegde/LibraryManagment).
 3. Open a terminal or command prompt and navigate to the project directory.
 4. Run the following command to install the project dependencies:
```
npm install
```
5. Create a Firebase project and set up Firebase Authentication and Firestore services. Obtain the necessary configuration details, including the API keys and credentials.
6. Add those configuration API keys and credentials to the projectin the page [Firebase.js](src/firebase.js)