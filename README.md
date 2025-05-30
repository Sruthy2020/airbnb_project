# AIRBNB PROJECT 
* Assignment 3
* s3988110

### Tech Stack: MERN Stack
* MongoDB
* ExpressJS
* React
* NodeJS

### FrontEnd
##### components ->
* Header.jsx      -> common header file
* Footer.jsx      -> common footer file
* Layout.jsx      -> header and footer to all pages...
* ListingCard.jsx -> listing after filtering through home page..

#### pages ->
* AboutPage.jsx        -> An additional page which is saying more about the web app.
* Allbookings.jsx      -> Show all bookings made on the application.. (this feature should be later transfered to just admin users later)
* BookingPage.jsx      -> When the user click on the listing they will be taken to the booking page
* ConfirmationPage.jsx -> When the user submit the bookingform they will get a confirmation and will get a button taking to the home page..

### UI components: 
* Chakra UI, react-icons and Framer motion

### Backend -> 
* Node.js (runtime)
* Express.js (backend framework)
* MongoDB (NoSQL database)
* Mongoose (ODM for MongoDB)
* MongoDB Atlas (cloud DB hosting)
* env (for managing environment variables)
* CORS & JSON Middleware (to support frontend requests)

##### models
* Booking.js          -> schema for booking data

#### routes
* listings.js         -> Filtering listings from MongoDB sample data
* bookings.js         -> Create and fetch bookings

* server.js           -> Main entry point with Express + MongoDB setup
* .env                -> Environment variables (e.g. MONGO_URI, PORT)


#### How to Run?
* cd airbnb-frontend -> npm start
* cd airbnb-backend -> npm start



