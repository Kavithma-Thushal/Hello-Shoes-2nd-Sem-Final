package lk.ijse.gdse66.helloshoes.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.helloshoes.embedded.Address;
import lk.ijse.gdse66.helloshoes.service.util.Gender;
import lk.ijse.gdse66.helloshoes.service.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
public class Employee {

    @Id
    private String employeeId;

    private String employeeName;

    @Column(columnDefinition = "LONGTEXT")
    private String proPic;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String employeeStatus;

    private String branch;

    private String designation;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Temporal(TemporalType.DATE)
    private Date employeeDob;

    @Temporal(TemporalType.DATE)
    private Date joinDate;

    @Embedded
    private Address address;

    @Column(unique = true)
    private String contactNo;

    @Column(unique = true)
    private String email;

    private String guardianName;

    @Column(unique = true)
    private String emergencyContact;
}
