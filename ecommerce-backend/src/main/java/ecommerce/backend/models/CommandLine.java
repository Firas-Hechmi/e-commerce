package ecommerce.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "commandLine")
public class CommandLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="command_id",referencedColumnName = "id",nullable = false)
    private Command command;

    private String productName;

    private String productImage;

    private float productPrice;

    private Integer quantity;

    private float totalPrice;

    public CommandLine() {
    }

    public CommandLine(Command command,String productName,String productImage, float productPrice,int quantity) {
        this.command=command;
        this.productName=productName;
        this.productImage=productImage;
        this.productPrice=productPrice;
        this.quantity=quantity;
        this.totalPrice=quantity*productPrice;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Command getCommand() {
        return command;
    }

    public void setCommand(Command command) {
        this.command = command;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public float getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(float productPrice) {
        this.productPrice = productPrice;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }
}
