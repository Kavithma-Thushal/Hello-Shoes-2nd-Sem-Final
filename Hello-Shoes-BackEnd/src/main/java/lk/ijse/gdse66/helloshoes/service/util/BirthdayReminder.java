package lk.ijse.gdse66.helloshoes.service.util;

import jakarta.mail.MessagingException;
import lk.ijse.gdse66.helloshoes.entity.Customer;
import lk.ijse.gdse66.helloshoes.entity.Employee;
import lk.ijse.gdse66.helloshoes.repository.CustomerRepo;
import lk.ijse.gdse66.helloshoes.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Component
public class BirthdayReminder {

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    EmployeeRepo employeeRepo;

    @Autowired
    Sender sender;

    @Scheduled(cron = "0 0 0 * * ?")
    public void sendBirthdayWishes() {
        LocalDate localDate = LocalDate.now();
        Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<Customer> cus = customerRepo.findByCustomerDob(date);
        for (Customer c : cus) {
            sendEmail(c, "cus");
        }
        List<Employee> emp = employeeRepo.findByEmployeeDob(date);
        for (Employee e : emp) {
            sendEmail(e, "emp");
        }
    }

    public void sendEmail(Object ob, String type) {
        String name = "";
        String mail = "";
        if (type.equals("cus")) {
            Customer cus = (Customer) ob;
            name = cus.getCustomerName();
            mail = cus.getEmail();
        } else if (type.equals("cus")) {
            Employee emp = (Employee) ob;
            name = emp.getEmployeeName();
            mail = emp.getEmail();
        }
        try {
            String mass = "Dear " + name + ",\n\n" +
                    "Wishing you a wonderful Birthday filled with joy and happiness!\n\n" +
                    "Best regards,\n" +
                    "Hello Shoes Team";

            if (sender.checkConnection()) {
                sender.outMail(mass, mail, "Welcome to Hello Shoes!");
            } else {
                System.err.println("Failed connect mail server.");
            }
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
