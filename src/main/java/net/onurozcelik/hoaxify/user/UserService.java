package net.onurozcelik.hoaxify.user;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.*;

@Service
public class UserService {

    UserRepository userRepository;
    BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public void save(User user) {
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        userRepository.save(user);
    }

}
