import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} from "../controllers/resource.controller";

const router = express.Router();

router.post("/", createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
