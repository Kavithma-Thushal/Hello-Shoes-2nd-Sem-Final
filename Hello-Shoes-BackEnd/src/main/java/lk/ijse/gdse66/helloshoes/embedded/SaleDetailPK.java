package lk.ijse.gdse66.helloshoes.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class SaleDetailPK implements Serializable {

    @Column(name = "order_no")
    private String orderNo;

    @Column(name = "item_code")
    private String itemCode;
}
