import {
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem,
} from "database/item-dao";
import express from "express";

// Don't really need this because it's 200 default.
// const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_FOUND = 404;

const router = express.Router();

router.post("/", async (req, res) => {
  const newItem = await createItem({
    name: req.body.name,
    description: req.body.description,
  });

  res
    .status(HTTP_CREATED)
    .header("Location", `/api/articles/${newItem._id}`)
    .send("Created!");
});

router.get("/", async (_, res) => {
  const items = await getAllItems();

  res.json(items);
});

router.get("/:id", async (req, res) => {
  const item = await getItem(req.params.id);

  if (item) {
    res.json(item);
  } else {
    res.sendStatus(HTTP_NOT_FOUND);
  }
});

router.put("/:id", async (req, res) => {
  const updatedItem = await updateItem({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
  });

  res.sendStatus(updatedItem ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

router.delete("/:id", async (req, res) => {
  await deleteItem(req.params.id);
  res.sendStatus(HTTP_NO_CONTENT);
});

export default router;
