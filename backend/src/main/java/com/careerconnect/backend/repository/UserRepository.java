package com.careerconnect.backend.repository;
import com.careerconnect.backend.entity.User;
import com.careerconnect.backend.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface UserRepository extends JpaRepository<User,Long>{
 Optional<User> findByEmail(String email); boolean existsByEmail(String email); List<User> findByRole(Role role);
}
