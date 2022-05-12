# Microservice Template
A Reusable Auth Server Microservice Template Written for NodeJS. Also 
can generally serve as a template for any microservice.

### Overview
This auth microservice is meant to be used as a template. While it 
can be immediately built and through the use of environment variables, 
it is fully functional--though I recommend you make some changes to this 
template for your specific app needs. This is more meant to be a start project 
to help you get started, and then you build on top of it.

### Run The Application
After forking this template and cloning the repo down--you can easily get up and running with these few steps:

#### Pre-Requisites
   - This project recommends using [Node 16 LTS and NPM v8](https://nodejs.org/en/download/).
   - Access to a database (note that the database must be created with a name but the tables will get created automatically on first run.)

#### 1. Environment Variables
This service is database agnostic--due to the use of TypeORM--though for the purposes of getting started,
we will assume you are running a MySQL database and that you already have access to a running server.

In the root of the project, you will find a `.env.example` file--with examples of how the environment variables should look. 
You should rename this file to `.env` and fill in the `DB_CONNECTION_STRING` with the information 
to your own database. Please note that if you are NOT using MySQL--for the type you might have to make changes. 
For more info please refer to the [TypeORM Documentation](https://typeorm.io/#/).

#### 2. Install Dependencies

This will install all the dependencies.

```shell
npm i
```

#### 3. Run The Application

This will run the application in local mode with extra logging to the console. The development server 
also has hot reload available by default, so any changes you make to the Typescript files will automatically 
cause the code to recompile and the app to restart.

```shell
npm start
```

### Running Tests
The project has been configured to run automated testing use [Jest](https://jestjs.io/). I only added a few tests 
to get started and to show examples. You can run them with:

```shell
npm test
```

### Building Docker Image
The project has been pre-configured to build a docker image. You can test this easily by using the command below:

```shell
npm run docker
```

For the most part, you will need to modify this Dockerfile to suite your specific needs, but this is just to 
get you started!

### A Few Notes About This Service As-Is
This auth microservice was built to handle user registration/verification, issuing of tokens (JWTs), refreshing tokens, 
and various admin actions such as: banning a user, unbanning a user, etc. An important thing to note here is 
that I am assuming this microservice to only handle these specific features and to not be coupled to another 
service directly. For that reason, I am not sending emails for verification (from this service) for example. The 
general assumption is that this service might be connected to a Gateway API that will receive the data, and then 
pass it forward into an Email Microservice. This can easily be modified, and you can 100% add emails to this service easily. 

Another important distinction is that this service does not deal with CORs or Cookies. Instead, we return JWTs 
as JSON Payloads so the Gateway API can handle setting the secure Cookies for us. This service assumes a gateway 
API will be sending it Basic OAuth and Bearer Tokens in the `Authorization` header of an HTTP call. So in the context of 
the Gateway API you can manipulate that however you want as this service won't care at that point. My general assumption is
that this service will live behind a firewall anyway and only the Gateway API will have access to the Internet.

### API Documentation

**Simple Health Check**
```
GET - http://localhost:9001/health
```

**Register New User Account**
```
POST - http://localhost:9001/auth/register
```

**Verify New User Account**
```
PUT - http://localhost:9001/auth/verify
```

**Login w/ Email/Password**
```
POST - http://localhost:9001/auth/login/basic
```

**Refresh Your Access Token**
```
POST - http://localhost:9001/auth/token/refresh
```

**Password Reset Request**
```
POST - http://localhost:9001/auth/password/reset-request
```

**Password Reset Verification**
```
PUT - http://localhost:9001/auth/password/reset-verify
```

**Ban A User**
```
PUT - http://localhost:9001/admin/ban/:id
```

**Ban A User**
```
PUT - http://localhost:9001/admin/unban/:id
```
