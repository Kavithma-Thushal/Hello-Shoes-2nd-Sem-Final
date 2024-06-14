package lk.ijse.gdse66.helloshoes.repository;

import lk.ijse.gdse66.helloshoes.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InventoryRepo extends JpaRepository<Inventory, String> {

    @Query("SELECT s FROM Inventory s WHERE s.itemCode LIKE ?1%")
    List<Inventory> findByOccasion(String code);

    @Query("SELECT s FROM Inventory s WHERE SUBSTRING(s.itemCode, 2, 2) = ?1")
    List<Inventory> findByGender(String codee);

    @Query("SELECT s FROM Inventory s WHERE SUBSTRING(s.itemCode, 2, 1) = 'S' ORDER BY CASE WHEN :orderBy = 'itemDesc' THEN s.itemDesc END ASC, CASE WHEN :orderBy = 'price' THEN s.salePrice END ASC")
    List<Inventory> orderBy(@Param("orderBy") String orderBy);

    @Query(value = "SELECT COUNT(c) FROM Inventory c")
    Integer totalItemCount();
}
