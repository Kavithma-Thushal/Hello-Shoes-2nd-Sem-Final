package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.dto.InventoryDTO;
import lk.ijse.gdse66.helloshoes.entity.Supplier;
import lk.ijse.gdse66.helloshoes.repository.InventoryRepo;
import lk.ijse.gdse66.helloshoes.repository.SupplierRepo;
import lk.ijse.gdse66.helloshoes.service.InventoryService;
import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    InventoryRepo inventoryRepo;

    @Autowired
    SupplierRepo supplierRepo;

    @Autowired
    Tranformer tranformer;

    @Override
    public void saveInventory(InventoryDTO dto) {
        inventoryRepo.findById(dto.getItemCode()).ifPresentOrElse(
                customer -> {
                    throw new DuplicateRecordException("Item Already Exist");
                },
                () -> {
                    String proPic = dto.getItemPicture();
                    if (proPic != null) {
                        if ("assets/images/walk.gif".equals(proPic)) {
                            throw new NotFoundException("Item Pic Not Exist");
                        }
                        Supplier supplier = supplierRepo.findById(dto.getSupplier().getSupplierCode())
                                .orElseThrow(() -> new NotFoundException("Supplier not found"));
                        dto.setSupplierName(supplier.getSupplierName());
                        dto.setOriginalQty(dto.getQty());
                        inventoryRepo.save(tranformer.convert(dto, Tranformer.ClassType.ITEM_ENTITY));
                    } else {
                        throw new NotFoundException("Item Pic Not Exist");
                    }
                });
    }

    @Override
    public InventoryDTO searchInventory(String id) {
        return (InventoryDTO) inventoryRepo.findById(id)
                .map(emp -> tranformer.convert(emp, Tranformer.ClassType.ITEM_DTO))
                .orElseThrow(() -> new NotFoundException("Item Not Exist"));
    }

    @Override
    public void updateInventory(InventoryDTO dto) {
        inventoryRepo.findById(dto.getItemCode()).ifPresentOrElse(
                inventory -> {
                    String proPic = dto.getItemPicture();
                    if (proPic != null) {
                        if ("assets/images/walk.gif".equals(proPic)) {
                            dto.setItemPicture(inventory.getItemPicture());
                        }
                        Supplier supplier = supplierRepo.findById(dto.getSupplier().getSupplierCode())
                                .orElseThrow(() -> new NotFoundException("Supplier not found"));
                        dto.setSupplierName(supplier.getSupplierName());
                        if (inventory.getOriginalQty() < dto.getQty()) {
                            dto.setOriginalQty(dto.getQty());
                        } else {
                            dto.setOriginalQty(inventory.getOriginalQty());
                        }
                        inventoryRepo.save(tranformer.convert(dto, Tranformer.ClassType.ITEM_ENTITY));
                    } else {
                        throw new NotFoundException("Item Pic Not Exist");
                    }
                },
                () -> {
                    throw new NotFoundException("Item Not Exist");
                });
    }

    @Override
    public void deleteInventory(String id) {
        inventoryRepo.findById(id).ifPresentOrElse(
                customer -> inventoryRepo.deleteById(id),
                () -> {
                    throw new NotFoundException("Item Not Exist");
                }
        );
    }

    @Override
    public List<InventoryDTO> getAllInventory() {
        return tranformer.convert(inventoryRepo.findAll(), Tranformer.ClassType.ITEM_DTO_LIST);
    }

    @Override
    public List<InventoryDTO> getAllSortedInventory(String value) {
        if (value.equals("SM") || value.equals("SW")) {
            return tranformer.convert(inventoryRepo.findByGender(value), Tranformer.ClassType.ITEM_DTO_LIST);
        } else if (value.equals("FS") || value.equals("CS")) {
            return tranformer.convert(inventoryRepo.findByOccasion(value), Tranformer.ClassType.ITEM_DTO_LIST);
        } else if (value.equals("itemDesc") || value.equals("price")) {
            return tranformer.convert(inventoryRepo.orderBy(value), Tranformer.ClassType.ITEM_DTO_LIST);
        } else {
            return null;
        }
    }

    @Override
    public Integer getTotalItemCount() {
        return inventoryRepo.totalItemCount();
    }
}
