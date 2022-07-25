package com.financeapp.api.total;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface TotalRepository extends JpaRepository<Total, Long> {

    Optional<Total> findTotalByDate(LocalDate date);

}
