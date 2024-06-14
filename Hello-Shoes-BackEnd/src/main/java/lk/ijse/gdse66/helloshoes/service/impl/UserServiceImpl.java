package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.dto.UserDTO;
import lk.ijse.gdse66.helloshoes.entity.User;
import lk.ijse.gdse66.helloshoes.repository.UserRepo;
import lk.ijse.gdse66.helloshoes.service.UserService;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.Role;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final ModelMapper mapper;

    @Autowired
    Tranformer tranformer;

    @Override
    public void Save(UserDTO userDTO) {
        userRepo.save(mapper.map(userDTO, User.class));
    }

    @Override
    public UserDTO searchUser(String id) {
        return (UserDTO) userRepo.findByEmail(id)
                .map(user -> tranformer.convert(user, Tranformer.ClassType.USER_DTO))
                .orElseThrow(() -> new NotFoundException("User Not Exist"));
    }

    @Override
    public void updateUser(UserDTO dto, String role) {
        userRepo.findByEmail(dto.getEmail()).ifPresentOrElse(
                user -> {
                    Role userRole = user.getRole();
                    Role roleEnum = Role.valueOf(role);
                    if (userRole == roleEnum) {
                        userRepo.save(new User(user.getId(), dto.getEmail(), passwordEncoder.encode(dto.getPassword()), dto.getRole()));
                        log.info("Update user " + dto.getEmail() + " successfully");
                    } else {
                        log.error("Not : " + role + " role");
                        throw new NotFoundException("Not : " + role + " role");
                    }
                },
                () -> {
                    log.error("User Not Exist");
                    throw new NotFoundException("User Not Exist");
                });
    }

    @Override
    public void deleteUser(UserDTO dto, Role role) {
        userRepo.findByEmail(dto.getEmail()).ifPresentOrElse(
                user -> {

                    if (role.equals(user.getRole())) {
                        if (role.equals(Role.USER)) {
                            userRepo.deleteByEmailAndRole(dto.getEmail(), Role.USER);
                            log.info("Delete user " + dto.getEmail() + " successfully");
                        } else {
                            boolean matches = passwordEncoder.matches(dto.getPassword(), user.getPassword());
                            if (matches) {
                                userRepo.deleteByEmailAndRole(dto.getEmail(), Role.ADMIN);
                                log.info("Delete user " + dto.getEmail() + " successfully");
                            } else {
                                log.error("Incorrect Password");
                                throw new NotFoundException("Incorrect Password");
                            }
                        }
                    } else {
                        log.error("Not : " + role + " role");
                        throw new NotFoundException("Not : " + role + " role");
                    }
                },
                () -> {
                    log.error(role + " Not Exist");
                    throw new NotFoundException(role + " Not Exist");
                }
        );
    }

    @Override
    public UserDetailsService userDetailService() {
        return username -> userRepo.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("user not found"));
    }

    @Override
    public boolean checkPassword(UserDTO req) {
        Optional<User> details = userRepo.findByEmail(req.getEmail());
        if (details.isPresent()) {
            boolean matches = passwordEncoder.matches(req.getPassword(), details.get().getPassword());
            if (matches) {
                return true;
            }
        }
        return false;
    }

    @Override
    public List<UserDTO> findAllByRole(String role) {
        if ("USER".equals(role)) {
            return tranformer.convert(userRepo.findAllByRole(Role.USER), Tranformer.ClassType.USER_DTO_LIST);
        } else if ("ADMIN".equals(role)) {
            return tranformer.convert(userRepo.findAllByRole(Role.ADMIN), Tranformer.ClassType.USER_DTO_LIST);
        } else {
            log.error("Not : " + role + " role");
            throw new NotFoundException("Not : " + role + " role");
        }
    }
}
