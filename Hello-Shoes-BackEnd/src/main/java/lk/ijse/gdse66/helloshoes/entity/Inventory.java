package lk.ijse.gdse66.helloshoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
public class Inventory {

    @Id
    private String itemCode;

    private String itemDesc;

    @Column(columnDefinition = "LONGTEXT")
    private String itemPicture;

    private String category;

    private Integer size;

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    private String supplierName;

    private Double salePrice;

    private Double buyPrice;

    private Double expectedProfit;

    private Double profitMargin;

    private String status;

    private Integer qty;

    private Integer originalQty;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "inventory")
    private List<SaleDetails> saleDetails = new ArrayList<>();
}
