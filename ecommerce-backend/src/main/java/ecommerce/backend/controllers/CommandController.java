package ecommerce.backend.controllers;

import ecommerce.backend.models.Command;
import ecommerce.backend.models.CommandLine;
import ecommerce.backend.models.Product;
import ecommerce.backend.models.User;
import ecommerce.backend.playload.request.CommandLineRequest;
import ecommerce.backend.playload.request.CommandRequest;
import ecommerce.backend.playload.response.CommandLineDTO;
import ecommerce.backend.playload.response.MessageResponse;
import ecommerce.backend.repository.CommandLineRepository;
import ecommerce.backend.repository.CommandRepository;
import ecommerce.backend.repository.ProductRepository;
import ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class CommandController {
    private CommandRepository commandRepository;
    private UserRepository userRepository;
    private ProductRepository productRepository;
    private CommandLineRepository commandLineRepository;

    @Autowired
    public CommandController(CommandLineRepository commandLineRepository, CommandRepository commandRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.commandRepository = commandRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.commandLineRepository = commandLineRepository;
    }
    @PostMapping(path = "api/commands")
    public ResponseEntity<?> addCommands(@RequestBody CommandRequest commandRequest){
        User user=userRepository.findByUsername(commandRequest.getUsername())
                .orElseThrow(()->new RuntimeException(("Client non trouvé ")));
        Command command=new Command();
        command.setUser(user);
        command.setDate(LocalDateTime.now());
        List<CommandLineRequest> commandLineRequestList=commandRequest.getCommandLineRequestList();
        if(commandLineRequestList.isEmpty()){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("commande est vide !!"));
        }
        List<CommandLine> commandLines=new ArrayList<>();
        for(CommandLineRequest commandLineRequest : commandLineRequestList){
            Product product=productRepository.findProductByName(commandLineRequest.getProductname())
                    .orElseThrow(()->new RuntimeException(("produit non trouvé")));
            commandLines.add(new CommandLine(
                 command,
                 product.getName(),
                 product.getImage(),
                 product.getPrice(),
                 commandLineRequest.getQuantity()
            ));
        }
        commandRepository.save(command);
        commandLineRepository.saveAll(commandLines);

        return ResponseEntity.ok(new MessageResponse("Votre commande a été bien enregistrée"));
    }
    @GetMapping(path="api/commands/{id}")
    public List<CommandLineDTO> getUserCommands(@PathVariable Long id){
        User user=userRepository.findById(id).orElseThrow(()->new UsernameNotFoundException("Username not found"));
        List<CommandLineDTO> commandLines=new ArrayList<>();
        List<Command> commands=commandRepository.findAllByUserId(id);
        for(Command command : commands){
            List<CommandLine> someCommandLines=commandLineRepository.findAllByCommandId(command.getId());
            for(CommandLine commandLine : someCommandLines){
                commandLines.add(
                        new CommandLineDTO(
                                commandLine.getProductName(),
                                commandLine.getProductImage(),
                                commandLine.getProductPrice(),
                                commandLine.getQuantity(),
                                commandLine.getTotalPrice(),
                                command.getDate()
                        )
                );
            }
        }
        return commandLines;
    }




}

















