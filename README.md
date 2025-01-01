# Console-log Blog - API

A RESTful API that provides a convenient and secure way to access and manage your blog's data.

## Features

- A simple and flexible API that makes it easy interact with your blog's data.
- Support for CRUD (Create, Read, Update, Delete) for posts, tags.
- Authentication and authorization for users to ensure only authorized users access the data.
- Filter posts based on tags and add comments to the posts
- Error handling to ensure that the provided data is valid and accurate.

## Content Management System

The blog be managed from a self-coded content management system. The source code for the CMS can be found at [Admin](https://github.com/SaiSahithPolimera/console-log-admin)

## Client

The source code for the blog frontend can be found at [Client](https://github.com/SaiSahithPolimera/console-log-admin)

## Endpoints

### Authentication

| Endpoint | Method | Description                |
| -------- | ------ | -------------------------- |
| /login   | POST   | Login as author / user     |
| /sign-up | POST   | Creates a new user account |

### Posts

| Endpoint      | Method | Description                                   |
| ------------- | ------ | --------------------------------------------- |
| /             | GET    | Retrieve all the posts for client             |
| /post/:title  | GET    | Retrieve a specific post by title             |
| /post         | POST   | Create new post (Only admin)                  |
| /post         | PUT    | Update existing post (Only admin)             |
| /posts/:title | DELETE | Delete an existing post by title (Only admin) |

### Comments

| Endpoint              | Method | Description                |
| --------------------- | ------ | -------------------------- |
| /posts/:title/comment | POST   | Create a comment on a post |

### Likes

| Endpoint           | Method | Description             |
| ------------------ | ------ | ----------------------- |
| /posts/:title/like | POST   | Adds a like to the post |

### Tags

| Endpoint   | Method | Description                   |
| ---------- | ------ | ----------------------------- |
| /tags      | GET    | Retrieve all the list of tags |
| /tags      | POST   | Add a new tag to the post     |
| /tags      | DELETE | Delete the tag from the post  |
| /tags/:tag | POST   | Add a new tag to the post     |

### Technologies used

- **Backend Framework:** Express
- **Database:** PostgreSQL
- **Authentication:** PassportJS
- **Database ORM:** Prisma
- **Authorization**: JWT
- **Database hosting**: Supabase
