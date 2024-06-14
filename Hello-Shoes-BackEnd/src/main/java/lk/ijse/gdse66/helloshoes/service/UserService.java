package lk.ijse.gdse66.helloshoes.service;

import lk.ijse.gdse66.helloshoes.dto.UserDTO;
import lk.ijse.gdse66.helloshoes.service.util.Role;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {

    void Save(UserDTO userDTO);

    UserDTO searchUser(String id);

    void updateUser(UserDTO dto, String role);

    void deleteUser(UserDTO dto, Role role);

    UserDetailsService userDetailService();

    boolean checkPassword(UserDTO req);

    List<UserDTO> findAllByRole(String role);
}
