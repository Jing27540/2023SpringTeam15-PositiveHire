@Component
@Transactional
public class AccountService extends Service<Account, Long> {

    /** Repository for CRUD tasks */
    @Autowired
    private AccountRepository repository;

    @Override
    protected JpaRepository<Account, Long> getRepository() {
        return repository;
    }

    public Account findByUser(User user) {
        return repository.findByUser(user);

    }

}
