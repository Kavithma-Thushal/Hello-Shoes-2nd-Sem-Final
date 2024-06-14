package lk.ijse.gdse66.helloshoes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class AdminPanelDTO {

    private String id;

    private Double totalSales;

    private Double totalProfit;

    private String mostSaleItem;

    private String mostSaleItemPicture;

    private Integer mostSaleItemQuantity;
}
