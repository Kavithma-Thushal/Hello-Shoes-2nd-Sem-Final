package lk.ijse.gdse66.helloshoes.service;

import lk.ijse.gdse66.helloshoes.auth.request.SignInRequest;
import lk.ijse.gdse66.helloshoes.auth.request.SignUpRequest;
import lk.ijse.gdse66.helloshoes.auth.response.JwtAuthResponse;

public interface AuthenticationService {

    JwtAuthResponse signIn(SignInRequest signInRequest);

    JwtAuthResponse signUp(SignUpRequest signUpRequest);
}
