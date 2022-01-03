package ecommerce.backend.service;


import ecommerce.backend.models.Category;
import ecommerce.backend.models.Product;
import ecommerce.backend.playload.request.ProductRequest;
import ecommerce.backend.playload.response.MessageResponse;
import ecommerce.backend.repository.CategoryRepository;
import ecommerce.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository,CategoryRepository categoryRepository){
        this.productRepository=productRepository;
        this.categoryRepository=categoryRepository;
    }

    public List<Product> getProducts(){
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(Long category_id ){
           return productRepository.findProductByCategoryId(category_id);
    }
    public void deleteAllByCategoryId(Long id){
        productRepository.deleteAllByCategoryId(id);
    }

    public ResponseEntity<?> deleteProduct(Long id){
        if(!productRepository.existsById(id)){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Produit non trouvé avec son id dans la BDD !"));
        }
        productRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Produit a été supprimé avec succés"));
    }

    public ResponseEntity<?> addProduct(ProductRequest productRequest){
        Category category=categoryRepository.findByName(productRequest.getCategoryName()).orElse(null);
        if(category==null){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Categorie n'existe pas !"));
        }
        if(productRepository.existsByNameAndCategoryName(productRequest.getName(),category.getName())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Produit existe déjà!"));
        }
        Product newProduct=new Product(
                productRequest.getName(),
                productRequest.getDescription(),
                productRequest.getImage(),
                productRequest.getPrice(),
                category
        );
        productRepository.save(newProduct);
        return ResponseEntity.ok(new MessageResponse("Produit a été ajouté avec succés"));
    }

    public ResponseEntity<?> updateProduct(ProductRequest productRequest){
        Category category=categoryRepository.findByName(productRequest.getCategoryName()).orElse(null);
        if(category==null){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Categorie n'existe pas !"));
        }

        Product updatedProduct=productRepository.findProductById(productRequest.getId()).orElse(null);
        if(updatedProduct==null){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Produit n'est pas trouvé!"));
        }

        Product similarProduct=productRepository.findProductByNameAndCategoryName(
                        productRequest.getName(),category.getName())
                .orElse(null);
        if(similarProduct!=null) {
            if (similarProduct.getId() != productRequest.getId()) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Produit existe déjà!"));
            }
        }

        updatedProduct.setName(productRequest.getName());
        updatedProduct.setDescription(productRequest.getDescription());
        updatedProduct.setPrice(productRequest.getPrice());
        updatedProduct.setImage(productRequest.getImage());
        updatedProduct.setCategory(category);
        productRepository.save(updatedProduct);

        return ResponseEntity.ok(new MessageResponse("Produit a été modifié avec succés"));
    }
     public List<Product> search(String keyWord){
        return productRepository.search(keyWord);
     }

}
