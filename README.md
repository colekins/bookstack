# BookStack - A Book Collection App

### [Live App](https://colekins.github.io/bookstack/) | [Deployed API](https://safe-peak-59079.herokuapp.com/) | [API Repository](https://github.com/colekins/bookstack_api)

BookStack is an app for readers and bookworms! After signing up for an account, BookStack allows you to track your book collection and organize it with relevant information. For each entry, a user can store their rating and pertinent notes on the book. Users are also able to add the book to their 'Read Next' list, which makes it easy to keep track of what they plan on reading next. The app integrates with the [Google Books API](https://developers.google.com/books/) to dynamically populate book covers at user sign-in. Each book entry also provides external links to Amazon and Goodreads for the user's convenience. A powerful search function allows user to sift through their large collections.

![App Screenshot](https://i.imgur.com/55c6GVp.jpg)

### Installation
- Dependencies can be installed by running `npm install`
- Development environment can be spun up by running `grunt serve`


### Technologies

- HTML
- CSS/SASS
- Bootstrap
- Javascript
- jQuery
- AJAX
- Handlebars
- Ruby on Rails
- PostgreSQL
- Google Books API
- New Yorker 'random cartoon' API
- Heroku/Github Pages

## Planning

### User Stories
- As a user, I’d like to be able to sign up with a new account.
- As a user, I want to be able to login securely with a unique username.
- As a user, I’d like to keep track of the books I want to read next.
- As a user, I want to store relevant information about each book.
- As a user, I’d like to see the book covers populate dynamically.
- As a user, I'd like an easily accessible search function.
- As a user, I'd like convenient dynamically populated links to external sites (Amazon, Goodreads)

### Wireframes & ERD

- [Wireframes](https://i.imgur.com/D1OEP71.jpg)
- [Entity Relationship Diagram](https://i.imgur.com/esVvDpD.jpg)

## Development
The idea for this app was spawned out of the ever-growing stacks of books around my house. I tend to buy books faster than I actually read them. Sometimes it can get tough to keep track of and prioritize exactly what I wanted to read next. I wanted the app to be an overall book-collection tracking app; that was flexible enough to keep building new features on. After initial planning, wireframes, and ERD- I jumped into building up the back end. I chose a SQL database paired with Ruby on Rails due to its ease of use and simplicity. As my ERD was rather straight forward, I figured this would be the best route. I then scaffolded my 'Books' resource and began testing all endpoints with CURL scripts. Only after this testing was complete did I add the user relationship and enable the Protected Controller on the resource. Setting up the main structure of the database was fairly painless. Although my ERD was simple- it was still extremely important to run through the CURL testing to ensure that I wouldn't hit any big obstacles down the road. Once this was taken care of, I could move on to client-side development confidently.

I decided to use the browser-template for my client-side code. I really wanted to make the UI/design of this project feel a bit more professional, and I felt that sticking with the browser-template would give me the most opportunity to expand on style. While I appreciated Angular's scalability- I knew that the setup process would've eaten up a lot of the project time. Instead I opted to prioritize UI design, extra features, and interaction with 3rd party APIs. I again used Bootstrap to setup the basic skeleton of my app. Laying the groundwork with bootstrap's classes ensured that my app would remain somewhat responsive for most screen sizes. After I had a basic front end to work with, I began testing all my API endpoints from the client side. The trickiest part of this process was the PATCH request. It took me a bit of time to ensure that I was passing in the expected data back to the API. I also wanted to make sure that I was validating data-types on both the client and backend.

Once the basic CRUD actions were functioning correctly, I looked to integrate some 3rd party APIs, as well as the search function. I handwrote the search function in JS, which basically iterates over my local store.books object for the given parameters. It then displays the 'results' array using handlebars, once the user executes the search. I also integrated a simple GET request to [The New Yorker's](https://www.newyorker.com/cartoons/random/randomAPI) 'randomized cartoon' API. While not exactly related to books or literature, I figured readers of magazine tend to be the bookish type. It also made my main welcome page more fun and engaging. Integrating the Google Books API was somewhat challenging, but luckily I was able to find a helpful NPM package which assisted with much of the legwork. Once I was able to get that working, I had to make sure the book covers populated at all the correct times... there are a few user views where I have to make sure to repopulate the covers. Instead of making a new call out to Google's server for each of these views, I store the image URL in the local store on the first call- so that it can be easily reused in other views while the user is signed in. I also ran into the issue of rejected requests since I was hitting Google's limit for unregistered users. I was able to sign up for a Google dev account and use my own API key, which upped my quota to 1000 queries per day, which is more than enough for my purposes.

For styling enhancements, I relied mostly on simple CSS capabilities to add custom fonts, color gradients etc. I'm fairly pleased with how the overall site looks. I also felt that moving the 'signup' form directly onto the main page made a lot of sense, instead of hiding it in another modal. After that move, I also refactored the signup code so that a user is automatically logged in upon successful sign-up. I tried to think of small touches like this that would make the user experience more rich. I also added 'date added' info as well as external links to each book's 'info' modal. I used string interpolation to create custom URLs that would open up search pages on Amazon or Goodreads in a new tab. One of the last additions I made was adding a 5 star rating dropdown to each book. This required a quick migration on the backend to add the column to the database, and then updating the front end's PATCH request when the user changes the book info. I'm pleased with how this feature came out, and with how easy it was to actually drop in 'star' characters to the 'select' html element.

I spent a bit of time trying to integrate a dynamic 'autocomplete' functionality to my search field, but to no avail. I looked into a few different jQuery plugins and NPM packages, but none seemed to be working as expected with my code. This is something I'd love to spend more time researching and hopefully integrating. A sorting capability was another 'reach goal' of mine that I ultimately did not have time for. I think this would've actually been fairly straightforward to handle entirely on the front-end using a few different array iteration methods.

### Goals for Future Versions
- Autocomplete on search field
- Sorting capabilities
- More precise interaction with API (title/author terms)
