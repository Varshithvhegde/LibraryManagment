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
7. Start the development server by running the following command:
```
npm start
```
8. The project should now be running locally. Open your web browser and visit http://localhost:3000 to view the application.

You can now explore and interact with the project locally on your computer. Make any necessary changes or enhancements as per your requirements.

## Hosting your application
To host your project on Vercel from a GitHub repository, follow these steps:

1. Sign up for an account on Vercel (https://vercel.com) if you haven't already.

2. Make sure your project is pushed to a GitHub repository.

3. Login to Vercel and click on the "New Project" button.

4. Select your GitHub account and repository from the list.

5. Configure the project settings like the name, framework, and build settings. Make sure to set the root directory and the build command appropriate for your project.

6. Review the deployment settings and make any necessary changes.

7. Click on the "Deploy" button to start the deployment process.

8. Vercel will build and deploy your project automatically. Once the deployment is complete, you will receive a unique URL for your hosted project.

9. Visit the provided URL to see your project live on Vercel.

Vercel will automatically rebuild and deploy your project whenever you push new changes to the GitHub repository. You can also configure custom domain settings and other advanced options in the Vercel project settings.

## Snapshots

- **Splash Screen**
![Splash-screen](https://github.com/Varshithvhegde/LibraryManagment/assets/80502833/5db2296b-8d13-491b-bc54-84607bfaf64e)

- **Home Screen**
![Home_page](https://github.com/Varshithvhegde/LibraryManagment/assets/80502833/f45f6d30-238a-4b9a-b085-6f465d58f0e6)

- **Admin Login**
![admin_login](https://github.com/Varshithvhegde/LibraryManagment/assets/80502833/d81b9a39-c801-4daa-8707-05f2c74971c9)

- **Admin Dashboard**
![admin_dashboard](https://github.com/Varshithvhegde/LibraryManagment/assets/80502833/d23bd228-9dc2-41c6-b635-af5c6babf176)

- **Admin Books list**
![admin_book_list](https://github.com/Varshithvhegde/LibraryManagment/assets/80502833/a278cc38-41bf-4d6f-a6bc-c3c4bf958a65)

- **Admin Members List**
![admin_members](https://github.com/Varshithvhegde/LibraryManagment/assets/80502833/04e953da-4c81-4f4d-a578-a5bd320e46b7)

- **Admin Add Members Form**
![Admin_Add_member](https://github.com/Varshithvhegde/LibraryManagment/assets/80502833/3310c3d7-330f-4dd7-a9bc-92c90db6299a)

- **Admin Add or Edit Book**
![Admin_add_book_edit_form](https://github.com/Varshithvhegde/LibraryManagment/assets/80502833/e7736f2d-ed40-4671-9828-166e5e08fe7e)

- **User Book List Page**
![User_book_list](https://github.com/Varshithvhegde/LibraryManagment/assets/80502833/508858ff-64dc-4f42-965f-9e9824e772fe)

- **User Book Search**
![user_search_result](https://github.com/Varshithvhegde/LibraryManagment/assets/80502833/1884643d-709a-48a4-a521-0d8c1698156e)

