import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '122121',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('122121');
  });

  it('should not be able to create appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '122121',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '122121',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
