import org.springframework.data.jpa.repository.JpaRepository;

//import model

public interface AccountRepository extends JpaRepository<Account, Long> {

    public Account findByUser(User name);
}