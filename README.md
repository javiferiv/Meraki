# Final-project
## First version

-- Versión de prueba para unir ramas


## Endpoints table

| Id | Method | Path | Description|
| ------ | ------ | ------ | ------ |
| 1 | post | /api/auth/signup | Send user sign up form to the database and a new user is registered |
| 2 | get | /api/auth/loggedIn | Show login form |
| 3 | post | /api/auth/login | Allow a user to login |
| 4 | post | /api/auth/logout | Allow a user to logout |
| 5 | get | /api/books/getAllBooks | Show different books from the database |
| 6 | get | /api/books/bookDetails/:book_id | Show book's details |
| 7 | post | /api/books/newBook | Send the information of the new book to the database |
| 8 | put | /api/books/editBook/:book_id | Send edit form of book edition to the database |
| 9 | delete | /api/books/deleteBook/:book_id | Delete a book from the database |
| 10 | get | /api/events/getAllEvents | Show different events from the database |
| 11 | get | /api/events/eventDetails/:book_id | Show events's details |
| 12 | post | /api/events/newEvent | Send the information of the new event to the database |
| 13 | put | /api/events/editEvent/:event_id | Send edit form of event edition to the database |
| 14 | delete | /api/events/deleteEvent/:event_id | Delete an event from the database |
