import { Request, Response } from "express";
import {
  createWorkspace,
  deleteWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  softDeleteWorkspace,
  restoreWorkspace,
} from "@/models/workspace_model.js";
import {
  getMembersByWorkspaceId,
  insertWorkspaceMember,
  removeWorkspaceMember,
  removeWorkspaceMemberByUser,
  executeTransferOwnership,
} from "@/models/workspace_member_model.js";

export const createNewWorkspace = async (req: Request, res: Response) => {
  const { workspace_name, workspace_description, owner_id } = req.body;

  if (!owner_id) {
    return res.status(401).json({ message: "Unauthorized, Please Login" });
  }

  if (!workspace_name) {
    return res
      .status(400)
      .json({ message: "Invalid Workspace Name Please Try Again." });
  }

  try {
    const workspace = await createWorkspace(
      workspace_name,
      workspace_description,
      owner_id,
    );
    return res
      .status(200)
      .json({ message: "Workspace created successfully", data: workspace });
  } catch (error) {
    // console.error("Error creating workspace:", error);
    return res
      .status(500)
      .json({ message: "Error While Creating Workspace. Please Try Again" });
  }
};

export const fetchEveryWorkspace = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const limitNum = limit ? Number(limit) : 10;
  const offsetNum = offset ? Number(offset) : 0;

  if (isNaN(limitNum) || isNaN(offsetNum)) {
    return res
      .status(400)
      .json({ message: "Invalid Limit or Offset Please Try Again." });
  }

  try {
    const workspace = await getAllWorkspaces(limitNum, offsetNum);

    if (workspace.length === 0)
      return res.status(200).json({ message: "No Workspace Found" });

    return res
      .status(200)
      .json({ message: "Workspace Fetched Successfully", data: workspace });
  } catch (error) {
    // console.error("Error fetching workspaces:", error);
    return res
      .status(500)
      .json({ message: "Error While Fetching Workspaces. Please Try Again" });
  }
};

export const removeWorkspace = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);

  if (isNaN(idNum)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const workspace = await getWorkspaceById(idNum);
    if (!workspace || workspace.deleted_at !== null) {
      return res.status(404).json({ message: "Workspace Not Found" });
    }

    if (req.user?.role !== "admin" && workspace.owner_id !== req.user?.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const result = await softDeleteWorkspace(idNum);
    return res
      .status(200)
      .json({ message: "Workspace deleted successfully", data: result });
  } catch (error) {
    // console.error("Error deleting workspace:", error);
    return res
      .status(500)
      .json({ message: "Error While Deleting Workspace. Please Try Again" });
  }
};

export const hardDeleteWorkspace = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);

  if (isNaN(idNum)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const workspace = await deleteWorkspace(idNum);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace Not Found" });
    }
    return res.status(200).json({
      message: "Workspace hard deleted successfully",
      data: workspace,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error While Hard Deleting Workspace. Please Try Again",
    });
  }
};

export const recoverWorkspace = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);

  if (isNaN(idNum)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const workspace = await restoreWorkspace(idNum);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Workspace restored successfully", data: workspace });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Restoring Workspace. Please Try Again" });
  }
};

export const fetchWorkspaceMembers = async (req: Request, res: Response) => {
  const { id, limit, offset, role } = req.params;
  const idNum = Number(id);
  const limitNum = Number(limit) || 10;
  const offsetNum = Number(offset) || 0;
  const roleStr = role?.toString() || undefined;

  if (isNaN(idNum)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const workspaceMembers = await getMembersByWorkspaceId(
      idNum,
      limitNum,
      offsetNum,
    );

    if (workspaceMembers.length === 0) {
      return res
        .status(200)
        .json({ message: "Your Alone No Member Found in Your Workspace" });
    }

    return res.status(200).json({
      message: "Workspace Members Fetched Successfully",
      data: workspaceMembers,
    });
  } catch (error) {
    // console.error("Error fetching workspace members:", error);
    return res.status(500).json({
      message: "Error While Fetching Workspace Members. Please Try Again",
    });
  }
};

export const kickoutWorkspaceMember = async (req: Request, res: Response) => {
  const { id, workspace_id } = req.params;
  const idNum = Number(id);
  const workspaceId = Number(workspace_id);

  if (isNaN(idNum) || isNaN(workspaceId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const workspaceMember = await removeWorkspaceMember(idNum, workspaceId);

    if (!workspaceMember) {
      return res.status(404).json({ message: "Workspace Member Not Found" });
    }
    return res.status(200).json({
      message: "Workspace Member Removed Successfully",
      data: workspaceMember,
    });
  } catch (error) {
    // console.error("Error kicking out workspace member:", error);
    return res.status(500).json({
      message: "Error While Removing Workspace Member. Please Try Again",
    });
  }
};

export const inviteWorkspaceMember = async (req: Request, res: Response) => {
  const { workspace_id, user_id, role } = req.body;

  const workspaceId = Number(workspace_id);
  const userId = Number(user_id);

  if (isNaN(userId)) {
    return res
      .status(400)
      .json({ message: "Invalid User Please Select Another User" });
  }

  try {
    const workspaceMember = await insertWorkspaceMember(
      workspaceId,
      userId,
      role,
    );
    return res.status(200).json({
      message: "Workspace Member Added Successfully",
      data: workspaceMember,
    });
  } catch (error) {
    // console.error("Error inviting workspace member:", error);
    return res.status(500).json({
      message: "Error While Adding Workspace Member. Please Try Again",
    });
  }
};

export const transferOwnership = async (req: Request, res: Response) => {
  const { workspace_id, owner_id, newOwner_id } = req.body;

  const workspaceId = Number(workspace_id);
  const ownerId = Number(owner_id);
  const newOwnerId = Number(newOwner_id);

  if (isNaN(workspaceId) || isNaN(ownerId) || isNaN(newOwnerId)) {
    return res.status(400).json({
      message:
        "Invalid Workspace ID, Owner ID or New Owner ID Please Try Again.",
    });
  }

  try {
    const result = await executeTransferOwnership(
      workspaceId,
      ownerId,
      newOwnerId,
    );
    return res.status(200).json({
      message: "Ownership Transferred Successfully",
      data: {
        removeOwner: result.removeOwner,
        addNewOwner: result.addNewOwner,
      },
    });
  } catch (error) {
    // console.error("Error transferring ownership:", error);
    return res
      .status(500)
      .json({ message: "Error Transferring Ownership. Please Try Again" });
  }
};

export const leaveWorkspace = async (req: Request, res: Response) => {
  const { user_id, workspace_id } = req.body;

  const userId = Number(user_id);
  const workspaceId = Number(workspace_id);

  if (isNaN(userId) || isNaN(workspaceId)) {
    return res
      .status(400)
      .json({ message: "Invalid User ID or Workspace ID Please Try Again." });
  }

  try {
    const workspaceMember = await removeWorkspaceMemberByUser(
      userId,
      workspaceId,
    );

    if (!workspaceMember) {
      return res.status(404).json({ message: "Workspace Member Not Found" });
    }

    return res.status(200).json({
      message: "Workspace Member Left Successfully",
      data: workspaceMember,
    });
  } catch (error) {
    // console.error("Error leaving workspace:", error);
    return res
      .status(500)
      .json({ message: "Error Leaving Workspace. Please Try Again" });
  }
};
