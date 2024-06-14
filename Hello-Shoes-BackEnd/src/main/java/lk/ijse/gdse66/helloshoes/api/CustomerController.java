package lk.ijse.gdse66.helloshoes.api;

import jakarta.validation.Valid;
import lk.ijse.gdse66.helloshoes.dto.CustomerDTO;
import lk.ijse.gdse66.helloshoes.dto.MessageDTO;
import lk.ijse.gdse66.helloshoes.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    CustomerService cusService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> saveCustomer(@Valid @RequestBody CustomerDTO dto) {
        cusService.saveCustomer(dto);
        return ResponseEntity.ok().build();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/search/{id:C00-0*[1-9]\\d{0,2}}")
    public CustomerDTO getCustomer(@PathVariable("id") String id) {
        return cusService.searchCustomer(id);
    }

    @PutMapping
    public ResponseEntity<Void> updateCustomer(@Valid @RequestBody CustomerDTO dto) {
        cusService.updateCustomer(dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(params = "cusId")
    public ResponseEntity<Void> deleteCustomer(@RequestParam("cusId") String cusId) {
        cusService.deleteCustomer(cusId);
        return ResponseEntity.noContent().build();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/getAll")
    public List<CustomerDTO> getAllCustomers() {
        return cusService.getAllCustomer();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/getGenId")
    public String getCustomerGenId() {
        return cusService.getCustomerGenId();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/total")
    public Integer getTotalCustomerCount() {
        return cusService.getTotalCustomerCount();
    }

    @PostMapping(path = "/send")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> sendOffer(@RequestBody MessageDTO dto) {
        cusService.sendOffer(dto);
        return ResponseEntity.ok().build();
    }
}
