package lk.ijse.gdse66.helloshoes.api;

import jakarta.validation.Valid;
import lk.ijse.gdse66.helloshoes.dto.SalesDTO;
import lk.ijse.gdse66.helloshoes.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/sales")
@CrossOrigin
public class SalesController {

    @Autowired
    SaleService saleService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> saveSales(@Valid @RequestBody SalesDTO dto) {
        saleService.saveSales(dto);
        return ResponseEntity.ok().build();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/search/{id}")
    public SalesDTO getSales(@PathVariable("id") String id) {
        return saleService.searchSales(id);
    }

    @PutMapping
    public ResponseEntity<Void> updateSales(@Valid @RequestBody SalesDTO dto) {
        saleService.updateSales(dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(params = "orderId")
    public ResponseEntity<Void> deleteSales(@RequestParam("orderId") String cusId) {
        saleService.deleteSales(cusId);
        return ResponseEntity.noContent().build();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/getGenId")
    public String getCustomerGenId() {
        return saleService.getOrderGenId();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/total")
    public Integer getTotalSalecount() {
        return saleService.totalSalesCount();
    }
}
