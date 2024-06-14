package lk.ijse.gdse66.helloshoes.dto;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Embeddable
public class ContactDTO {

    @NotNull(message = "mobileNo is required")
    @Pattern(regexp = "^[^\\p{L}]{10,}$", message = "contact is not valid")
    private String mobileNo;

    @NotNull(message = "landNo is required")
    @Pattern(regexp = "^[^\\p{L}]{10,}$", message = "contact is not valid")
    private String landNo;
}
