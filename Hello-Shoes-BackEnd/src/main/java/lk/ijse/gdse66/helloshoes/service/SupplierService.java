package lk.ijse.gdse66.helloshoes.service;

import lk.ijse.gdse66.helloshoes.dto.SupplierDTO;

import java.util.List;

public interface SupplierService {

    void saveSupplier(SupplierDTO dto);

    SupplierDTO searchSupplier(String id);

    void updateSupplier(SupplierDTO dto);

    void deleteSupplier(String id);

    List<SupplierDTO> getAllSuppliers();

    String getSupplierGenId();
}
