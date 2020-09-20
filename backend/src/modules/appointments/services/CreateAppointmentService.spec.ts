import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('Creating appointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '12345677',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create tow appointments on the some time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const dateAppointment = new Date();
    await createAppointmentService.execute({
      date: dateAppointment,
      provider_id: '12345677',
    });

    expect(
      createAppointmentService.execute({
        date: dateAppointment,
        provider_id: '12345677',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
