 import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, Validators ,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-forms',
  imports: [FormsModule,CommonModule,ReactiveFormsModule  ],
  templateUrl: './forms.html',
  styleUrl: './forms.css',
})
export class Forms {

 
  submitform(form:NgForm){
 
    console.log(form.value)
  }

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,3}$')])
  });
 
  onSubmit() {
    console.log(this.userForm.value);
    console.log('Valid?', this.userForm.valid);
  }
}
