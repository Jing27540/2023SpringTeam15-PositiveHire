package com.positivehire.phtalent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = { "com.positivehire.phtalent.*" })
@EntityScan(basePackages = { "com.positivehire.phtalent.*" })
@ComponentScan(basePackages = { "com.positivehire.phtalent.*" })
public class PhtalentApplication {

	public static void main(String[] args) {
		SpringApplication.run(PhtalentApplication.class, args);
	}

}
