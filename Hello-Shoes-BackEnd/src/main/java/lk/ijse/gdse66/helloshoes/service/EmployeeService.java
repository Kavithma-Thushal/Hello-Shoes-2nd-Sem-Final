package lk.ijse.gdse66.helloshoes.service;

import lk.ijse.gdse66.helloshoes.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {

    void saveEmployee(EmployeeDTO dto);

    EmployeeDTO searchEmployee(String id);

    void updateEmployee(EmployeeDTO dto);

    void deleteEmployee(String id);

    List<EmployeeDTO> getAllEmployees();

    String getEmployeeGenId();
}
