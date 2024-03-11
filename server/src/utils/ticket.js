// projectService.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Function to add a new project
export const addProject = async (name, description) => {
    try {
        const project = await prisma.project.create({
            data: {
                name,
                description
            }
        });
        return project;
    } catch (error) {
        console.error("Error adding project:", error);
        throw error;
    }
};

// Function to delete a project by ID
export const deleteProject = async (projectId) => {
    try {
        await prisma.project.delete({
            where: {
                id: projectId
            }
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
};

// Function to add a new bug
export const addTickect = async (title, description, projectId) => {
    try {
        const ticket= await prisma.ticket.create({
            data: {
                title,
                description,
                status: "TO_DO",
                projectId

            }
        });
        return ticket;
    } catch (error) {
        console.error("Error adding ticket:", error);
        throw error;
    }
};

// Function to delete a bug by ID
export const deleteTicket = async (ticketId) => {
    try {
        await prisma.ticket.delete({
            where: {
                id: ticketId
            }
        });
    } catch (error) {
        console.error("Error deleting ticket:", error);
        throw error;
    }
};

// Function to update a project by ID
export const updateProject = async (projectId, newData) => {
    try {
        const updatedProject = await prisma.project.update({
            where: {
                id: projectId
            },
            data: newData
        });
        return updatedProject;
    } catch (error) {
        console.error("Error updating project:", error);
        throw error;
    }
};

// Function to update a bug by ID
export const updateTicket = async (ticketId, newData) => {
    try {
        const updatedTicket = await prisma.ticket.update({
            where: {
                id: ticketId
            },
            data: newData
        });
        return updatedTicket;
    } catch (error) {
        console.error("Error updating bug:", error);
        throw error;
    }
};

// Close the Prisma client connection
export const closeConnection = async () => {
    await prisma.$disconnect();
};



