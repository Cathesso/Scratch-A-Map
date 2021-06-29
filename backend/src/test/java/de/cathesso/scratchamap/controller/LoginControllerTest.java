package de.cathesso.scratchamap.controller;

import de.cathesso.scratchamap.dto.LoginData;
import de.cathesso.scratchamap.security.model.AppUser;
import de.cathesso.scratchamap.security.repository.AppUserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = "jwt.secret=some-jwt-secret")
class LoginControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private AppUserRepo appUserRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private TestRestTemplate restTemplate;


    @Test
    public void loginWithValidCredentialsShouldReturnValidJwtToken() {
        //Given
        appUserRepo.save(AppUser.builder()
                .username("AUserForTesting")
                .password(encoder.encode("APasswordForTesting"))
                .build());

        //WHEN
        LoginData loginData = new LoginData("AUserForTesting", "APasswordForTesting");
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/login", loginData, String.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        Claims body = Jwts.parser().setSigningKey("some-jwt-secret").parseClaimsJws(response.getBody()).getBody();
        assertThat(body.getSubject(), is("AUserForTesting"));

    }
    @Test
    public void loginWithInValidCredentialsShouldReturnNoToken() {
        //Given
        appUserRepo.save(AppUser.builder()
                .username("AUserForTesting")
                .password(encoder.encode("CorrectPassword"))
                .build());

        //WHEN
        LoginData loginData = new LoginData("AUserForTesting", "IncorrectPassword");
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/login", loginData, String.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }

}
