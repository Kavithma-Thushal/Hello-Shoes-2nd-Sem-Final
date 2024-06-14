package lk.ijse.gdse66.helloshoes.service;

import lk.ijse.gdse66.helloshoes.dto.InventoryDTO;

import java.util.List;

public interface InventoryService {

    void saveInventory(InventoryDTO dto);

    InventoryDTO searchInventory(String id);

    void updateInventory(InventoryDTO dto);

    void deleteInventory(String id);

    List<InventoryDTO> getAllInventory();

    List<InventoryDTO> getAllSortedInventory(String value);

    Integer getTotalItemCount();
}
