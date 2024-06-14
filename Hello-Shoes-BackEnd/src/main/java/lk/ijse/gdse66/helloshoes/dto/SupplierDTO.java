package lk.ijse.gdse66.helloshoes.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.helloshoes.service.util.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SupplierDTO {

    @NotNull(message = "Supplier ID is required")
    @Pattern(regexp = "S00-0*[1-9]\\d{0,2}", message = "Supplier ID is not valid")
    private String supplierCode;

    @NotNull(message = "Name is required")
    @Pattern(regexp = "[A-Za-z ]{5,}", message = "Name is not valid")
    private String supplierName;

    private Category category;

    private InAddressDTO address;

    private ContactDTO contact;

    @NotNull(message = "Email is required")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "Email is not valid")
    private String email;
}
