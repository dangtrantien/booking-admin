# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Link Deploy

This project was deploy here: [https://booking-admin-ashm.onrender.com](https://booking-admin-ashm.onrender.com)

### This project has following structures:

```
public
  ├─ favicon.ico
  ├─ index.html
  ├─ logo192.png
  ├─ logo512.png
  ├─ manifest.json
  └─ robots.txt
src
  ├─ components
  │   │─ Authentication
  │   │   │─ AuthWrapper.js
  │   │   │─ AuthWrapper.module.css
  │   │   └─ LoginForm.js
  │   │─ Dashboard
  │   │   │─ InfoBoard.js
  │   │   │─ InfoBoard.module.css
  │   │   │─ InfoBoardItem.js
  │   │   │─ InfoBoardItem.module.css
  │   │   │─ RecentTransaction.js
  │   │   └─ RecentTransaction.module.css
  │   │─ Hotel
  │   │   │─ HotelForm.js
  │   │   │─ HotelForm.module.css
  │   │   └─ HotelList.js
  │   ├─ Layout
  │   │   │─ Sidebar
  │   │   │   │─ Sidebar.js
  │   │   │   └─ Sidebar.module.css
  │   │   │─ Header.js
  │   │   └─ Header.module.css
  │   ├─ Room
  │   │   │─ RoomForm.js
  │   │   │─ RoomForm.module.css
  │   │   └─ RoomList.js
  │   ├─ Transaction
  │   │   └─ TransactionList.js
  │   ├─ UI
  │   │   │─ Card.js
  │   │   │─ Card.module.css
  │   │   │─ Error.js
  │   │   │─ Error.module.css
  │   │   │─ IsLoading.js
  │   │   └─ IsLoading.module.css
  │   └─ User
  │       └─ UserList.js
  ├─ hooks
  │   └─ use-http.js
  │─ pages
  │   ├─ Auth
  │   │   └─ Login.js
  │   ├─ Hotel
  │   │   │─ Hotels.js
  │   │   └─ NewHotel.js
  │   ├─ Layout
  │   │   │─ MainLayout.js
  │   │   └─ MiniLayout.js
  │   ├─ Room
  │   │   │─ NewRoom.js
  │   │   └─ Rooms.js
  │   ├─ Dashboard.js
  │   ├─ Transactions.js
  │   └─ Users.js
  │─ store
  │   ├─ hotel
  │   │   │─ hotel-actions.js
  │   │   └─ hotel-slice.js
  │   ├─ room
  │   │   │─ room-actions.js
  │   │   └─ room-slice.js
  │   ├─ transaction
  │   │   └─ transaction-slice.js
  │   └─ store.js
  │─ App.js
  │─ index.css
  └─ index.js
.gitignore
package-lock.json
package.json
```

- public: Folder contains root HTML for the Website.
- src: Folder contains main code for building the Website:
  - .css & .module.css: File CSS contains code for styling the Website.
  - Authentication: Folder contains file to create structure for the Signin page.
  - Dashboard: Folder contains file to create structure for the Dashboard page.
  - Hotel: Folder contains file to create structure for the Hotel page.
  - Layout: Folder contains file to create navbar and sidebar for the Website.
  - Room: Folder contains file to create structure for the Room page.
  - Transaction: Folder contains file to create structure for the Transaction page.
  - Card.js: File contains code to create card container.
  - Error.js: File contains code to display the 404 page.
  - IsLoading.js: File contains code to create loading status before display a page.
  - User: Folder contains file to create structure for the User page.
  - use-http.js: File contains code to fetch data with Hooks.
  - Login.js: File contains code to display the Signin page.
  - Hotels.js: File contains code to display the Hotel page.
  - NewHotel.js: File contains code to display the Add-new-hotel page.
  - Layout: Folder contains file to display the layout of the Website.
  - Rooms.js: File contains code to display the Room page.
  - NewRoom.js: File contains code to display the Add-new-room page.
  - Dashboard.js: File contains code to display the Dashboard page.
  - Transactions.js: File contains code to display the Transaction page.
  - Users.js: File contains code to display the User page.
  - store: Folder contains file to storing data with redux for the Website.
  - App.js & index.js: File contains code to create router path for the Website.
- .gitignore: File contains code to ignore some folder when pushing project on Github.
- package.json & package-lock.json: File contains libraries code for building the Website.
