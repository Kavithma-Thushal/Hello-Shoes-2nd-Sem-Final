package lk.ijse.gdse66.helloshoes.service;


import lk.ijse.gdse66.helloshoes.dto.CustomerDTO;
import lk.ijse.gdse66.helloshoes.dto.MessageDTO;

import java.util.List;

public interface CustomerService {

    void saveCustomer(CustomerDTO dto);

    CustomerDTO searchCustomer(String id);

    void updateCustomer(CustomerDTO dto);

    void deleteCustomer(String id);

    List<CustomerDTO> getAllCustomer();

    String getCustomerGenId();

    Integer getTotalCustomerCount();

    void sendOffer(MessageDTO dto);
}
