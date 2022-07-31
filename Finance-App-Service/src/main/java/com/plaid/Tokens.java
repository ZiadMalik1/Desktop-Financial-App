package com.plaid;

import java.sql.*;

public class Tokens {
    public String getSecret(String secretType) {
        String secret = "";
        try (Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/finances");

             Statement stmt = conn.createStatement()) {
            String strSelect = "SELECT secret FROM plaid WHERE title = '" + secretType + "'";
            ResultSet rset = stmt.executeQuery(strSelect);

            while (rset.next()) {
                secret = rset.getString("secret");
            }

        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return secret;
    }

    public void insertSecret(String secret) {
        try (Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/finances");
             Statement stmt = conn.createStatement()) {
            String strSelect = "UPDATE plaid SET secret = '" + secret + "'WHERE title = 'Access'";
            ResultSet rset = stmt.executeQuery(strSelect);

        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

}
