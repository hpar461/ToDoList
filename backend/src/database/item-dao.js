import { Item } from "./schema";

async function createItem(item) {
  const dbItem = new Item(item);
  await dbItem.save();
  return dbItem;
}

async function getAllItems() {
  return await Item.find();
}

async function getItem(id) {
  return await Item.findById(id);
}

async function updateItem(item) {
  const dbItem = await Item.findById(item._id);

  if (dbItem) {
    dbItem.name = item.name;
    dbItem.description = item.description;
    await dbItem.save();
    return true;
  }

  return false;
}

async function deleteItem(id) {
  await Item.deleteOne({ _id: id });
}

export { createItem, getAllItems, getItem, updateItem, deleteItem };
