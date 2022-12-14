# Documentation of the Backend part

> Deliverable D1

##  General group information

| Member n. | Role          | First name | Last Name | Matricola | Email address                  |
|-----------|---------------|------------|-----------|-----------|--------------------------------|
|       1  | administrator | Jessica    | Corrias   | 914377    | jessica.corrias@mail.polimi.it |

## Links to other deliverables

- ***Deliverable D0***: the web application is accessible at [this address](https://polimi-hyp-2019-10412442.herokuapp.com/).
- ***Deliverable D2***: the YAML containing the specification of the app API can be found at [this address](https://polimi-hyp-2019-10412442.herokuapp.com/backend/spec.yaml).
- ***Deliverable D3***: the SwaggerUI page of the same API is available at [this address](https://polimi-hyp-2019-10412442.herokuapp.com/backend/swaggerui).
- ***Deliverable D4***: the source code of D0 is available as a zip file at [this address](https://polimi-hyp-2019-10412442.herokuapp.com/backend/app.zip).
- ***Deliverable D5***: the address of the online source control repository is available [this address](https://bitbucket.org/jesscorr/hypfebr2020/). We hereby declare that this is a private repository and, upon request, we will give access to the instructors.



## Specification
### Web Architecture

>Describe here, with a diagram, the components of your web application and how they interact. Highlight which parts belong to the application layer, data layer or presentation layer. How did you ensure that HTML is not rendered server side?


* ***Presentation Layer*** : the client,user use a web browser to view and interact with webapp, that are documents. The pillars of web development are:
    * HTML: used to create the stucture of the pages
    * CSS: used to style the pages
    * JavaScript: used to generate dynamic HTML content and to communicate with the application layer through Fetch method
* ***Application Layer***: descrizione presentation layer
* ***Data Layer***: it stores all the data of the application (performers, events, seminar, ..) in a PostgreSQL Database

HTML is rendered client side because the content is created with Javascript: the client web browser send a request to the application layer througth Fetch  (implemented as a Promise, a wrapper around JS that will be resolved at some point in the future).

### API
#### REST compliance
>Describe here to what extent did you follow REST principles and what are the reasons for which you might have decided to diverge. Note, you must not describe the whole API here, just the design decisions.

I folloed REST principles like:
* ***Uniform interface***: 
* ***Client–server***: the client application and the server application evolved separately without any dependency on each other. Client folder is /public and server folder is /other.
* ***Stateless***:
* ***Cacheable***:
* ***Layered system***:
* ***Code on demand (optional)***: 

#### OpenAPI Resource models
>Describe here synthetically, which models you have introduced for resources.

The models used inside the API are:
* ***Artistic***: represents an Artistic events of the Festival
* ***Performer****: represent a performer of the Festival
* ***Seminar***: represents a public seminars of the Festival
* ***User***: represents a user registered to this application
* ***Cart***: Object which handles tickets inside a user's cart
* ***Category**: Category of all events ('opera','theatre','dance','music','seminar')

### Data model
>Describe with an ER diagram the model used in the data layer of your web
application. How these map to the OpenAPI data model?

## Implementation
### Tools used
>Describe here which tools, languages and frameworks did you use for the backend of the application.

* ***Visual Studio Code***: a code editor redefined and optimized for building and debugging modern web and cloud applications. 
* ***Postman***: a most popular tools used in API testing.
* ***Dillinger***: Online Markdown editor
The backend is written in Javascript with Express.js, a Node.js framework. I used Sequelize, a ***Node.js***: a server-side Javascript runtime environment 
* ***Express.js***: a Node.js framework
* ***Sequelize***: a promise-based Node.js ORM for Postgres 


### Discussion

> How did you make sure your web application adheres to the provided OpenAPI specification? Which method did you use to test all APIs endpoints against the expected response?

The Web APIs of this application were built and tested on SwaggerUI and Postman, to ensure all the OpenAPI specification have been followed. Only the endpoints in the Swagger YAML are reachable.

> Why do you think your web application adheres to common practices to partition a REST-based web application (static assets vs. application data)

This web application uses static assets to create the structure of the pages and then the content is populated fetching the data from the application layer.

>Describe synthetically why and how did you manage session state, what are the state change triggering actions (e.g., POST to login etc..).



The state of each session can be updated by two requests.

A POST request to '/api/auth/login' with email and hashed password
This endpoint is used to login a user by 
A POST request to '/api/auth/logout'
This endpoint is used to logout a user and delete his user id from Auth table.

>Which technology did you use (relational or a no-SQL database for managing the data model?

For managing the data model, I used Postgresql, a relational database.

## Other information
### Task assignment
>Describe here how development tasks have been subdivided among members of the group

Jessica Corrias worked on the whole project

### Analysis of existing API
>Describe here the research of (full or part of) existing APIs that are similar in objectives and scope to the one implemented, that have possibly guided implementation choices (these should not be necessarily OpenAPI implementations). Toy APIs (such as the Swagger's Pet Store) or the example shown during lectures are not a valid response.

I took inspiration from the "Music" section of the [PublicAPIs](https://github.com/public-apis/public-apis) repository.
In particular, I analyzed three APIs: 
* [Bandsintown](https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0), designed for artists and enterprises representing artists. It was my first approach to OpenAPI.
* [Ticketmaster](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/), designed to search events, attraction or venues (very detailed documentation that includes Data Model, Use Cases etc)
* [Eventbrite](https://www.eventbrite.com/platform/api), design for selling tickets. It was really usefull for the best practices with private token.


### Learning outcome
>What was the most important thing all the members have learned while developing this part of the project, what questions remained unanswered, how you will use what you've learned in your everyday life?

I learned to set the backend of a complex project from scratch. Starting from the basic notions of JS and SQL, I learned how to manage database requests and render them correctly in the frontend.  In the future, I plan to deepen a framework for the Frontend and the authentication management part, to ensure the security of users using online applications.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
