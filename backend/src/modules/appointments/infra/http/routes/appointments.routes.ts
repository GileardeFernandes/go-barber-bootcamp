import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointment = await appointmentRepository.find();
  res.json(appointment);
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;
  const parseDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();
  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parseDate,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
