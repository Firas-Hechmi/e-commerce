package ecommerce.backend.service;

import ecommerce.backend.models.Category;
import ecommerce.backend.playload.response.MessageResponse;
import ecommerce.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;
    private ProductService productService;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository,ProductService productService){
        this.categoryRepository=categoryRepository;
        this.productService=productService;
    }

    public List<Category> getCategories(){

        return categoryRepository.findAll();
    }
    @Transactional
    public ResponseEntity<?> deleteCategory(Long id){
        if(!categoryRepository.existsById(id)){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Catégorie non trouvé avec son id dans la BDD !"));
        }
        productService.deleteAllByCategoryId(id);
        categoryRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Catégorie a été supprimé avec succès"));
    }

    public ResponseEntity<?> addCategory(Category newCategory){
        if(categoryRepository.existsByName(newCategory.getName())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Catégorie existe déjà !"));
        }
            categoryRepository.save(newCategory);
         return ResponseEntity.ok(new MessageResponse("Catégorie a été ajouté avec succès"));
    }

    public ResponseEntity<?> updateCategory(Category updatedCategory) {
        if (!categoryRepository.existsById(updatedCategory.getId())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Catégorie non trouvé avec son ID dans la BDD !"));
        }
        if (categoryRepository.existsByName(updatedCategory.getName())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Catégorie existe déjà !"));
        }
        categoryRepository.save(updatedCategory);
        return ResponseEntity.ok(new MessageResponse("Catégorie a été modifié avec succès"));
    }
    public Optional<Category> getCategory(Long id){
        return categoryRepository.findById(id);
    }
}
