package lk.ijse.gdse66.helloshoes.repository;

import lk.ijse.gdse66.helloshoes.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer, String> {

    @Query(value = "SELECT CAST(SUBSTRING(customer_id, 5) AS SIGNED) AS customer_id FROM Customer ORDER BY customer_id DESC LIMIT 1", nativeQuery = true)
    String getCusId();

    List<Customer> findByCustomerDob(Date date);

    @Query(value = "SELECT COUNT(c) FROM Customer c")
    Integer totalCustomerCount();

    @Query("SELECT c.email FROM Customer c")
    List<String> getAllEmails();

    @Query(value = "SELECT * FROM customer ORDER BY CAST(SUBSTRING(customer_id, 5) AS SIGNED), SUBSTRING(customer_id, 1, 4)", nativeQuery = true)
    List<Customer> getAllCustomers();
}
