package lk.ijse.gdse66.helloshoes.service;

import lk.ijse.gdse66.helloshoes.dto.AdminPanelDTO;
import lk.ijse.gdse66.helloshoes.dto.SalesDTO;
import lk.ijse.gdse66.helloshoes.entity.AdminPanel;

public interface SaleService {

    void saveSales(SalesDTO dto);

    SalesDTO searchSales(String id);

    void updateSales(SalesDTO dto);

    void deleteSales(String id);

    AdminPanel getAdminPanel();

    AdminPanelDTO getAdminPanelDetails();

    Integer totalSalesCount();

    String getOrderGenId();
}
