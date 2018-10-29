# Recipe Search Node Capstone **

The RecipePal app is designed for people that want to search for food recipes either based off of their most recent grocery items, or what is currently left over in their food stock, or simply looking for healthy dishes for their healthy lifestyle!

## Screenshots

Home Page View | Login Page View #2
:-------------------------:|:-------------------------:
![Home Page](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/home-page.jpg)  |  ![Login Page](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/login.jpg)
User Dashboard | Seen Entry
![User Dashboard](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/user-dashboard.jpg) | ![Seen Entry](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/seen-entry.jpg)
Add Entry  | Edit Entry
![Add Entry](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/add-entry.jpg) | ![Edit Entry](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/edit-entry.jpg)
Delete Entry |
![Delete Entry](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/delete-entry.jpg) |

## User Cases=
As a visitor you should be able to securely log in to my applications. In order to properly/securly navigate the application.
As a visitor after you have logged in you should be forwarded to the home/main page. In order begin your search.
As a user, you should be able to enter keywords in the search bar to search for recipes containing those ingredients.
As a user, you should see search results populating dishes/recipes based off of the parameter you set. So that
As a user you should see the recipe broken down by ingredients with the exact measurements.
As a user you should be able to "favorite" the recipes you really like and have them saved.
As a user you should be able to rate the recipes based off of difficulty and flavor. The difficulty will be from 1-10, and the flavor will be from 1-5.
As a user you should be able to leave reviews on the recipes for others to see.


### UI Flow
![UI Flow handwritten draft](https://github.com/KatiLong/node-capstone/blob/master/github-images/node-capstone-user-flow.jpg)

### Wireframe _main
![Wireframe _Main](https://github.com/KatiLong/node-capstone/blob/master/github-images/wireframe-v1.jpg)

## Working Prototype
You can access a working prototype of the app here: https://recipe-search-node-captstone.herokuapp.com/

## Functionality
The app's functionality is fairly straight forward. The app populates recipes through an API call, that searches the database for keywords set by the user.


## Technology
* Front-End: HTML5 | CSS3 | JavaScript ES6 | jQuery
* Back-End: Node.js | Express.js | Mocha | Chai | RESTful API Endpoints | MongoDB | Mongoose



## Responsive
App is strongly built to be usuable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

#  The typical command lines for capstone projects

## Node command lines
* npm install ==> install all node modules
    * npm install --save bcryptjs body-parser cors express mongodb mongoose passport passport-http unirest
    * npm install --save-dev chai chai-http mocha faker
* nodemon server.js ==> run node server
* npm test ==> run the tests

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* Google Maps integrated to view all entries by location
* Featured Theaters of the World Section
