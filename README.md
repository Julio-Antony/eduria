# Eduria - E-learning Platform

> e Learning platform built with the MERN stack & Redux.

![screenshot](https://github.com/Julio-Antony/eduria/blob/master/uploads/dashboard.png)

<!-- ## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Note on Issues

Please do not post issues here that are related to your own code when taking the course. Add those in the Udemy Q/A. If you clone THIS repo and there are issues, then you can submit

## Usage -->

### ES Modules in Node

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 2400
MONGO_URI = 'mongodb://localhost:27017/eduria'
JWT_SECRET = 'abc123'
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:2400)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

julio@eduria.local (Admin)
admin123

susimul@eduria.local (Teacher)
admin123

misyiambar@eduria.local (student)
admin123
```
