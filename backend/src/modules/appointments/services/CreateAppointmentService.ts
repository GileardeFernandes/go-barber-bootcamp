import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const parsedDate = startOfHour(date);
    const findAppointmentSameDate = await this.appointmentRepository.findDate(
      parsedDate,
    );

    if (findAppointmentSameDate) {
      throw new AppError('This appointment already booked !');
    }
    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: parsedDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
