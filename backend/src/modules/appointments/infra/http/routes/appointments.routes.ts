import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';
import AppointmentsController from '../controller/AppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
const appointmentsController = new AppointmentsController();

// appointmentsRouter.get('/', async (req, res) => {

//   const appointment = await appointmentRepository.find();
//   res.json(appointment);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
