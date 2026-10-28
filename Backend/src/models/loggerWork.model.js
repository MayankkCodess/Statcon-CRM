import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    mobileNumber:{
        type:String, // why
        trim:true,
        required:true,
        maxlength:10
    },
    callOn:{
        type:String,
        enum:["Whatsapp Call" , "Simple Call"],
        required:true
    },
    loggerSerialNumber:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        maxlength:15
    },
    vendorName:{
        type:String,
        enum:["Exide","Genus","Ecozen","Cheriesh","ValuePlus","Bekem","Dlight","Crompton","Claro","Statcon","Other"],
        required:true
    },
    problemDescription:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        maxlength:2000
    },
    actionDescription:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        maxlength:2000
    },
    status:{
        type:String,
        enum:["Pending","Resolved","Transferred"],
        required:true
    },
    accountability:{
        type:String,
        enum:["Own","Geocon Team","Service Team"],
        required:true
    },
    solvedBy:{  // here you can give refernce from account/user account but you failed to think it
        type:String,
        enum:["Mayank","Tarun"],
        required:true
    },
    contactedPerson:{
        type:String,
        enum:["Customer","Site Engineer"],
        required:true
    }
},{timestamps:true})

const Complaint = mongoose.model('Complaint',complaintSchema);

export default Complaint;


/*
1. What is Mongoose?
Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.
MongoDB stores data as BSON documents. Mongoose helps you define how those documents should look and provides features such as validation, type casting, middleware, and querying.
For example, without a defined Mongoose schema, a logger-work record could contain inconsistent fields. With Mongoose, you can specify which fields are required, which values are allowed, and how data should be processed.
import mongoose from "mongoose";

const loggerWorkSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true
    }
});


Here, mobileNumber is defined as a string and is mandatory when creating a valid document through Mongoose.
2. The three main concepts: Schema, Model, and Document
1. Schema
Defines the structure and rules of your data.
const loggerWorkSchema = new mongoose.Schema({
    mobileNumber: String,
    status: String
});




2. Model
A constructor created from a schema. You use it to create, read, update, and delete documents.
const LoggerWork = mongoose.model(
    "LoggerWork",
    loggerWorkSchema
);




3. Document
An individual record created using the model.
const work = new LoggerWork({
    mobileNumber: "9876543210",
    status: "Pending"
});

await work.save();




Think of it this way:
- Schema: Blueprint of a house.
- Model: The tool used to build houses from that blueprint.
- Document: One actual house.
For your application, one document represents one logger-work entry.
3. Understanding new mongoose.Schema()
The general syntax is:
const schemaName = new mongoose.Schema(
    {
        fieldName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


There are two main arguments:
Argument	Purpose
First object	Defines fields, data types, and validation rules
Second object	Defines schema-level options, such as timestamps
The new keyword creates a new schema instance from Mongoose's Schema class.
Field definitions: two ways
Short syntax — suitable for simple fields:
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isActive: Boolean
});


Expanded syntax — when you need validation and other rules:
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    }
});


Both approaches are valid. Use expanded syntax whenever a field needs additional configuration.
4. Mongoose data types
These are the most important types to learn.
Mongoose type	Example	Common use
String	"Pending"	Names, serial numbers, descriptions
Number	42, 5.5	Counts, quantities, numeric measurements
Boolean	true	Active/inactive flags
Date	new Date()	Dates and times
ObjectId	mongoose.Types.ObjectId	References to other documents
Array	["Pending", "Resolved"]	Collections of values
Map	Key-value mapping	Dynamic key-value fields
Mixed	Arbitrary object	Flexible, unstructured values
Buffer	Binary data	Binary content
Why use String for a mobile number?
Your schema contains:
mobileNumber: {
    type: String,
    trim: true,
    required: true
}


This is the correct choice for a phone number.
Reasons:
1. Leading zeros: A number such as "09876543210" must retain its leading zero.
2. Country codes: Numbers may include a +, such as "+919876543210".
3. No arithmetic: You do not add, multiply, or calculate with phone numbers.
4. Identifier, not quantity: A phone number identifies a contact; it is not a mathematical value.
The same reasoning applies to loggerSerialNumber. Keep serial numbers as strings even if they contain only digits.
When should you use Number?
generation: {
    type: Number,
    min: 0,
    required: true
}


This is suitable for a numerical measurement such as energy generation.
Do not use Number merely because a value contains digits.
5. Important schema properties and validators
These properties control the behavior of individual fields.
Property	What it does
type	Specifies the data type
required	Requires a value for validation
default	Supplies a default when a value is omitted or undefined
trim	Removes leading and trailing whitespace from strings
lowercase	Converts strings to lowercase
uppercase	Converts strings to uppercase
enum	Restricts values to a predefined list
minlength	Sets the minimum string length
maxlength	Sets the maximum string length
min	Sets the minimum number or date
max	Sets the maximum number or date
match	Validates a string against a regular expression
unique	Requests a unique index; not a normal validator
immutable	Prevents ordinary updates to a field after it is set
validate	Defines a custom validation rule
Let's understand the ones used in your schema.
required: true
problemDescription: {
    type: String,
    required: true
}


A missing value fails Mongoose validation when the document is validated or saved.
Important: required: true does not necessarily reject every empty string. For required strings, Mongoose rejects "", but whitespace-only strings need appropriate normalization and validation.
trim: true
mobileNumber: {
    type: String,
    trim: true
}


If the input is:
"  9876543210  "


Mongoose trims it to:
"9876543210"


It is useful for serial numbers, names, and other text inputs. It does not validate the format of a mobile number.
enum
status: {
    type: String,
    enum: ["Pending", "Resolved", "Transfered"],
    required: true
}


This restricts the status to the specified values. For example:
- "Pending" — valid
- "Resolved" — valid
- "Rejected" — invalid
Enum matching is case-sensitive. "pending" is not equivalent to "Pending".
default
status: {
    type: String,
    enum: ["Pending", "Resolved", "Transferred"],
    default: "Pending"
}


If you omit status while creating a document, Mongoose supplies "Pending".
Use defaults for values that genuinely have a sensible starting state.
unique
loggerSerialNumber: {
    type: String,
    unique: true,
    required: true
}


This requests a unique database index, preventing duplicate indexed values once the index is built.
Important: unique: true is not a Mongoose validator. Duplicate writes normally produce a MongoDB duplicate-key error (E11000), rather than a standard Mongoose validation error. Existing duplicate data or an unbuilt index can also affect the outcome.
For a field that must be unique across the entire collection, this is useful. But first consider whether your business rules actually require a serial number to appear only once in all history.




6. Understanding arrays, nested objects, and references
A. Arrays
Use an array when a field can store multiple values.
const schema = new mongoose.Schema({
    tags: {
        type: [String],
        default: []
    }
});


Example document:
{
    tags: ["GTI", "Communication Issue", "Geocon"]
}


B. Nested objects
Use nested objects when related fields belong together.
const schema = new mongoose.Schema({
    siteContact: {
        name: String,
        mobileNumber: String,
        role: String
    }
});


Example:
{
    siteContact: {
        name: "Rahul",
        mobileNumber: "9876543210",
        role: "Site Engineer"
    }
}


This can be useful if you later want to store the site's contact name and details in addition to the contact type.
C. ObjectId references
When two collections contain related data, you can reference one document from another.
const loggerWorkSchema = new mongoose.Schema({
    solvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});


This stores the ID of a user rather than their name as plain text. You can retrieve the referenced user with .populate().
For your application, this becomes useful if you eventually have a users collection containing employees, their roles, and their permissions.
7. Schema options: timestamps, versionKey, and more
Your schema ends with:
}, {
    timestamps: true
});


This is a schema-level option, not a field-level property.
With timestamps enabled, Mongoose automatically maintains:
- createdAt — when the document was created.
- updatedAt — when the document was last updated through supported Mongoose operations.
For your logger-work tracking system, this is particularly useful for tracking when an issue was first recorded and when its record was last modified.
Other options worth knowing:
Option	Purpose
timestamps: true	Adds createdAt and updatedAt
collection	Specifies the MongoDB collection name
versionKey	Controls the document version field, usually __v
strict: true	Ignores fields not defined in the schema by default
minimize: false	Preserves empty objects
toJSON	Configures document conversion to JSON
toObject	Configures conversion to a plain JavaScript object
You can also customize timestamps:
const schema = new mongoose.Schema(
    { name: String },
    {
        timestamps: {
            createdAt: "createdOn",
            updatedAt: "modifiedOn"
        }
    }
);


8. Creating a model with mongoose.model()
Your code:
const LoggerWork = mongoose.model(
    "LoggerWork",
    loggerWorkSchema
);


The first argument is the model name. The second is the schema.
Mongoose generally derives the collection name from the model name by lowercasing and pluralizing it. For "LoggerWork", the default collection is typically loggerworks.
The model provides methods such as:
Method	Purpose
new LoggerWork(data)	Creates an unsaved document
LoggerWork.create(data)	Creates and saves a document
LoggerWork.find()	Retrieves matching documents
LoggerWork.findById(id)	Retrieves one by ID
LoggerWork.findOne(filter)	Retrieves the first matching document
LoggerWork.findByIdAndUpdate()	Updates a document by ID
LoggerWork.updateOne()	Updates a matching document
LoggerWork.deleteOne()	Deletes a matching document
LoggerWork.countDocuments()	Counts matching documents
Example:
const work = await LoggerWork.create({
    mobileNumber: "9876543210",
    callOn: "Whatsapp Call",
    loggerSerialNumber: "GTI-1001",
    vendorName: "Statcon",
    problemDescription: "COM LED is not blinking",
    actionDescription: "Checked the communication cable",
    status: "Pending",
    accountability: "Geocon Team",
    solvedBy: "Mayank",
    contactedPersonAtSite: "Site Engineer"
});


This creates and saves a document, assuming the database connection is established and validation passes.
9. Validation versus middleware
Mongoose also supports custom validators and middleware.
Custom validator:
mobileNumber: {
    type: String,
    required: true,
    validate: {
        validator: value => /^\+?[0-9]{10,15}$/.test(value),
        message: "Enter a valid phone number"
    }
}


This example accepts 10–15 digits, optionally preceded by +. It is a basic format check, not proof that a number is real or reachable.
Pre-save middleware:
loggerWorkSchema.pre("save", function () {
    // Run logic before saving
});


Middleware can perform actions before or after operations. For example, you might use it for audit-related logic or data normalization. Use the appropriate middleware for the operation: save middleware does not automatically run for every update query.
*/