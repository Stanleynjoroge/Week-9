import express from "express";
import {
  addProject,
  addTickect,
  deleteProject,
  deleteTicket,
  updateProject,
  updateTicket,
} from "../utils/ticket.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const project = await prisma.project.findMany({});
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error internal server error" + error);
  }
});

router.get("/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (projectId) {
      const project = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } else {
      // Handle if no projectId is provided
      res.status(400).json({ message: "Please provide a project ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error: " + error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { id, name, description } = req.body;

    const project = await addProject(id, name, description);
    res.status(201).send({ status: "success", project });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).send({ status: "fail", error: "Internal server error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const projectId = req.query.id; // Extract project ID from request parameters

    // Delete tickets associated with the project
    try {
      const existingTickets = await prisma.ticket.findMany({
        where: {
            projectId: projectId,
        },
    });
    if (existingTickets.length > 0) {
      await prisma.ticket.deleteMany({
        where: {
          projectId: projectId,
        },
      });
      console.log(
        "Tickets associated with project",
        projectId,
        "deleted successfully"
      );
    } else {
      console.log("No tickets found for project", projectId);
  }
    } catch (ticketError) {
      console.error("Error deleting tickets:", ticketError); //
      return res.status(400).json({
        message: "Failed to delete tickets associated with the project",
      }); //
    }

    // Delete the project
    try {
      await deleteProject(projectId);
      console.log("Project with ID", projectId, "deleted successfully");
      res.json({ message: "Deleted Project with ID: " + projectId });
    } catch (projectError) {
      console.error("Error deleting project:", projectError);
      res.status(400).json({ message: "Failed to delete project" });
    }
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(400).json({ message: "Failed to delete project" });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const newData = req.body;

    await updateProject(projectId, newData);
    res.status(200).send({ message: "Project updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

export default router;
