package lk.ijse.gdse66.helloshoes.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class SaleDetailPKDTO {

    @NotNull(message = "orderNo is required")
    private String orderNo;

    @NotNull(message = "itemCode is required")
    private String itemCode;
}
