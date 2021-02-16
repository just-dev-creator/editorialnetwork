# Editorialnetwork
## Why?
This project was funded to allow the whole internet to write for one newspaper,
without having a problem with spam posts etc. 
## How?
The user creates its article in markdown. First, it's published unlisted and only
accessible using the direct link. Then, an admin reads trough the text and verifys
it. From now, it will appear on the main page.
## Where?
You can view an example [here](https:rdn.justcoding.tech/). Maybe it's not longer
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
