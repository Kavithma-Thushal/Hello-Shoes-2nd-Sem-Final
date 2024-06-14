package lk.ijse.gdse66.helloshoes.api;

import jakarta.validation.Valid;
import lk.ijse.gdse66.helloshoes.dto.InventoryDTO;
import lk.ijse.gdse66.helloshoes.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/inventory")
@CrossOrigin
public class InventoryController {

    @Autowired
    InventoryService itemService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> saveInventory(@Valid @RequestBody InventoryDTO dto) {
        itemService.saveInventory(dto);
        return ResponseEntity.ok().build();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/search/{id}")
    public InventoryDTO getInventory(@PathVariable("id") String id) {
        return itemService.searchInventory(id);
    }

    @PutMapping
    public ResponseEntity<Void> updateInventory(@Valid @RequestBody InventoryDTO dto) {
        itemService.updateInventory(dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(params = "itmId")
    public ResponseEntity<Void> deleteInventory(@RequestParam("itmId") String cusId) {
        itemService.deleteInventory(cusId);
        return ResponseEntity.noContent().build();
    }

    /*@ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/getAll")
    public List<InventoryDTO> getAllInventory() {
        return itemService.getAllInventory();
    }*/

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/getAll/{sort}")
    public List<InventoryDTO> getAllSortedInventory(@PathVariable("sort") String sort) {
        if (sort.equals("getAll")) {
            return itemService.getAllInventory();
        }
        return itemService.getAllSortedInventory(sort);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/total")
    public Integer getTotalItemCount() {
        return itemService.getTotalItemCount();
    }
}
