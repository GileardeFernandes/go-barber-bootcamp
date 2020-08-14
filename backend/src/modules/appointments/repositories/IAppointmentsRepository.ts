import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentDTO from '../dtos/IAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: IAppointmentDTO): Promise<Appointment>;
  findDate(date: Date): Promise<Appointment | undefined>;
}
