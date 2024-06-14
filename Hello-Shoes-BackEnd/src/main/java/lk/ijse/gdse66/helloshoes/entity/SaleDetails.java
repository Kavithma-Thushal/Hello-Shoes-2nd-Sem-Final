package lk.ijse.gdse66.helloshoes.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.helloshoes.embedded.SaleDetailPK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
public class SaleDetails {

    @EmbeddedId
    private SaleDetailPK orderDetailPK;

    @Column(name = "itm_qty")
    private int itmQTY;

    @ManyToOne
    @JoinColumn(name = "order_no", insertable = false, updatable = false)
    private Sales orderNo;

    @ManyToOne
    @JoinColumn(name = "item_code", insertable = false, updatable = false)
    private Inventory inventory;

    private Double itmTotal;
}
