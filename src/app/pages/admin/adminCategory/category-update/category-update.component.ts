import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent {
  submitted=false
    category!: ICategory;
    categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4),Validators.pattern('^[^0-9]+$')]],
    })

    constructor(private categoryService: CategoryService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router) {
      this.route.paramMap.subscribe(params => {
        const id = String(params.get('id'));
        this.categoryService.getCategoryById(id).subscribe(category => {
          this.category = category;        
          this.categoryForm.patchValue({
            name: this.category.name,
          })
        }, error => console.log(error.message)
        )
      })
    }
    onHandleUpdate() {
      if (this.categoryForm.valid) {
        const newCategory: ICategory = {
          _id: this.category._id,
          name: this.categoryForm.value.name || ""  
        }      
      
        
        this.categoryService.updateCategory(newCategory).subscribe(category=>{
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Category has been added successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/admin/categories'])
        }, error => {
          console.log(error.message);
        })
      }
    }
}
