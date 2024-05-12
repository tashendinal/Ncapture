import { Router } from 'express';
import mediaAssignsController from '../controllers/mediaAssigns.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const mediaAssignsRouter = Router();

// Assign multiple media members to an event
mediaAssignsRouter.post('/events/:eventId/assign', mediaAssignsController.assignMediaMembers);

// Get all media member assignments for an event
mediaAssignsRouter.get('/events/:eventId/assignments', mediaAssignsController.getEventAssignments);

// Remove a media member assignment
mediaAssignsRouter.delete('/assignments/:assignmentId', mediaAssignsController.removeAssignment);

// Get all assignments for a media member
mediaAssignsRouter.get('/assignments', authMiddleware, mediaAssignsController.getAssignments);

// Accept or decline an assignment
mediaAssignsRouter.put('/assignments/:assignmentId', mediaAssignsController.updateAssignmentStatus);

export default mediaAssignsRouter;