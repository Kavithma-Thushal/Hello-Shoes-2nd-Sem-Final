package lk.ijse.gdse66.helloshoes.service.impl;

import jakarta.mail.MessagingException;
import lk.ijse.gdse66.helloshoes.dto.CustomerDTO;
import lk.ijse.gdse66.helloshoes.dto.MessageDTO;
import lk.ijse.gdse66.helloshoes.repository.CustomerRepo;
import lk.ijse.gdse66.helloshoes.service.CustomerService;
import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.IdGenerator;
import lk.ijse.gdse66.helloshoes.service.util.LoyaltyLevel;
import lk.ijse.gdse66.helloshoes.service.util.Sender;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    Tranformer tranformer;

    @Autowired
    IdGenerator generator;

    @Autowired
    Sender sender;

    @Override
    public void saveCustomer(CustomerDTO dto) {
        String mass = "Welcome to Hello Shoes!\n" +
                "\n" +
                "Hello,\n" +
                "\n" +
                "We're thrilled to welcome you to Hello Shoes, your one-stop destination for stylish and comfortable footwear!\n" +
                "\n" +
                "Whether you're looking for the latest trends or classic styles, we have something for everyone. From sneakers to sandals, boots to flats, our collection caters to all tastes and occasions.\n" +
                "\n" +
                "As a valued customer, we want to ensure you have the best shopping experience with us. If you have any questions about our products or need assistance with your order, feel free to reach out to our friendly customer support team at support@helloshoes.com.\n" +
                "\n" +
                "Thank you for choosing Hello Shoes. We look forward to serving you!\n" +
                "\n" +
                "Best regards,\n" +
                "Hello Shoes Team";
        customerRepo.findById(dto.getCustomerId()).ifPresentOrElse(customer -> {
            log.error("Customer Already Exist");
            throw new DuplicateRecordException("Customer Already Exist");
        }, () -> {
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
            if (dto.getLoyaltyDate() != null) {
                LoyaltyLevel loyalty = setCustomerLevel(dto.getTotalPoints());
                if (loyalty != null) {
                    dto.setLevel(loyalty);
                }
            }

            customerRepo.save(tranformer.convert(dto, Tranformer.ClassType.CUS_ENTITY));
            log.info("Customer " + dto.getCustomerId() + " Save successfully");

            try {
                if (sender.checkConnection()) {
                    sender.outMail(mass, dto.getEmail(), "Welcome to Hello Shoes!");
                    log.info("Mail send to Customer " + dto.getCustomerId() + " successfully");
                } else {
                    System.err.println("Failed connect mail server.");
                }
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        });
    }

    @Override
    public CustomerDTO searchCustomer(String id) {
        return (CustomerDTO) customerRepo.findById(id)
                .map(cus -> tranformer.convert(cus, Tranformer.ClassType.CUS_DTO))
                .orElseThrow(() -> new NotFoundException("Customer Not Exist"));
    }

    @Override
    public void updateCustomer(CustomerDTO dto) {
        customerRepo.findById(dto.getCustomerId()).ifPresentOrElse(
                customer -> {
                    String proPic = dto.getProPic();
                    if (proPic != null) {
                        if ("assets/images/walk.gif".equals(proPic)) {
                            dto.setProPic(customer.getProPic());
                        }
                        if (dto.getLoyaltyDate() != null) {
                            LoyaltyLevel loyalty = setCustomerLevel(dto.getTotalPoints());
                            if (loyalty != null) {
                                dto.setLevel(loyalty);
                            }
                        }
                        customerRepo.save(tranformer.convert(dto, Tranformer.ClassType.CUS_ENTITY));
                        log.info("Update Customer " + dto.getCustomerId() + " successfully");
                    } else {
                        log.error("Customer ProPic Not Exist");
                        throw new NotFoundException("Customer ProPic Not Exist");
                    }
                },
                () -> {
                    log.error("Customer Not Exist");
                    throw new NotFoundException("Customer Not Exist");
                });
    }

    @Override
    public void deleteCustomer(String id) {
        customerRepo.findById(id).ifPresentOrElse(
                customer -> {
                    customerRepo.deleteById(id);
                    log.info("Delete user " + id + " successfully");
                },
                () -> {
                    log.error("Customer Not Exist");
                    throw new NotFoundException("Customer Not Exist");
                }
        );
    }

    @Override
    public List<CustomerDTO> getAllCustomer() {
        return tranformer.convert(customerRepo.getAllCustomers(), Tranformer.ClassType.CUS_DTO_LIST);
    }

    @Override
    public String getCustomerGenId() {
        return generator.getGenerateID(customerRepo.getCusId(), IdGenerator.GenerateTypes.CUSTOMER);
    }

    @Override
    public Integer getTotalCustomerCount() {
        return customerRepo.totalCustomerCount();
    }

    @Override
    public void sendOffer(MessageDTO dto) {
        if (dto.getSubject().equals("") || dto.getMessage().equals("")) {
            throw new NotFoundException("Message or Subject is Empty");
        }
        List<String> emails = customerRepo.getAllEmails();
        if (emails != null) {
            for (String email : emails) {
                try {
                    if (sender.checkConnection()) {
                        sender.outMail(dto.getMessage(), email, dto.getSubject());
                    } else {
                        System.err.println("Failed connect mail server.");
                    }
                } catch (MessagingException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private LoyaltyLevel setCustomerLevel(Integer check) {
        if (check < 50) {
            return LoyaltyLevel.NEW;
        } else if (check < 100) {
            return LoyaltyLevel.BRONZE;
        } else if (check < 200) {
            return LoyaltyLevel.SILVER;
        } else {
            return LoyaltyLevel.GOLD;
        }
    }
}
