package net.onurozcelik.hoaxify;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import net.onurozcelik.hoaxify.user.*;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class HoaxifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(HoaxifyApplication.class, args);
	}
	
	// Spring injects dependencies automatically to beans
	@Bean
	CommandLineRunner createInitialUsers(UserService userService) {
		return new CommandLineRunner() {

			@Override
			public void run(String... args) throws Exception {
				User user = new User();
				user.setUsername("user1");
				user.setDisplayName("display1");
				user.setPassword("P4ssword");
				
				userService.save(user);
			}
			
		};
	}

}
