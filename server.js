// Address of this server is:
// URL => http://localhost:3000
// IP => 127.0.0.1:3000
import express from "express";

const app = express();
const port = 3000;

let data = ["James Sunderland"];

// Middleware
app.use(express.json());

// ENDPOINTS (route handlers) = HTTP VERBS (methods) && ROUTES (paths)
// The method informs the nature of request and the route is a further
//  subdirectory (basically we direct the request to the body of code to
//  respond appropriately, and these locations or routes are called endpoints)

// Type 1 - Website endpoints (typically for sending back html and come when a user enters a url in a browser)

app.get("/", (req, res) => {
  console.log(`in the "${req.path}" path, this is an endpoint ${req.method}`);
  //   res.sendStatus(200);
  res.send(`
    <body style="background:pink;
                 color:#12b2f8">
        <h1>Home</h1>
        <a href="/dashboard">Dashboard</a>
        <h3>DATA:</h3>
        <p>
        ${JSON.stringify(data)}
        </p>
    </body>`);
});

app.get("/dashboard", (req, res) => {
  console.log(`in the "${req.path}" path, this is an endpoint ${req.method}`);
  //   res.send("Hi!");
  res.send(`
    <body>
    <h1>Dashboard</h1>
    <a href="/">Home</a>
    </body>`);
});

// Type 2 - API endpoints (non visual)
// CRUD-method create-post read-get update-put delete-delete

app.get("/api/data", (req, res) => {
  console.log("This endpoint is for data");
  res.sendStatus(200).send(data);
});

app.post("/api/data", (req, res) => {
  const newEntry = req.body;
  res.sendStatus(201);
  data.push(newEntry.name);
  console.log(`New Name ${newEntry.name}`);
});

app.delete("/api/endpoint", (req, res) => {
  if (data.length != 0) {
    data.pop();
    console.log("Top element was deleted");
    res.sendStatus(204);
  } else {
    console.log("No data to delete");
    res.sendStatus(404);
  }
});

app.listen(port, () => console.log(`Server started on: ${port}`));
