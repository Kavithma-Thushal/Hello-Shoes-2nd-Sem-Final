package lk.ijse.gdse66.helloshoes.repository;


import lk.ijse.gdse66.helloshoes.entity.User;
import lk.ijse.gdse66.helloshoes.service.util.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    void deleteByEmailAndRole(String email, Role role);

    List<User> findAllByRole(Role role);
}
