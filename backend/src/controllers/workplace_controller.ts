import { Request, Response } from "express";
import { getErrorMessage } from "@/utils/error_handler.js";
import { createWorkspace, deleteWorkspace, getAllWorkspaces } from "@/models/workspace_model.js";

export const createNewWorkspace = async (req: Request, res: Response) => {
  const { workspace_name, owner_id } = req.body;

  if (!owner_id) {
    return res.status(401).json({ message: "Unauthorized, Please Login" });
  }

  try {
    const workspace = await createWorkspace(workspace_name, owner_id);
    return res
      .status(200)
      .json({ message: "Workspace created successfully", data: workspace });
  } catch (error) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const fetchEveryWorkspace = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const limitNum = limit ? Number(limit) : 10;
  const offsetNum = offset ? Number(offset) : 0;
  try {

    const workspace = await getAllWorkspaces(limitNum, offsetNum)

    if (workspace.length === 0) return res.status(200).json({ message: "No Workspace Found" })

    return res.status(200).json({ message: "Workspace Fetched Successfully", data: workspace })

  } catch (error) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const removeWorkspace = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);

  if (isNaN(idNum)) {
    return res.status(400).json({ message: "Invalid ID" })
  }
  try {
    const workspace = await deleteWorkspace(idNum);
    return res
      .status(200)
      .json({ message: "Workspace deleted successfully", data: workspace });
  } catch (error) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
}

