package lk.ijse.gdse66.helloshoes.service.impl;

import jakarta.mail.MessagingException;
import lk.ijse.gdse66.helloshoes.dto.EmployeeDTO;
import lk.ijse.gdse66.helloshoes.repository.EmployeeRepo;
import lk.ijse.gdse66.helloshoes.service.EmployeeService;
import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.IdGenerator;
import lk.ijse.gdse66.helloshoes.service.util.Sender;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    EmployeeRepo employeeRepo;

    @Autowired
    Tranformer tranformer;

    @Autowired
    IdGenerator generator;

    @Autowired
    Sender sender;

    @Override
    public void saveEmployee(EmployeeDTO dto) {
        String mass = "Welcome to Hello Shoes!\n" +
                "\n" +
                "Dear " + dto.getEmployeeName() + ",\n" +
                "\n" +
                "Welcome to Hello Shoes! We're thrilled to have you join us as a valued member of our shoe-loving community.\n" +
                "\n" +
                "At Hello Shoes, we're passionate about providing you with the latest trends and styles in footwear, all while delivering exceptional service that exceeds your expectations.\n" +
                "\n" +
                "As a registered member, you'll enjoy exclusive perks, including early access to sales, personalized recommendations, and much more. We're here to make sure you always step out in style!\n" +
                "\n" +
                "Should you have any questions or need assistance with anything, please don't hesitate to reach out to our friendly customer service team at support@helloshoes.com or call us at +94 123 456 789. We're here to ensure your shopping experience with us is nothing short of amazing.\n" +
                "\n" +
                "Thank you for choosing Hello Shoes. We can't wait to help you find your perfect pair!\n" +
                "\n" +
                "Warm regards,\n" +
                "\n" +
                "Hello Shoes Team";
        employeeRepo.findById(dto.getEmployeeId()).ifPresentOrElse(
                customer -> {
                    throw new DuplicateRecordException("Employee Already Exist");
                },
                () -> {
                    String proPic = dto.getProPic();
                    /*if (proPic != null && proPic.startsWith("data:image/png;base64,")) {
                        String base64Data = dto.getProPic().substring(dto.getProPic().indexOf(",") + 1);
                        byte[] imageData = Base64.getDecoder().decode(base64Data);
                        String uploadsDirectory = "E:\\Spring Project\\BackEnd\\src\\main\\resources\\cusGallery";
                        String filename = dto.getCustomerId() + ".png";
                        String filePath = uploadsDirectory + File.separator + filename;
                        try {
                            FileUtils.writeByteArrayToFile(new File(filePath), imageData);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }*/
                    /*if (proPic != null && !proPic.startsWith("data:image/png;base64,")) {
                        Base64.getEncoder().encodeToString(profilePic.getBytes());
                    }*/
                    employeeRepo.save(tranformer.convert(dto, Tranformer.ClassType.EMP_ENTITY));
                    try {
                        if (sender.checkConnection()) {
                            sender.outMail(mass, dto.getEmail(), "Welcome to Hello Shoes!");
                        } else {
                            System.err.println("Failed connect mail server.");
                        }
                    } catch (MessagingException e) {
                        e.printStackTrace();
                    }
                });
    }

    @Override
    public void updateEmployee(EmployeeDTO dto) {
        employeeRepo.findById(dto.getEmployeeId()).ifPresentOrElse(
                employee -> {
                    String proPic = dto.getProPic();
                    if (proPic != null) {
                        if ("assets/images/walk.gif".equals(proPic)) {
                            dto.setProPic(employee.getProPic());
                        }
                        employeeRepo.save(tranformer.convert(dto, Tranformer.ClassType.EMP_ENTITY));
                    } else {
                        throw new NotFoundException("Employee ProPic Not Exist");
                    }
                },
                () -> {
                    throw new NotFoundException("Employee Not Exist");
                });
    }

    @Override
    public void deleteEmployee(String id) {
        employeeRepo.findById(id).ifPresentOrElse(
                customer -> employeeRepo.deleteById(id),
                () -> {
                    throw new NotFoundException("Employee Not Exist");
                }
        );
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return tranformer.convert(employeeRepo.getAllEmployees(), Tranformer.ClassType.EMP_DTO_LIST);
    }

    @Override
    public EmployeeDTO searchEmployee(String id) {
        return (EmployeeDTO) employeeRepo.findById(id)
                .map(emp -> tranformer.convert(emp, Tranformer.ClassType.EMP_DTO))
                .orElseThrow(() -> new NotFoundException("Employee Not Exist"));
    }

    @Override
    public String getEmployeeGenId() {
        return generator.getGenerateID(employeeRepo.getEmployeeIds(), IdGenerator.GenerateTypes.EMPLOYEE);
    }
}
