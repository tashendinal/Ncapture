
import HttpStatusCode from '../enums/HttpStatusCode.js';
import eventModel from '../models/event.js';
import eventAssignsModel from '../models/eventAssigns.js';

const mediaAssignsController = {
    // Media Admin Routes
    assignMediaMembers: async (req, res) => {
        try {
            const { eventId } = req.params;
            const members = req.body;
            console.log("asd", req.body);
            // Check if the event exists
            const event = await eventModel.findById(eventId);
            if (!event) {
                return res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Event not found' });
            }
    
            // Remove existing media member assignments for the current event
            await eventAssignsModel.deleteMany({ event: eventId });
    
            // Create an array to store all the assignments to be inserted
            const assignments = members.map(member => ({
                event: eventId,
                member: member.member,
                role: member.role,
                status: member.status,
            }));
    
            // Insert all the new assignments
            await eventAssignsModel.insertMany(assignments);
    
            res.status(HttpStatusCode.CREATED).json({ message: 'Media members assigned successfully' });
        } catch (err) {
            res.status(HttpStatusCode.INTERNAL_SERVER).json({ error: 'Something went wrong' });
        }
    },
    

    getEventAssignments: async (req, res) => {
        try {
            const { eventId } = req.params;
            console.log("asd", eventId);
    
            // Find the event and populate the media member assignments
            const event = await eventModel.findById(eventId);
            console.log("asd", event);
            if (!event) {
                return res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Event not found' });
            }
    
            const eventAssignments = await eventAssignsModel.find({ event: eventId }).populate([
                { path: 'member', model: 'users' }, // Assuming 'users' is the field referencing users
                { path: 'event', model: 'events' } // Assuming 'event' is the field referencing events
            ]);
            console.log("eventAssignments", eventAssignments);
    
            res.status(HttpStatusCode.SUCCESS).json(eventAssignments);
        } catch (err) {
            res.status(HttpStatusCode.INTERNAL_SERVER).json({ error: 'Something went wrong' });
        }
    },
    

    updateAssignment: async (req, res) => {
        try {
            const { assignmentId } = req.params;
            const { role } = req.body;

            // Find the assignment and update the role
            const assignment = await eventAssignsModel.findByIdAndUpdate(
                assignmentId,
                { role },
                { new: true }
            );

            if (!assignment) {
                return res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Assignment not found' });
            }

            res.status(HttpStatusCode.OK).json(assignment);
        } catch (err) {
            res.status(HttpStatusCode.INTERNAL_SERVER).json({ error: 'Something went wrong' });
        }
    },

    removeAssignment: async (req, res) => {
        try {
            const { assignmentId } = req.params;

            // Find and remove the assignment
            const assignment = await eventAssignsModel.findByIdAndRemove(assignmentId);

            if (!assignment) {
                return res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Assignment not found' });
            }

            res.status(HttpStatusCode.OK).json({ message: 'Assignment removed successfully' });
        } catch (err) {
            res.status(HttpStatusCode.INTERNAL_SERVER).json({ error: 'Something went wrong' });
        }
    },

    // Media Member Routes
    getAssignments: async (req, res) => {
        try {
            const memberId = req.user; // Assuming authenticated user ID is available in req.user
            console.log(memberId);
            // Find all assignments for the media member
            const assignments = await eventAssignsModel.find({ member: memberId }).populate('event');

            res.status(HttpStatusCode.CREATED).json(assignments);
        } catch (err) {
            res.status(HttpStatusCode.INTERNAL_SERVER).json({ error: 'Something went wrong' });
        }
    },

    updateAssignmentStatus: async (req, res) => {
        try {
            const { assignmentId } = req.params;
            console.log(assignmentId);
            const { status, reason } = req.body;
            console.log(req.body);
            console.log(status, reason);


            // Find and update the assignment status and reason
            const assignment = await eventAssignsModel.findByIdAndUpdate(
                assignmentId,
                { status, reason }
            );

            if (!assignment) {
                return res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Assignment not found' });
            }

            res.status(HttpStatusCode.CREATED).json(assignment);
        } catch (err) {
            console.log(err);
            res.status(HttpStatusCode.INTERNAL_SERVER).json({ error: 'Something went wrong' });
        }
    },
};

export default mediaAssignsController;