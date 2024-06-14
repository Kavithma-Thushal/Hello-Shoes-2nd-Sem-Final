package lk.ijse.gdse66.helloshoes.repository;

import lk.ijse.gdse66.helloshoes.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface EmployeeRepo extends JpaRepository<Employee, String> {

    @Query(value = "SELECT CAST(SUBSTRING(employee_id, 5) AS SIGNED) AS employee_id FROM employee ORDER BY employee_id DESC LIMIT 1", nativeQuery = true)
    String getEmployeeIds();

    List<Employee> findByEmployeeDob(Date date);

    @Query(value = "SELECT * FROM employee ORDER BY CAST(SUBSTRING(employee_id, 5) AS SIGNED), SUBSTRING(employee_id, 1, 4)", nativeQuery = true)
    List<Employee> getAllEmployees();
}
