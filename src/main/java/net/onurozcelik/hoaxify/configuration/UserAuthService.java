package net.onurozcelik.hoaxify.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import net.onurozcelik.hoaxify.user.User;
import net.onurozcelik.hoaxify.user.UserRepository;

// This class is required for Spring Security to work
@Service
public class UserAuthService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User inDB = userRepository.findByUsername(username);
		if (inDB == null) {
			throw new UsernameNotFoundException("User not found");
		}
		return inDB;
	}

}
