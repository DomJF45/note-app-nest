# Instructions

Here are the instructions for using the **Notes** app.

### User Authentication

I implemented user authentication for this application.

- Feel free to either make your own account through the route `auth/register` by clicking `login` and `signup`
- If you don't want to make an account, use the following test credentials to log in.
  - **email**: _test@test.com_
  - **password**: _password_

### Notes

To add notes, click the `Add new Note` button. Then, type the desired note you want to add. You should see an updated list of your notes.
Each contains has the following operations to and from the server:

- **CREATE**
  - The `Add new Note` button allows you to create a new note.
- **READ**
  - The notes are displayed in a list of notes found by your user authentication token (_jwt_: json web token)
- **UPDATE**
  - By clicking on the text of a note, you should see an editable field appear. After typing a new value, you can either click `save`: to update the note, or click the `x`: to cancel the update
- **DELETE**
  - When hovering over the note, you will see a garbage bin appear. Clicking this garbage bin will delete the note.

### User

In order to add notes to the database, you first need to sign up, or log into an existing account. I utilized JWT (_jsonwebtoken_) for session validation. After logging in or signing up, a JWT token will be saved in localstorage. This token is your key to asccessing user specific data.
User contains the following functionalities

- **CREATE**
  - The `register` page allows you to create a new user. A jwt will be saved automatically for you.
- **READ**
  - When visiting the `notes` page, a fetch request will be made to _read_ in the user data based on the decoded JWT. This will return the user information, and notes.

# Technical Details

## Overview

#### Server - NestJS

Navigating through my initial experience with NestJS presented a challenging learning curve, but I gradually acclimated to its intricacies. Here are some key takeaways:

1.  **Modular Composition**: The modular structure of NestJS, resembling building blocks, greatly contributes to the scalability of the application. This design makes incorporating new features very manageable.

2.  **Reduced Coupling**: Breaking down the application into modules reduces the coupling of features. This approach encourages a modular mindset, fostering adaptability and maintainability.

3.  **Dependency Injection Focus**: The emphasis on dependency injection, although not familiar from a traditional object-oriented background like Spring or .NET, intrigued me. NestJS's approach facilitates cleaner and more organized code.

4.  **Service-Controller Separation**: The clear separation of services and controllers, akin to CLEAN architecture principles, is a notable aspect. This design choice minimizes dependencies and enhances flexibility. In the event of a database change, the refactoring effort is significantly reduced due to the implementation of dependency injection.

5.  **Concern Separation**: The distinct roles of controllers and services align with the separation of concerns. The satisfaction derived from the controller's lack of direct access to the data repository contributes to a cleaner and more comprehensible codebase.

6.  **Unit Testing**: The built in testing feature from NestJS was very interesting to learn. Once I found a steady foundation for creating mock implementations of services I was building tests rather quickly. The unit tests allowed me to find several bugs relating to the authentication of JWTs. Because I was attaching a user object onto the request via the AuthGuard, I was having trouble remembering that the accessor was { sub: userId }, this lead to a lot of [object Object] errors unfortunately.

#### Client - React

The applications client is built using React and Vite, utilizting Typescript throughout the implementation.
I am most experienced in React, so I tried my best to make a clean, scalable application utilizing some key dependencies:

- **Zustand** for lightweight state management
- **react-query** for asynchronous state management (what I like to call a 'useEffect' replacer)
- **react-hook-form** for a better experience building state-heavy forms

I made sure to follow the single responsibility design pattern for react components

1. **Single responsibility**:

   I wanted every component to only handle one thing.

   Moreover, I wanted any data fetching manipulation to happen on the top most component, usually this was my Pages components.

   I use pages/ to render actual routes. The NotesPage component is responsible for Note CRUD, and displaying that data. The Notes component is responsible for mapping through each note and rendering a Note component. The Note component is responsible for displaying the Note data and allowing deletion or updating.

   - I use the auth/ folder as my directory for auth routes.
   - LoginPage handles any user login
   - RegisterPage handles a new user
   - AuthPage renders an outlet to reduce code duplication. I only have to write the styles for the background image and container once to effect both LoginPage and RegisterPage via the Outlet component.

2. **Hooks**

   I extracted data queries / mutations into their own hook, specifically in pages/hooks/useNoteCrud.

   - this hook takes all the longwinded react-query hooks that fetches and mutates data and puts it into one hook that I can call in the notes page. I don't like to have long functions or a big gap between the top of the component and the JSX. Extracting that logic into hooks makes reading the code easier and creates a seperation of concernces between component state and the JSX.

3. **Shared folders**

   for constants, types, or hooks that needed to be shared between directories (either api/, pages/, components/, etc) I declared this folders and files within the src/ directory of the application. This way any shared data doesn't access unecessary directories. For example, a Note type being declared in a component but imported into the pages/notes directory. To me, it seems like a better idea to have this shared data accessible in the src directory outside of any directory that may have components importing that data

## Challenges

#### Server - NestJS

By far my biggest challange for this project was wrestling with NestJS's opinionated architecture. The modularity of the framework and the emphasis on dependency injection is not something I have worked with before, the learning curve was quite high. Eventually I figured it out and from there on out developing controllers, modules, services, and even tests was quite enjoyable. When a framework is opinionated, it can be quite annoying. However, the learning curve is worth it when you work with large teams of developers, each with different ways of implementing their ideas. All of the sudden an opinionated framework can become the saving grace in situations like these. While it may be frustrating to initally learn an opinionated framework such as NestJS, it is infinitely less frustrating than working on a product with a large team and there is no consistency of code to be found.

Another challange was deciding whether or not user authentication was the right way to go for this application. It would be easier to just create a simple Note crud and call it a day, but I want to do things the right way. I don't want a database where everyone can see everyones notes, I want the notes to only be accessible to those who posted them. This is why I decided to implement user authentication. I made a generic test case just for you to login to if you do not want to make a new account. But the option is there for you to do so.

#### Client - React

My issues encountered with React were the typical React issues. Sometimes, state wouldn't update correctly due to incorrect useEffect or bad dependency arrays.

#### 1. Component re-rendering

- I ran into a couple of issues involving bad useEffect hooks, specifically with my filtering. By copying the data returned from the data fetch, I was able to filter the notes without directly mutating the state.

- Initally, all state in this application was mangaged by the useState and useEffect hook that would update state after a use-query hook. The useEffect would then trigger and update the state, which would update the component.
- After getting the app to a stable state utilizing the built in state management hooks, I incorporated **zustand** to manage the state for notes and users. Any useEffect hook was extracted into it's own hook of functionality. The useEffect hook is always tricky, so it's important to understand how it works, and utilize it when it is appropriate. This is why I use react-query for data fetching. I like to minimize the use of useEffect as much as possbile. I like to use useEffect for re-rendering components based on events, not fetching data.

#### 2. Filtering

- Initially, I had my filters in a couple of useState hooks. One for note content, one for date order. I then had a handleFilter function, which would be rendered in a useEffect hook. The two data filters were passed as props into my filter components. This worked fine, but I wanted to extract _all_ state into a zustand note store. This included the filtering functions.
- After making the change, filtering wasn't working. I had to extract the filter function and useEffect call into it's own hook _useFilterNotes_. This made the code much less overwhelming, atomic, and most importantly readable. It allowed me to see that I wasn't grabbing { data } from the useQuery hook and passing it as the state to be copied and filtered.

#### 3. Scaffolding

- There is no right way to scaffold a base React project. This is one of those times where an oppinionated framework such as NextJS becomes handy. I tried to mimic some of the NextJS scaffolding to enhance the organization of my project.
- I wanted pages and components to be seperate. Each page in the pages directory would manipulate data, and handle CRUD on the client. Each component would only _render_ that data.
- I also wanted to keep certain types, hooks, and constants shared at the src/ directory to ensure clean imports across the project.
