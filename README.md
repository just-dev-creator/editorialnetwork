![Picture of archive](https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=mr-cup-fabien-barral-o6GEPQXnqMY-unsplash.jpg)
## ⚠️ You are viewing an archived project ⚠️
This project was archived by me - the owner of it. It likely was an personal one-time project and I want to make it clear that I wont provide support on this project.

If you still want to tell me something important about this, please use the email on my profile page.

Below you can find the old README, if there is any.

***

# Editorialnetwork
## Why?
This project was funded to allow the whole internet to write for one newspaper,
without having a problem with spam posts etc. 
## How?
The user creates its article in markdown. First, it's published unlisted and only
accessible using the direct link. Then, an admin reads trough the text and verifys
it. From now, it will appear on the main page.
## Where?
You can view an example [here](https://rdn.justcoding.tech/). Maybe it's not longer
online if you visit the page. Please note that your articles won't get verified. 
## How to use?
Download the files and install the packages. Set the envroiment variables "ACCESS_TOKEN_SECRET" for the
JsonWebTokens and "MONGODB_CONNECTION_STRING" for the MongoDB-Database. If you create a
`.env`-File using the following scheme they will be automatically set.
```dotenv
ACCESS_TOKEN_SECRET="Your-Secret-Goes-Here"
MONGODB_CONNECTION_STRING="Your-MongoDB-String-Goes-Here"
```
Create a user.json and fill in the credentials as following:
```json
{
  "username": "password"
}
```
If you don't supply any credentials, you won't be able to get any articles onto the
front page. Then, run the server.js script using the following command.
```shell
node server.js
```
