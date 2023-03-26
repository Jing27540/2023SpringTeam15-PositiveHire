@SuppressWarnings({ "unchecked", "rawtypes" })
@RestController
public class APIAccountController extends APIController {

    @Autowired
    private AccountService service;

    @PostMapping(BASE_PATH + "/accounts")
    public ResponseEntity createAccount(@RequestBody final String username, @RequestBody final String password,
            @RequestBody final int employeeID) {

        Account newAccount = new Account(username, password);
        service.save(newAccount);
    }
}