package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.dto.SupplierDTO;
import lk.ijse.gdse66.helloshoes.repository.SupplierRepo;
import lk.ijse.gdse66.helloshoes.service.SupplierService;
import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.IdGenerator;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    SupplierRepo supplierRepo;

    @Autowired
    Tranformer tranformer;

    @Autowired
    IdGenerator generator;

    @Override
    public void saveSupplier(SupplierDTO dto) {
        supplierRepo.findById(dto.getSupplierCode()).ifPresentOrElse(
                customer -> {
                    throw new DuplicateRecordException("Supplier Already Exist");
                },
                () -> {
                    supplierRepo.save(tranformer.convert(dto, Tranformer.ClassType.SUP_ENTITY));
                });
    }

    @Override
    public SupplierDTO searchSupplier(String id) {
        return (SupplierDTO) supplierRepo.findById(id)
                .map(cus -> tranformer.convert(cus, Tranformer.ClassType.SUP_DTO))
                .orElseThrow(() -> new NotFoundException("Supplier Not Exist"));
    }

    @Override
    public void updateSupplier(SupplierDTO dto) {
        supplierRepo.findById(dto.getSupplierCode()).ifPresentOrElse(
                customer -> {
                    supplierRepo.save(tranformer.convert(dto, Tranformer.ClassType.SUP_ENTITY));
                },
                () -> {
                    throw new NotFoundException("Supplier Not Exist");
                });
    }

    @Override
    public void deleteSupplier(String id) {
        supplierRepo.findById(id).ifPresentOrElse(
                customer -> supplierRepo.deleteById(id),
                () -> {
                    throw new NotFoundException("Supplier Not Exist");
                }
        );
    }

    @Override
    public List<SupplierDTO> getAllSuppliers() {
        return tranformer.convert(supplierRepo.getAllSuppliers(), Tranformer.ClassType.SUP_DTO_LIST);
    }

    @Override
    public String getSupplierGenId() {
        return generator.getGenerateID(supplierRepo.getSupplierIds(), IdGenerator.GenerateTypes.SUPPLIER);
    }
}
