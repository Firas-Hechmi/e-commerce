package ecommerce.backend.repository;

import ecommerce.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findProductByCategoryId(Long id);
    Optional<Product> findProductByName(String name);
    Optional<Product> findProductByNameAndCategoryName(String nameProduct,String nameCategory);
    Optional<Product> findProductById(Long id);
    Boolean existsByNameAndCategoryName(String nameProduct,String nameCategory);
    void deleteAllByCategoryId(Long id);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %?1%")
    public List<Product> search(String keyword);


}
