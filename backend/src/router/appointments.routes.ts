import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (req, res) => res.json(appointmentRepository.all()));

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;
    const parseDate = parseISO(date);
    const createAppointmentService = new CreateAppointmentService(appointmentRepository);
    const appointment = createAppointmentService.execute({ provider, date: parseDate });
    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});


export default appointmentsRouter;
