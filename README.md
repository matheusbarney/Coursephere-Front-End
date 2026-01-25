
# CourseSphere Front End Project

A modern course management platform built with React for a V-Lab technical challenge.



## About 
This project seeks to implement a full-featured course management system following a technical challenge's specific needs. The application allows users to interact with course, lesson and contributor details through requests to a mocked server database.


## Features

- Built with a stack of React Vite, and TailwindCSS library for styling
- CRUD with permission control through custom hooks
- Local and external API calls
- Permits depending on permission level the ability to manage courses, lessons and instructors.
- Search lessons in a course using filtered search
- Remove instructors on course or add from "Suggested Instructors" taken from randomuser.me, who are also registered as users in the process if added.
- Componentized following atomic design principals 

## Deployment

CourseSphere front end is deployed on Vercel and uses Render for the backend API using JSON-Server: https://coursephere-front-end.vercel.app/

Versel deploy may require a refresh of the login page in case the server is still sleeping and not yet initialized.

Try with test course user:
```
Email: a@g.com
Password: "123456"
```

Test user has ownership of courses 1 and 3, and is an instructor on course 2.
