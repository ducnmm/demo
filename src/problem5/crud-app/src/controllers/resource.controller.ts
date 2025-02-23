import { Request, Response } from "express";
import {
  createNewItem,
  findItems,
  findItemById,
  updateExistingItem,
  removeItem,
} from "../services/resource.service";

export const createItem = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const item = await createNewItem(name, description);
  res.status(201).json(item);
};

export const getItems = async (req: Request, res: Response) => {
  const items = await findItems();
  res.status(200).json(items);
};

export const getItemById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const item = await findItemById(parseInt(req.params.id));
    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const updatedItem = await updateExistingItem(
    parseInt(req.params.id),
    req.body
  );
  res.status(200).json(updatedItem);
};

export const deleteItem = async (req: Request, res: Response) => {
  await removeItem(parseInt(req.params.id));
  res.status(204).send();
};
