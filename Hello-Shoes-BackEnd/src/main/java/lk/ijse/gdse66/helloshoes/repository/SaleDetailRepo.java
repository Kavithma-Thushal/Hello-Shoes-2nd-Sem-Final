package lk.ijse.gdse66.helloshoes.repository;

import lk.ijse.gdse66.helloshoes.entity.SaleDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Map;

public interface SaleDetailRepo extends JpaRepository<SaleDetails, String> {

    @Query("SELECT COUNT(sd) FROM SaleDetails sd")
    int countSaleDetails();

    @Query("SELECT sd.orderDetailPK.itemCode AS itemCode, SUM(sd.itmQTY) AS totalQuantity FROM SaleDetails sd GROUP BY sd.orderDetailPK.itemCode ORDER BY totalQuantity DESC LIMIT 1")
    Map<String, Object> findMostPurchasedItem();

    @Query("SELECT SUM(sd.itmTotal) FROM SaleDetails sd")
    Double getItmTotal();

    @Query("SELECT SUM(sd.inventory.buyPrice * sd.itmQTY) AS totalCost FROM SaleDetails sd")
    Map<String, Object> getTotalCost();
}
