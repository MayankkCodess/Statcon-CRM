######## Express Revision ############
Topics Covered : 
1. Basic Overview 


Part 1: What is Express.js?

Express.js is a web framework for Node.js that makes it easier to build HTTP servers and APIs.

Node.js provides the runtime and built-in HTTP capabilities. Express adds a convenient way to define routes, process requests, run middleware, and send responses.

For example, without Express, you would typically work more directly with Node.js's HTTP module. 
With Express:

import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000);


Here:

- express() creates an Express application.
- app.get() registers a route for HTTP GET requests.
- req represents the incoming request.
- res is used to send the response.
- app.listen() starts the server listening on port 3000.


Part 2: Understanding req and res

1. What exactly are req and res?

Consider your logger-work tracking application.
You enter the following information in a frontend form:
- Mobile number
- Logger serial number
- Vendor name
- Problem description
- Action taken
When the frontend sends that information to your backend, Express receives an HTTP request.
The route handler typically looks like this:

app.post("/api/logger-work", (req, res) => {
    console.log(req.body);

    res.status(201).json({
        message: "Logger work created successfully"
    });
});

Full Flow of the Application : 

Frontend
Sends logger-work data

HTTP request

Express route handler
req
Reads incoming data

res
Sends a response

HTTP response

Frontend receives the result
Success message, data, or error



In simple words:

- req (request): What the client sends to your backend, plus information about the request.
- res (response): What your backend sends back to the client.
They are objects provided to your route handler by Express. You do not need to create them yourself.

2. What is req.body?

req.body contains data submitted in the HTTP request body, commonly JSON sent by a frontend.
Suppose the frontend sends this JSON:
{
    "mobileNumber": "9876543210",
    "callOn": "WhatsApp Call",
    "loggerSerialNumber": "GTI-1001",
    "vendorName": "Statcon",
    "problemDescription": "COM LED is not blinking",
    "actionDescription": "Checked communication cable",
    "accountability": "Geocon Team",
    "solvedBy": "Mayank",
    "contactedPersonAtSite": "Site Engineer"
}

You can access its fields using:

req.body.mobileNumber
req.body.loggerSerialNumber
req.body.vendorName
req.body.problemDescription


Or extract multiple fields using destructuring:

const {
    mobileNumber,
    loggerSerialNumber,
    vendorName,
    problemDescription
} = req.body;


This is ordinary JavaScript object destructuring. Express does not create a separate variable for every field automatically.
The important part: express.json()
For JSON request bodies, add this middleware before your routes:

app.use(express.json());


Without suitable body-parsing middleware, req.body may be undefined for a JSON request.
A typical setup is:

import express from "express";

const app = express();

app.use(express.json());

app.post("/api/logger-work", (req, res) => {
    console.log(req.body);
    res.json({ received: true });
});


express.json() parses JSON request bodies when the request has an appropriate content type, typically application/json.
For HTML forms encoded as URL-encoded data, use:
app.use(express.urlencoded({ extended: true }));


For file uploads using multipart/form-data, you typically need a separate middleware such as Multer.
Security note: Never blindly trust req.body. Clients can submit missing fields, unexpected values, or malicious input. Validate the data before saving it to MongoDB.

3. The most important properties of req

You will use these regularly.

Property	What it contains	Example
req.body	Submitted body data	req.body.vendorName
req.params	Named route parameters	req.params.id
req.query	Query-string parameters	req.query.status
req.headers	HTTP request headers	req.headers.authorization
req.method	HTTP method	"POST"
req.url	Request URL	"/api/logger-work?id=1"
req.path	URL path without the query string	"/api/logger-work"
req.ip	Client IP as seen by Express	req.ip
Let's understand the three most important data-access properties.

A. req.body — submitted data
app.post("/api/logger-work", (req, res) => {
    const { loggerSerialNumber } = req.body;

    res.json({ loggerSerialNumber });
});


Use it when creating records or updating information.

B. req.params — values inside the route path
app.get("/api/logger-work/:id", (req, res) => {
    console.log(req.params.id);
    res.send("Logger work details");
});


If the request is:
GET /api/logger-work/68f123abc456789012345678


Then:
req.params.id


contains:
68f123abc456789012345678


The :id is a named route parameter. It is not automatically a MongoDB ID; it is simply a string extracted from the URL.

C. req.query — filters and search parameters
app.get("/api/logger-work", (req, res) => {
    console.log(req.query.status);
});

If the request is:
GET /api/logger-work?status=Pending&vendorName=Statcon


You can access:
req.query.status       // "Pending"
req.query.vendorName   // "Statcon"


This is especially useful for filtering your logger records by status, vendor, date range, or accountability.
Quick comparison
Requirement	Use
Create a logger-work record	req.body
Get one record by its ID	req.params.id
Filter records by status	req.query.status
Read an authorization token	req.headers.authorization
A common mistake is to use req.body.id when the ID is actually in the URL path. Always check how the frontend sends the data.




4. The most important methods of res
The response object lets you control what the client receives.
Method	Purpose	Example
res.send()	Sends text or other supported content	res.send("Hello")
res.json()	Sends a JSON response	res.json({ success: true })
res.status()	Sets the HTTP status code	res.status(201)
res.sendStatus()	Sets status and sends its standard text	res.sendStatus(404)
res.redirect()	Redirects the client	res.redirect("/login")
res.set()	Sets response headers	res.set("X-App", "Logger")
res.cookie()	Sets a cookie	res.cookie("token", token)
res.clearCookie()	Clears a cookie	res.clearCookie("token")
res.end()	Ends the response	res.end()
For APIs, you will mostly use res.status() and res.json(). 

Express.js
+1



How does method chaining work?
res.status(201).json({
    success: true,
    message: "Logger work created successfully"
});


- res.status(201) sets the status to 201 Created.
- .json(...) sends the response body as JSON.
You can also write:
res.status(404).json({
    success: false,
    message: "Logger work not found"
});


Why not always use res.send()?
res.send() is perfectly valid, but res.json() makes your API's intent explicit: you're sending JSON data.
For example, a consistent API response might look like this:
{
    "success": true,
    "message": "Logger work fetched successfully",
    "data": {
        "loggerSerialNumber": "GTI-1001",
        "status": "Pending"
    }
}


Consistency makes frontend integration and error handling easier.
Critical rule: Send only one response for a request. Do not call res.json() and then try to call res.send() again for the same response.

Part 3: Middleware and next()
This is one of the most important Express concepts.
1. What is middleware?
Middleware is a function that runs during the request-response cycle. It can inspect or modify the request, perform checks, send a response, or pass control to the next handler. 

Express.js
+1



Basic structure:
app.use((req, res, next) => {
    console.log("Request received");

    next();
});


Here:
- req contains request information.
- res can be used to respond.
- next() tells Express to continue to the next applicable middleware or handler.
Think of middleware as checkpoints before a request reaches its final destination.
For example, in your logger-work application, middleware could:
1. Parse JSON.
2. Log the request.
3. Authenticate the user.
4. Check whether the user is authorized.
5. Validate the submitted data.
6. Pass the request to the controller.
2. What is next()?
Consider:
app.use((req, res, next) => {
    console.log("First middleware");

    next();
});

app.use((req, res, next) => {
    console.log("Second middleware");

    next();
});

app.get("/", (req, res) => {
    res.send("Hello");
});


When a request reaches /, the execution order is:
First middleware
Second middleware
Route handler
Response: "Hello"


The output is:
First middleware
Second middleware


The route then sends "Hello".
What happens if you forget next()?
app.use((req, res, next) => {
    console.log("Request received");
    // No next(), and no response
});


The request will normally remain pending because this middleware neither passes control onward nor sends a response.
You have two common choices:
// Continue processing
next();


Or:
// Stop processing and respond
return res.status(401).json({
    message: "Unauthorized"
});


When a middleware sends a response, you generally should not continue the normal route chain afterward.
3. The three common ways to use next()
Call	Meaning
next()	Continue to the next applicable handler
next(err)	Pass an error to error-handling middleware
next("route")	Skip the remaining callbacks of the current route and try a subsequent matching route
The third form is a specialized routing feature; you will use ordinary next() and error propagation much more often.
4. Types of middleware
A. Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


These parse supported request bodies.
You may also use:
app.use(express.static("public"));


This serves static files from the public directory.
B. Third-party middleware
Common examples include:
- cors — controls cross-origin browser access.
- helmet — helps set security-related HTTP headers.
- morgan — logs HTTP requests.
- cookie-parser — parses cookies.
- multer — handles multipart uploads.
Install only what your project actually needs.
C. Custom middleware
const requestLogger = (req, res, next) => {
    console.log(req.method, req.originalUrl);
    next();
};

app.use(requestLogger);


This logs the HTTP method and requested URL.
D. Authentication middleware
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }

    // Verify the token before trusting the user.
    next();
};


This is only a demonstration of the missing-token check. A production authentication middleware must actually verify the token's signature and relevant claims, establish the authenticated identity, and handle invalid or expired tokens.


Part 4: Routing and HTTP methods
1. What is routing?
Routing determines which function should handle a request based on its HTTP method and URL path. 

Express.js
+1



app.get("/api/logger-work", (req, res) => {
    res.send("Fetch logger work");
});

app.post("/api/logger-work", (req, res) => {
    res.send("Create logger work");
});


The URL is the same, but the HTTP methods are different, so different handlers run.
2. The HTTP methods you need to know
Method	Typical purpose	Example
GET	Read data	Fetch all logger records
POST	Create a resource or trigger an operation	Add a logger-work record
PUT	Replace a resource	Replace a record's editable fields
PATCH	Partially update a resource	Change its status
DELETE	Delete a resource	Delete a logger-work record
OPTIONS	Discover communication options, often for CORS preflight	Browser preflight
For your application, a REST-style API could use:
GET     /api/logger-work
GET     /api/logger-work/:id
POST    /api/logger-work
PATCH   /api/logger-work/:id
DELETE  /api/logger-work/:id


These are conventions, not mandatory naming rules. The important part is to define the behavior clearly and consistently.
3. What is express.Router()?
When all routes are in one file, the backend quickly becomes difficult to maintain.
Instead, create a dedicated router:
// routes/loggerWorkRoutes.js

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Fetch all logger work" });
});

router.post("/", (req, res) => {
    res.status(201).json({
        message: "Create logger work"
    });
});

export default router;


Mount it in the application:
import loggerWorkRoutes from "./routes/loggerWorkRoutes.js";

app.use("/api/logger-work", loggerWorkRoutes);


The final endpoints are:
- GET /api/logger-work
- POST /api/logger-work
The router is effectively a modular collection of middleware and routes. 

Express.js
+1




Part 5: Controllers, models, and services
This is where Express connects to the Mongoose concepts you learned earlier.
1. Understand the responsibilities
Layer	Responsibility	Example
Route	Defines the endpoint	POST /api/logger-work
Middleware	Performs shared checks	Authentication
Controller	Handles HTTP request and response	Reads req.body, returns JSON
Service	Contains reusable business logic	Issue assignment rules
Model	Interacts with MongoDB through Mongoose	LoggerWork.create()
Database	Stores the persistent records	loggerworks collection
You do not need a service file for every simple operation. Start with routes, controllers, and models, and add services when business logic becomes complex or reusable.
2. How the pieces work together
Frontend sends HTTP request
Express route
Middleware: authentication and validation
Controller: handles req and res

Service, if needed: business logic
Mongoose model → MongoDB
Controller sends JSON response

This separation keeps your application easier to debug, test, and extend.
3. Example: create a logger-work record
Route
// routes/loggerWorkRoutes.js

import express from "express";
import { createLoggerWork } from "../controllers/loggerWorkController.js";

const router = express.Router();

router.post("/", createLoggerWork);

export default router;


Controller
// controllers/loggerWorkController.js

import LoggerWork from "../models/LoggerWork.js";

export const createLoggerWork = async (req, res, next) => {
    try {
        const work = await LoggerWork.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Logger work created successfully",
            data: work
        });
    } catch (error) {
        next(error);
    }
};


This demonstrates the full request path:
1. Express matches the POST route.
2. The controller reads the submitted data through req.body.
3. LoggerWork.create() asks Mongoose to validate and save the document.
4. MongoDB stores the record if the operation succeeds.
5. Express returns the saved record to the client with status 201.
For production: Do not pass arbitrary req.body directly to your model. Explicitly select allowed fields or use a request-validation schema. Otherwise, clients may set fields you did not intend to expose.
For example:
const {
    mobileNumber,
    callOn,
    loggerSerialNumber,
    vendorName,
    problemDescription,
    actionDescription,
    accountability,
    contactedPersonAtSite
} = req.body;

const work = await LoggerWork.create({
    mobileNumber,
    callOn,
    loggerSerialNumber,
    vendorName,
    problemDescription,
    actionDescription,
    accountability,
    contactedPersonAtSite,
    status: "Pending",
    solvedBy: "Mayank"
});


This is a simple allowlist example. In a real application, solvedBy should generally come from the authenticated employee's identity rather than being trusted from a client-submitted value or permanently hardcoded.





Part 6: Asynchronous programming and error handling
1. Why do we use async and await?
Database operations take time. Node.js can perform other work while waiting for I/O operations.
Consider:
const work = await LoggerWork.find();


Here:
- LoggerWork.find() returns a promise.
- await waits for that promise to settle inside the async function.
- If it succeeds, work receives the result.
- If it rejects, an error is thrown and can be caught with try...catch.
Without await, you would receive a promise instead of the resolved query result.
2. What is try...catch?
export const getLoggerWork = async (req, res, next) => {
    try {
        const work = await LoggerWork.find();

        return res.status(200).json({
            success: true,
            data: work
        });
    } catch (error) {
        next(error);
    }
};


The try block contains operations that may fail. The catch block handles the error by forwarding it to Express's error-handling middleware.
This pattern is especially useful for database queries, writes, and calls to external APIs.
3. Global error-handling middleware
Rather than writing a different error response for every unexpected error, you can create a centralized handler.
// middleware/errorHandler.js

export const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    return res.status(err.status || 500).json({
        success: false,
        message: err.status
            ? err.message
            : "Internal server error"
    });
};


Register it after your routes:
app.use(errorHandler);


Express identifies error-handling middleware by its four parameters: (err, req, res, next). 

Express.js
+1



For a production application, you should also map known errors to suitable HTTP statuses—for example, invalid input to 400, a missing resource to 404, and a duplicate-key conflict to 409. Avoid exposing internal stack traces or database details to clients.
What about Express 4 versus Express 5?
In Express 5, rejected promises returned by route handlers and middleware are automatically forwarded to error handling. In Express 4, you generally need to catch asynchronous errors and pass them to next(err), or use a compatible wrapper.
The explicit try...catch pattern above is easy to understand and works well across versions.

Part 7: HTTP status codes every backend developer should know
The status code tells the client what happened to its request.
Code	Meaning	Typical use
200	OK	Data fetched or update succeeded
201	Created	New record created
204	No Content	Successful operation with no response body
400	Bad Request	Invalid input or request
401	Unauthorized	Missing or invalid authentication
403	Forbidden	User lacks permission
404	Not Found	Record or route not found
409	Conflict	Duplicate record or conflicting state
422	Unprocessable Content	Well-formed request fails semantic validation
429	Too Many Requests	Rate limit exceeded
500	Internal Server Error	Unexpected server failure
502	Bad Gateway	Invalid response from an upstream service
503	Service Unavailable	Service temporarily unavailable
Remember the distinction between 401 and 403:
- 401: You have not successfully authenticated.
- 403: The server understands who you are but does not permit the requested action.
For example, if an employee tries to access an admin-only endpoint, 403 is often appropriate when their identity is known but their role is insufficient.

Part 8: Build the CRUD operations for your application
CRUD stands for Create, Read, Update, and Delete.
Let's implement the core controller operations for your LoggerWork model.
1. Create a record
export const createLoggerWork = async (req, res, next) => {
    try {
        const work = await LoggerWork.create(req.body);

        return res.status(201).json({
            success: true,
            data: work
        });
    } catch (error) {
        next(error);
    }
};


Remember to validate and allowlist the submitted fields before creating the record.
2. Fetch all records
export const getAllLoggerWork = async (req, res, next) => {
    try {
        const work = await LoggerWork.find().sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            count: work.length,
            data: work
        });
    } catch (error) {
        next(error);
    }
};


.sort({ createdAt: -1 }) places the newest records first.
For a large collection, add pagination rather than fetching every record.
3. Fetch a record by ID
export const getLoggerWorkById = async (req, res, next) => {
    try {
        const work = await LoggerWork.findById(req.params.id);

        if (!work) {
            return res.status(404).json({
                success: false,
                message: "Logger work not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: work
        });
    } catch (error) {
        next(error);
    }
};


An important detail: if the ID has an invalid ObjectId format, Mongoose may throw a CastError. Handle that as a 400 Bad Request rather than accidentally returning 500.
4. Update a record
export const updateLoggerWork = async (req, res, next) => {
    try {
        const allowedFields = [
            "mobileNumber",
            "callOn",
            "vendorName",
            "problemDescription",
            "actionDescription",
            "status",
            "accountability",
            "solvedBy",
            "contactedPersonAtSite"
        ];

        const updates = Object.fromEntries(
            Object.entries(req.body).filter(([key]) =>
                allowedFields.includes(key)
            )
        );

        const work = await LoggerWork.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        );

        if (!work) {
            return res.status(404).json({
                success: false,
                message: "Logger work not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: work
        });
    } catch (error) {
        next(error);
    }
};


Two options are especially important:
- new: true returns the updated document.
- runValidators: true enables schema validators for the update operation.
The allowlist prevents updates to fields such as _id or createdAt through this controller. For an actual application, validate the request body and authorize sensitive field changes; an allowlist alone does not establish permissions.
5. Delete a record
export const deleteLoggerWork = async (req, res, next) => {
    try {
        const work = await LoggerWork.findByIdAndDelete(
            req.params.id
        );

        if (!work) {
            return res.status(404).json({
                success: false,
                message: "Logger work not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Logger work deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};


For an operational issue-management system, consider whether deletion should be allowed at all. Soft deletion or an audit trail may be more appropriate when historical records matter.
6. Register the routes
import express from "express";

import {
    createLoggerWork,
    getAllLoggerWork,
    getLoggerWorkById,
    updateLoggerWork,
    deleteLoggerWork
} from "../controllers/loggerWorkController.js";

const router = express.Router();

router.route("/")
    .get(getAllLoggerWork)
    .post(createLoggerWork);

router.route("/:id")
    .get(getLoggerWorkById)
    .patch(updateLoggerWork)
    .delete(deleteLoggerWork);

export default router;


This gives you the complete CRUD endpoint structure. Mount the router using:
app.use("/api/logger-work", router);


The route module and controller module should be separate files in a real project, even though they are shown together here for learning.

Part 9: The other Express concepts used in real projects
These are the concepts you will encounter repeatedly while building MERN applications.
1. Application setup
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API is running" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


Useful application methods:
Method	Purpose
express()	Creates the app
app.use()	Registers middleware or mounts routers
app.get(), app.post()	Registers route handlers
app.listen()	Starts the HTTP server
app.set()	Sets application configuration
app.locals	Stores application-level local values
2. Environment variables
Never hardcode database passwords, JWT secrets, or private API keys in source code.
Install and configure dotenv if you want to load a local .env file:
npm install dotenv


PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/loggerdb


Load it before reading environment variables:
import "dotenv/config";

const PORT = process.env.PORT || 5000;


Keep .env out of Git and provide production secrets through your hosting environment.
3. Connect Express to MongoDB
import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");
};


Start the server only after the initial database connection succeeds:
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";

const app = express();

app.use(express.json());

const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();


This avoids accepting application requests before the initial database connection has been established. Production systems should also plan for database disconnections and graceful shutdown.
4. CORS
If your React frontend and Express backend use different origins, the browser may enforce Cross-Origin Resource Sharing (CORS) rules.
Install the middleware:
npm install cors


Example:
import cors from "cors";

app.use(cors({
    origin: "http://localhost:5173"
}));


Use your actual frontend origin in production.
CORS is a browser access policy, not authentication. It does not prevent non-browser clients from making requests to your API.
5. Authentication versus authorization
These concepts are related but different:
- Authentication: Who are you?
- Authorization: What are you allowed to do?
For example, an employee might log in successfully but should not be allowed to delete every logger-work record.
Common authentication approaches include server sessions and token-based authentication using JWTs. Authorization can be based on roles, permissions, resource ownership, or combinations of these.
Never trust a user ID or employee role merely because the client sends it in req.body.
6. File uploads
When your application needs to upload documents, reports, or images, JSON parsing alone is insufficient for multipart/form-data.
Multer is commonly used with Express:
npm install multer


You can use it as route middleware, then upload the file to a suitable storage service if needed.
Always validate file type, file size, and access permissions. Avoid accepting arbitrary uploads without safeguards.
7. Pagination, searching, and filtering
For your logger-work records, users may need to filter by vendor, status, accountability, or date.
Example request:
GET /api/logger-work?status=Pending&page=1&limit=20


Basic query parsing:
const page = Math.max(1, Number(req.query.page) || 1);

const limit = Math.min(
    100,
    Math.max(1, Number(req.query.limit) || 20)
);

const skip = (page - 1) * limit;


Then you can query MongoDB using .find(filter).skip(skip).limit(limit).
Validate query parameters before using them, and build filters from an explicit allowlist rather than letting clients construct arbitrary MongoDB query objects.
8. Security and production readiness
Before deploying an Express API, learn these concepts:
- Input validation using a library such as Zod or Joi.
- Authentication and authorization.
- Secure handling of cookies and tokens.
- Rate limiting to reduce abuse.
- Security headers with Helmet.
- Safe database queries and field allowlisting.
- Consistent error responses.
- Request logging and monitoring.
- HTTPS in production.
- Limits on JSON body size and uploaded file size.
- Avoiding sensitive data in logs and error messages.
These are not all built into Express. You add the necessary middleware, libraries, and application logic according to your needs.





Part 10: Recommended folder structure for an Express + Mongoose project
For your logger-work tracking application, this is a practical structure you can grow into.

logger-work-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── LoggerWork.js
│   ├── routes/
│   │   └── loggerWorkRoutes.js
│   ├── controllers/
│   │   └── loggerWorkController.js
│   ├── services/
│   │   └── loggerWorkService.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── validateRequest.js
│   │   ├── notFound.js
│   │   └── errorHandler.js
│   ├── validators/
│   │   └── loggerWorkValidator.js
│   ├── app.js
│   └── server.js
├── tests/
├── .env
├── .gitignore
├── package.json
└── README.md



What belongs where?
File or folder	Responsibility
config/db.js	Database connection
models/	Mongoose schemas and models
routes/	API endpoint definitions
controllers/	Request and response handling
services/	Business logic, where useful
middleware/	Authentication, error handling, common checks
validators/	Request-data validation rules
app.js	Express configuration and middleware registration
server.js	Database initialization and server startup
tests/	Automated tests
You don't have to create every folder on day one. Start with models, routes, controllers, config, app.js, and server.js, then add the other layers when your application needs them.
Part 11: Common mistakes to avoid
These are particularly important when debugging Express applications.
1. req.body is undefined
Check that app.use(express.json()) appears before the relevant routes, and that the client sends valid JSON with the correct Content-Type.


2. The API request keeps loading
Your handler or middleware may neither send a response nor call next(). Make sure every successful execution path finishes the response or transfers control appropriately.


3. Cannot set headers after they are sent
You are probably trying to send more than one response for the same request. Use return res.status(...).json(...) in conditional branches to prevent accidental continuation.


4. The API returns 404
Check the HTTP method, route path, router mounting prefix, and route-registration order.


5. MongoDB data is not being saved
Check the database connection, schema validation errors, unique-index conflicts, and whether the controller awaits the database operation.


6. The frontend reports a CORS error
Check the backend's CORS configuration and the exact frontend origin. Do not solve this by disabling browser security.


7. A rejected async operation becomes a 500
Inspect the server logs and your error handler. Handle expected validation, authentication, and not-found errors separately from unexpected failures.


Part 12: Quick revision notes
Use this as your Express.js interview and project revision sheet.
Concept	Remember
Express	Web framework for Node.js
req	Incoming HTTP request
res	Outgoing HTTP response
next	Pass control or forward an error
req.body	Submitted request data
req.params	Values extracted from route paths
req.query	Query-string parameters
app.use()	Registers middleware or mounts a router
express.json()	Parses supported JSON request bodies
express.Router()	Creates a modular router
Middleware	Shared request-processing logic
Controller	Handles endpoint logic and HTTP responses
Model	Interacts with the database through Mongoose
async/await	Works with asynchronous operations
try/catch	Handles thrown errors and rejected promises
next(error)	Forwards an error to error middleware
res.status()	Sets the response's HTTP status
res.json()	Sends a JSON response
process.env	Reads environment variables
CORS	Controls browser cross-origin access
CRUD	Create, Read, Update, Delete
REST API	An API organized around resources and HTTP semantics
Authentication	Verifies identity
Authorization	Determines permissions
Your learning order
If you want to master roughly 90% of the Express concepts used in everyday backend projects, study them in this order:
1. Fundamentals: req, res, HTTP methods, status codes, and express.json().
2. Routing: app.get(), app.post(), express.Router(), route parameters, and query parameters.
3. Middleware: app.use(), next(), custom middleware, authentication, and error handling.
4. Mongoose integration: CRUD operations, schema validation, indexes, and database connections.
5. Architecture: Routes, controllers, services, models, and validators.
6. Production essentials: Environment variables, CORS, authentication, authorization, and secure input validation.
7. Advanced practical features: Pagination, search, file uploads, logging, testing, and rate limiting.
For the official documentation, start here:
- Express.js — Middleware guide and Routing guide.
- Express API reference — the full reference for application, request, response, and router methods.
My advice, Mayank: Don't try to memorize every Express method. Focus on understanding the request lifecycle, middleware order, how controllers interact with Mongoose, and how errors reach the client. Once you understand those four things, you can build most standard REST APIs and learn the remaining methods when a project requires them.