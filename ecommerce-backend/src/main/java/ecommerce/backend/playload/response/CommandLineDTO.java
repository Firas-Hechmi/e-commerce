package ecommerce.backend.playload.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class CommandLineDTO {

    private String productName;
    private String productImage;
    private float productPrice;
    private int productQuantity;
    private float productsTotalPrice;
    private LocalDateTime date;

    public  CommandLineDTO(String productName,String productImage,
                           float productPrice,
                           int productQuantity,
                           float productsTotalPrice,
                           LocalDateTime date
                    ){
        this.productImage=productImage;
        this.productName=productName;
        this.productQuantity=productQuantity;
        this.productPrice=productPrice;
        this.productsTotalPrice=productsTotalPrice;
        this.date=date;
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

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }

    public float getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(float productPrice) {
        this.productPrice = productPrice;
    }

    public float getProductsTotalPrice() {
        return productsTotalPrice;
    }

    public void setProductsTotalPrice(float productsTotalPrice) {
        this.productsTotalPrice = productsTotalPrice;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

}
