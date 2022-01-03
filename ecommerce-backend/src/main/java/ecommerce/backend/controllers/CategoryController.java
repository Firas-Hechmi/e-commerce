package ecommerce.backend.controllers;

import ecommerce.backend.models.Category;
import ecommerce.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService){
        this.categoryService=categoryService;
    }

    @GetMapping(path = "api/categories")
    public List<Category> getCategories(){
           return categoryService.getCategories();
    }

    @DeleteMapping(path = "api/categories/{id}")
    public ResponseEntity<?> deleteCategories(@PathVariable String id){
        return categoryService.deleteCategory(Long.parseLong(id));
    }

    @PostMapping(path="api/categories")
    public ResponseEntity<?> addCategory(@RequestParam(name="name") String categoryName){
         Category newCategory=new Category(categoryName);
         return categoryService.addCategory(newCategory);
    }
    @PutMapping(path="api/categories")
    public ResponseEntity<?> updateCategory(@RequestBody Category updatedCategory){
        return categoryService.updateCategory(updatedCategory);
    }
}
