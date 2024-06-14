package lk.ijse.gdse66.helloshoes.api;

import lk.ijse.gdse66.helloshoes.dto.AdminPanelDTO;
import lk.ijse.gdse66.helloshoes.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/panel")
@CrossOrigin
public class AdminPanelController {

    @Autowired
    SaleService saleService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/getAll")
    public AdminPanelDTO getAdminPanel() {
        return saleService.getAdminPanelDetails();
    }
}
