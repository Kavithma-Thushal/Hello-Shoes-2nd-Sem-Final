package lk.ijse.gdse66.helloshoes.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.helloshoes.service.util.Gender;
import lk.ijse.gdse66.helloshoes.service.util.Role;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class EmployeeDTO {

    @NotNull(message = "Employee ID is required")
    @Pattern(regexp = "E00-0*[1-9]\\d{0,2}", message = "ID is not valid")
    private String employeeId;

    @NotNull(message = "Employee name is required")
    @Pattern(regexp = "[A-Za-z ]{5,}", message = "Name is not valid")
    private String employeeName;

    private String proPic;

    private Gender gender;

    private String employeeStatus;

    private String branch;

    @NotNull(message = "designation is required")
    @Pattern(regexp = "^[A-Za-z ]{5,}$", message = "designation is not valid")
    private String designation;

    private Role role;

    @NotNull(message = "DOB is required")
    private Date employeeDob;

    private Date joinDate;

    private AddressDTO address;

    @NotNull(message = "Contact is required")
    @Pattern(regexp = "^[^\\p{L}]{10,}$", message = "Contact is not valid")
    private String contactNo;

    @NotNull(message = "Email is required")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "Email is not valid")
    private String email;

    private String guardianName;

    @NotNull(message = "Emergency contact is required")
    @Pattern(regexp = "^[^\\p{L}]{10,}$", message = "Emergency contact is not valid")
    private String emergencyContact;
}
