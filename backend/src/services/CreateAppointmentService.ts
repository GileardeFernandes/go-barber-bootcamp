import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const parsedDate = startOfHour(date);
    const findAppointmentSameDate = await appointmentRepository.findDate(
      parsedDate,
    );

    if (findAppointmentSameDate) {
      throw Error('This appointment already booked !');
    }
    const appointment = appointmentRepository.create({
      provider_id,
      date: parsedDate,
    });
    await appointmentRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
