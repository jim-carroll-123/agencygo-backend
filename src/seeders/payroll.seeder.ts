import { PayrollModel } from '../models/payroll.model';
import { EmployeeModel } from '../models/employee.model';
import mongoose, { ConnectOptions } from 'mongoose';
import { dbConnection } from '../database';

mongoose.connect(dbConnection.url, dbConnection.options as ConnectOptions).then(client => {
  console.log('Connected to db, now seeding....');
});

EmployeeModel.find().then(async emps => {
  const number_of_payouts = 10;
  for (const emp of emps) {
    const hourlyPay = parseFloat((Math.random() * 30).toFixed(2));
    console.log(hourlyPay);
    const payments = [];
    for (let i = 0; i < number_of_payouts; i++) {
      const totalHours = parseFloat((Math.random() * 40).toFixed(2));
      const commissionEarned = parseFloat((Math.random() * 300).toFixed(2));
      const bonus = parseFloat((Math.random() * 1000).toFixed(2));
      const totalPayment = hourlyPay * totalHours + commissionEarned + bonus;
      const status = Math.random() > 0.5;
      payments.push({
        employeeId: emp._id,
        hourlyPay: hourlyPay.toFixed(2),
        commissionEarned: commissionEarned.toFixed(),
        bonus: bonus.toFixed(2),
        status,
        totalHours: totalHours.toFixed(2),
        totalPayment,
      });
    }
    await PayrollModel.insertMany(payments);
  }
});
