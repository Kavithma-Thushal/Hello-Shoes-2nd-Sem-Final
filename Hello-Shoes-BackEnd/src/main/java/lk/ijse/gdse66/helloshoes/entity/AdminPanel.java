package lk.ijse.gdse66.helloshoes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class AdminPanel {

    @Id
    private String id;

    private Double totalSales;

    private Double totalProfit;

    private String mostSaleItem;

    @Column(columnDefinition = "LONGTEXT")
    private String mostSaleItemPicture;

    private Integer mostSaleItemQuantity;
}
