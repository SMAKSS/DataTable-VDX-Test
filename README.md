# DataTable
This project is a datatable with some cool features and developed for VDX.tv test. I literally did not use any library or package to develop this app and it just bootstrapped by CRA (This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).).

## Features
For data storing purposes I just used firebase real-time data store to save and read data, the API key of it is available via the the `.env` file and it's committed to the git, so everyone can access it for testing purposes. If you had any problem with it you can ask me directly via my email.

I just implement the following features for this data table in this project.

- You can simply add a new record into the table by add new record button
- You can simply delete each selected record by the delete button
- You can filter and search the whole table with the available search input in the main page
- You can sort data both ascending and descending by clicking each column (The odd clicks will sort ascending and even ones will sort it descending)

## Here are some screenshots

<img src="public/screenShots/Table.png" width="150"/>  <img src="public/screenShots/Add.png" width="150"/> <img src="public/screenShots/Search.png" width="150"/>  <img src="public/screenShots/Delete.png" width="150"/> <img src="public/screenShots/Sort.png" width="150"/>

----


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
