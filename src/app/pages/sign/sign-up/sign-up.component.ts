import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { UploadService } from 'src/app/services/upload/upload.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  isSubmitted = false;
  errorMessage = '';
  userForm!: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private uploadService: UploadService

  ) { }

  onSelectImage(event: any) {
    console.log(event); // Kiểm tra giá trị của event

    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files); // Kiểm tra giá trị của event.target.files

      const file = event.target.files[0];
      const formData: any = new FormData();
      formData.append('image', file);
      this.userForm.get('image')?.setValue(formData); // Sử dụng phương thức setValue() của FormControl
    }
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required],
      address: [''],
      image: ['']
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup): any {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmpassword')?.setErrors({ passwordMismatch: true });
    } else {
      return null;
    }
  }

  onHandleSignup() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      const user: IUser = {
        name: this.userForm.value.name || "",
        email: this.userForm.value.email || "",
        password: this.userForm.value.password || "",
        confirmpassword: this.userForm.value.confirmpassword || "",
        address: this.userForm.value.address || "",
        image: "",

      }
      const imageFormData: any = this.userForm.value.image; // Lưu trữ FormData vào biến imageFormData
      this.uploadService.AddImage(imageFormData.get('image')).subscribe(
        (response) => {
          const imageUrl = response.urls[0];
          console.log(imageUrl);

          user.image = imageUrl;

          // Gọi productService.addProduct() để thêm sản phẩm vào cơ sở dữ liệu
          this.userService.signUp(user).subscribe(
            (user) => {
              // Xử lý khi sản phẩm được thêm thành công

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Register has been added successfully!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/signin']);
            },
            (error) => {
              // Xử lý khi có lỗi trong quá trình thêm sản phẩm
              console.log(error.message);
            }
          );
        },
        (error) => {
          // Xử lý khi có lỗi trong quá trình upload ảnh
          console.log(error.message);
        }
      );

    }
  }
}
