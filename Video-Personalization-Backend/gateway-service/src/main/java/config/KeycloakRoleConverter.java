//package config;
//
//
//import static java.util.Collections.emptyList;
//import static java.util.Collections.emptyMap;
//
//import java.util.Collection;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//import org.springframework.core.convert.converter.Converter;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.oauth2.jwt.Jwt;
//
//public class KeycloakRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
//    @Override
//    public Collection<GrantedAuthority> convert(final Jwt jwt) {
//
//        final Map<String, Object> claims = jwt.getClaims();
//
//        final Map<String, Map<String, List<String>>> resourceAccess =
//                (Map<String, Map<String, List<String>>>) claims.getOrDefault("resource_access", emptyMap());
//
//        Map<String, List<String>> backendRoles = resourceAccess.getOrDefault("backend", emptyMap());
//
//        return backendRoles.getOrDefault("roles", emptyList()).stream()
//                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
//                .collect(Collectors.toList());
//    }
//}
package config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class KeycloakRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess == null || !(realmAccess instanceof Map)) {
            return List.of();
        }

        Map<String, Collection<String>> roles = (Map<String, Collection<String>>) realmAccess.get("roles");
        if (roles == null) {
            return List.of();
        }

        return roles.values().stream()
                .flatMap(Collection::stream)
                .map(role -> "ROLE_" + role)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
