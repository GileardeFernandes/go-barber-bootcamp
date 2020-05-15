import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppintmentDTO {
  provider:String;
  date: Date;
}

class AppointmentRepository {
 private appointments:Appointment[] = [];

 constructor() {
   this.appointments = [];
 }

 public all():Array<Appointment> {
   return this.appointments;
 }

 public create({ provider, date }:CreateAppintmentDTO):Appointment {
   const appointment = new Appointment({ provider, date });
   this.appointments.push(appointment);
   return appointment;
 }

 public findDate(date: Date) :Appointment | null {
   const appointment = this.appointments.find((v) => isEqual(v.date, date));
   return appointment || null;
 }
}

export default AppointmentRepository;
