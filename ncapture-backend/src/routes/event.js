import { Router } from "express";
import eventController from "../controllers/event.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const eventRouter = new Router();

eventRouter.post("/event", authMiddleware ,  eventController.createEvent);
eventRouter.get("/event/:id", eventController.getEventById);
eventRouter.get("/events", eventController.getAllEvents);
eventRouter.put("/event/:id", eventController.updateEventById);
eventRouter.delete("/event/:id", eventController.deleteEventById);
eventRouter.post("/event/:id", eventController.updateEventStatusById);

export default eventRouter;
