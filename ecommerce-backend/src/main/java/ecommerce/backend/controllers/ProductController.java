package ecommerce.backend.controllers;

import ecommerce.backend.models.Product;
import ecommerce.backend.playload.request.ProductRequest;
import ecommerce.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService=productService;
    }

    @GetMapping(path = "api/products")
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @GetMapping(path = "api/products/category")
    @ResponseBody
    public List<Product> getProductsByCategory(@RequestParam(name = "category_id") String category_id ){
            return productService.getProductsByCategory(Long.valueOf(category_id.trim()));
    }

    @DeleteMapping(path="api/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        return productService.deleteProduct(id);
    }

    @PostMapping(path = "api/product")
    public ResponseEntity<?> addProduct(@RequestBody ProductRequest productRequest){
        return productService.addProduct(productRequest);
    }

    @PutMapping(path = "api/product")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequest productRequest){
        return productService.updateProduct(productRequest);
    }

    @GetMapping(path="api/products/search/{keyWord}")
    public List<Product> search(@PathVariable String keyWord){
        return productService.search(keyWord);
    }
}
