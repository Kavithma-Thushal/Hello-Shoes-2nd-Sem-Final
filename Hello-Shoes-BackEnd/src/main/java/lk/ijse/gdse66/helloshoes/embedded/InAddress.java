package lk.ijse.gdse66.helloshoes.embedded;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Embeddable
public class InAddress {
    private String buildNo;
    private String lane;
    private String city;
    private String state;
    private String postalCode;
    private String supCountry;
}
