import { getRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IAppointmentDTO from '@modules/appointments/dtos/IAppointmentDTO';

class AppointmentRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: date,
    });
    return appointment;
  }

  public async create({
    provider_id,
    date,
  }: IAppointmentDTO): Promise<Appointment> {
    const newAppointment = await this.ormRepository.create({
      provider_id,
      date,
    });
    await this.ormRepository.save(newAppointment);

    return newAppointment;
  }
}

export default AppointmentRepository;
