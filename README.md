# Bug Tracker application with react JS

## Project setup
```
pnpm install
```
### Compiles and hot-reloads for development
```
pnpm run serve
```
### Compiles and minifies for production
```
pnpm create vite@latest
```
### Lints and fixes files
```
pnpm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.reactjs.org/config/).

### What is the app about
This is a Bug tracker application that utilizes json data from a rest API. It lets user mange projects by first creating their projects and adding related bugs. After this they can be 
to track the progress of solving issues. The user can also be assigned with various bugs.
![alt text]()

### Adding router to the application
On clicking a particular project or bug,it routes one to that project or bug with a unique id and displays all details.  This improves SPA as no reloading occurs from the page (static page)
- The routes are matched dynamically with routs params
- extracting route configurations
- mapping routes with specific components
- pageNotFound from React router with redirect 
- redirect without url change 
![alt text]()
## Kanban board
I used react beutiful dnd to implement drag and drop funtionallity of the kanban board. I use atlissan to learn how to impleat the dnd library.

## How to navigate this project
- Responsive CSS using styled-components:
- The application fetches data from the Firebase using cloud functions: Examples for the request []

## How I built the project
- used React JS for building front end components
- React router to route static pages with dynamics routes 
- styling components dynamically to enhance SEO on an SPA  

## If I had more time I would change this
-Modularize the kanban board
-implement nodemail to send email auotomatically
-implement notification
-build ADMIN and USER levels
-provide more features like comments
