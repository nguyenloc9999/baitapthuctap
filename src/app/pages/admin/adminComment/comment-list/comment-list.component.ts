import { Component } from '@angular/core';
import { IComment } from 'src/app/interfaces/comment';
import { IUser } from 'src/app/interfaces/user';
import { CommentService } from 'src/app/services/comment/comment.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {
  comments: IComment[] = [];
  users: IUser[] = [];
  constructor(private commentService: CommentService,
    private productService: ProductService,

    ) { 
      this.commentService.getAllComment().subscribe((data:any) =>{
        this.comments = data.comments
        console.log(this.comments);
        
      }, error =>{
        console.log(error.message);
        
      })
    }
    onHandleRemove(id: any) {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          // Xóa sản phẩm
          this.commentService.removeComment(id).subscribe(() => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.comments = this.comments.filter(item => item._id !== id);
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Hiển thị thông báo hủy xóa sản phẩm
          Swal.fire(
            'Cancelled',
            'Your product is safe :)',
            'error'
          )
        }
      })
  
    }
}
