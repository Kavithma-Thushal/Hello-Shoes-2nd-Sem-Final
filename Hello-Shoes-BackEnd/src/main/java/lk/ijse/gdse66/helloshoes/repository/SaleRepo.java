package lk.ijse.gdse66.helloshoes.repository;

import lk.ijse.gdse66.helloshoes.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SaleRepo extends JpaRepository<Sales, String> {

    @Query(value = "SELECT CAST(SUBSTRING(order_no, 5) AS SIGNED) AS order_no FROM sales ORDER BY order_no DESC LIMIT 1", nativeQuery = true)
    String getOrderId();

    @Query(value = "SELECT COUNT(s) FROM Sales s")
    Integer totalSalesCount();
}
