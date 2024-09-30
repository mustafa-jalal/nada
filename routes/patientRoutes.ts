import { Router } from 'express';
import { index, checkIn, deletePatient } from '../controllers/patientsController';

const patientRouter = Router();

// List patients with pagination
patientRouter.get('/', index);

// Check-in new patient
patientRouter.post('/check-in', checkIn);

// Delete patient
patientRouter.post('/delete/:id', deletePatient);

export { patientRouter };
