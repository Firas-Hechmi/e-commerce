package ecommerce.backend.playload.request;

import java.util.List;

public class CommandRequest {
    private String username;
    private List<CommandLineRequest> commandLineRequestList;


    public String  getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<CommandLineRequest> getCommandLineRequestList() {
        return commandLineRequestList;
    }

    public void setCommandLineRequestList(List<CommandLineRequest> commandLineRequestList) {
        this.commandLineRequestList = commandLineRequestList;
    }
}
