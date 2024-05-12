import EHttpStatusCode from "../enums/HttpStatusCode.js";
import eventModel from "../models/event.js";

const eventController = {
    createEvent: async (req, res) => {
        console.log("create event")
        try {
            const { eventName, eventDate, eventTime, venue, invites, status, statusMessage, requiredEventRoles } = req.body;
            console.log("invites" , invites);
            const newEvent = await eventModel.create({ eventName, eventDate, eventTime, venue, createdBy: req.user , invites, status, statusMessage, requiredEventRoles });
            return res.status(EHttpStatusCode.CREATED).json({ message: "Event created successfully", event: newEvent });
        } catch (error) {
            console.error("Error creating event:", error);
            return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error creating event" });
        }
    },

    getEventById: async (req, res) => {
        try {
            const eventId = req.params.id;
            const event = await eventModel.findById(eventId).populate("createdBy");
            if (!event) {
                return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "Event not found" });
            }
            return res.status(EHttpStatusCode.SUCCESS).json({ event });
        } catch (error) {
            console.error("Error fetching event:", error);
            return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error fetching event" });
        }
    },

    getAllEvents: async (req, res) => {
        try {
            const { status, createdBy } = req.query;
            const query = {};
        
            // Filter by status
            if (status) {
              query.status = status;
            }
        
            // Filter by createdBy
            if (createdBy) {
              query.createdBy = createdBy;
            }
        
            const events = await eventModel.find(query)
              .populate('createdBy', 'firstName lastName email')
              .sort({ createdAt: -1 });
        
            return res.status(EHttpStatusCode.SUCCESS).json({ events });
          } catch (error) {
            console.error('Error fetching events:', error);
            return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: 'Error fetching events' });
          }
    },

    updateEventById: async (req, res) => {
        try {
            const eventId = req.params.id;
            const updatedEvent = req.body;
            const event = await eventModel.findByIdAndUpdate(eventId, updatedEvent, { new: true });
            if (!event) {
                return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "Event not found" });
            }
            return res.status(EHttpStatusCode.SUCCESS).json({ message: "Event updated successfully", event });
        } catch (error) {
            console.error("Error updating event:", error);
            return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error updating event" });
        }
    },

    deleteEventById: async (req, res) => {
        try {
            const eventId = req.params.id;
            const event = await eventModel.findByIdAndDelete(eventId);
            if (!event) {
                return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "Event not found" });
            }
            return res.status(EHttpStatusCode.SUCCESS).json({ message: "Event deleted successfully" });
        } catch (error) {
            console.error("Error deleting event:", error);
            return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error deleting event" });
        }
    },

    updateEventStatusById: async (req, res) => {
        try {
            const eventId = req.params.id;
            const { status } = req.body;

            if (status !== "approved" && status !== "declined") {
                return res.status(EHttpStatusCode.BAD_REQUEST).json({ message: "Invalid status" });
            }

            const updatedEvent = { status };
            const event = await eventModel.findByIdAndUpdate(eventId, updatedEvent, { new: true });
            if (!event) {
                return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "Event not found" });
            }

            const message = status === "approved" ? "Event approved successfully" : "Event declined successfully";
            return res.status(EHttpStatusCode.SUCCESS).json({ message, event });
        } catch (error) {
            console.error("Error updating event status:", error);
            return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error updating event status" });
        }
    }
};

export default eventController;
