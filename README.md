# Tinder Clone (React & Nodejs Web Application)

## A functional React/Nodejs web application that works as a Tinder clone, with a user sign-up form, a backend database connection for user data storage, and a mock main dashboard for "card swiping"

### :toolbox: Languages and Tools
<img align="left" alt="JavaScript" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"/>
<img align="left" alt="React" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg">
<img align="left" alt="Anaconda" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adonisjs/adonisjs-original.svg">
<img align="left" alt="NodeJS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg">
<img align="left" alt="Mongo" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg">
<img align="left" alt="Firebase" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg">
<img align="left" alt="Express" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"/>
<img align="left" alt="VSCode" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg">
<p>&nbsp;</p>

This project was done for self-learning purposes to showcase full-stack development knowledge using React and NodeJS. Utilizing a MongoDB backend database and Firebase for frontend hosting if needed or via localhost with appropriate setup of server.js file. The application has the following features:

* Lander page for user sign-in or account creation
* Account creation via a form taking in personal information, dating preferences, and an option to add a profile image
* A functional dashboard that allows a user to swipe on a card deck from the database
* Storage of cookies and user auth tokens until the user signs out
* CSS animations for buttons, text, and website images

---
## Application Usage Summary
![Home](Images/Home.png)


After installation of the required packages and initialization of the backend and frontend servers, the user will be welcomed with this page for a "sign-in" or "log-in" option. Both require an email and password

![Show Schedule](Images/Onboarding.png)


If a user decides to create an account, the onboarding page will be presented for user input. The form requires a name, birth date, gender identity and interest, and an image URL for card presentation.

![Volunteer Shifts](/Images/Dashboard.png)


After sign-in or log-in is complete, the user will receive an auth token as a cookie and will be brought to the dashboard screen. Presenting a card deck populated by MongoDB objects that the user can swipe through.

---
## Installation Instructions
1. Clone this project
2. Setup a local directory for executable creation
3. Setup a MongoDB cluster and connect it with server.js while configuring desired host settings (Localhost or otherwise)
4. Use npm to install all required node modules from the 'tinder-frontend' end 'tinder-backend' package.json files
5. On a separate terminal, activat the backend via 'nodemon server.js' in 'tinder-backend' folder
6. Within 'tinder-frontend' folder, activate the frontend via 'npm start' in another terminal instance
