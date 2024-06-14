package lk.ijse.gdse66.helloshoes.repository;

import lk.ijse.gdse66.helloshoes.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupplierRepo extends JpaRepository<Supplier, String> {

    @Query(value = "SELECT CAST(SUBSTRING(supplier_code, 5) AS SIGNED) AS supplier_code FROM supplier ORDER BY supplier_code DESC LIMIT 1", nativeQuery = true)
    String getSupplierIds();

    @Query(value = "SELECT * FROM supplier ORDER BY CAST(SUBSTRING(supplier_code, 5) AS SIGNED), SUBSTRING(supplier_code, 1, 4)", nativeQuery = true)
    List<Supplier> getAllSuppliers();
}
