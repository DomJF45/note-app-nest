# Instructions

Here are the instructions for using the **Notes** app.

### User Authentication

I implemented user authentication for this application.

- Feel free to either make your own account through the route `auth/register` by clicking `login` and `signup`
- If you don't want to make an account, use the following test credentials to log in.
  - **email**: _test@test.com_
  - **password**: _Password123!_

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
