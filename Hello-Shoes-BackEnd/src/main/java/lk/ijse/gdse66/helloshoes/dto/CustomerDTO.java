package lk.ijse.gdse66.helloshoes.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.helloshoes.service.util.Gender;
import lk.ijse.gdse66.helloshoes.service.util.LoyaltyLevel;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class CustomerDTO {

    @NotNull(message = "Customer ID is required")
    @Pattern(regexp = "C00-0*[1-9]\\d{0,2}", message = "ID is not valid")
    private String customerId;

    @NotNull(message = "Customer name is required")
    @Pattern(regexp = "[A-Za-z ]{5,}", message = "Name is not valid")
    private String customerName;

    private Gender gender;

    private Date loyaltyDate;

    private LoyaltyLevel level;

    private Integer totalPoints;

    @NotNull(message = "Date is required")
    private Date customerDob;

    private AddressDTO address;

    @NotNull(message = "Contact is required")
    @Pattern(regexp = "^[^\\p{L}]{10,}$", message = "Contact is not valid")
    private String contactNo;

    @NotNull(message = "Email is required")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "Email is not valid")
    private String email;

    private String proPic;

    private LocalDateTime recentPurchase;
}
