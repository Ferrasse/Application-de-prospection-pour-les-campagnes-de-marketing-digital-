package com.qrebl.users;

import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import java.util.concurrent.TimeUnit;
public class KeycloakConfig {

    static Keycloak keycloak = null;
    final static String serverUrl = "http://localhost:9090/";
    public final static String realm = "Cold-Outreach-Application";
    final static String clientId = "VidPersclient";
    final static String clientSecret = "SP8p8mzxEeB7TaWpgjToblGUr8CcSbdR";
    final static String userName = "rachida.ferras@gmail.com";
    final static String password = "123456";


    public KeycloakConfig() {
    }

    public static Keycloak getInstance(){
        if(keycloak == null){

            ResteasyClient resteasyClient = (ResteasyClient) ResteasyClientBuilder.newBuilder()
                    .connectTimeout(10, TimeUnit.SECONDS)
                    .build();

            keycloak = KeycloakBuilder.builder()
                    .serverUrl(serverUrl)
                    .realm(realm)
                    .grantType(OAuth2Constants.PASSWORD)
                    .username(userName)
                    .password(password)
                    .clientId(clientId)
                    .clientSecret(clientSecret)
                    .resteasyClient(resteasyClient)
                    .build();
        }
        return keycloak;
    }
}
