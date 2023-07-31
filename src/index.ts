import express, { Request, Response } from "express";
import {
  create,
  createMultipleUsers,
  deleteMultipleUsers,
  getUser,
  getUsers,
  remove,
  update,
  updateMultipleUsers,
} from "./controllers/users";
import { errorHandler } from "./middlewares/error-handler";
const app = express();

app.use(express.json());

app.get("/users", getUsers);
app.get("/users/:id", getUser);
app.post("/users", create);
app.put("/users/:id", update);
app.delete("/users/:id", remove);

app.post("/create-users", createMultipleUsers);
app.patch("/update-users", updateMultipleUsers);
app.delete("/delete-users", deleteMultipleUsers);

app.use(errorHandler);

app.listen(3000, () => console.log(`server running on http://localhost:3000`));
