import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider:String;
  date: Date;
}

class CreateAppointmentService {
    private appointmentRepository:AppointmentRepository ;

    constructor(appointmentRepository : AppointmentRepository) {
      this.appointmentRepository = appointmentRepository;
    }

    public execute({ provider, date }:Request): Appointment {
      const parsedDate = startOfHour(date);

      const findAppointmentSameDate = this.appointmentRepository.findDate(parsedDate);

      if (findAppointmentSameDate) {
        throw Error('This appointment already booked !');
      }
      const appointment = this.appointmentRepository.create({ provider, date: parsedDate });

      return appointment;
    }
}

export default CreateAppointmentService;
