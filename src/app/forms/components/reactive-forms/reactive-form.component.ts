import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { appConfig } from "app/core/config/app.config";
import { Customer } from "app/forms/components/reactive-forms/Customer";
@Component({
    selector: 'reactive-form',
    templateUrl: 'reactive-form.component.html'
})
export class ReactiveFormComponent {
    reactiveForm: FormGroup;
    constructor(private router: Router, private fb: FormBuilder,private toastr: ToastrService, private http:HttpClient ) {
        this.createForm();
    }

    createForm() {
        this.reactiveForm = this.fb.group({
            firstName   : ['', Validators.required],
            lastName    : ['', Validators.required],
            email       : ['', [Validators.required,Validators.email]],
            phone       : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(15)]]
        });
    }

    get firstName()
    {
      return this.reactiveForm.get('firstName');
    }
    get lastName()
    {
      return this.reactiveForm.get('lastName');
    }
    get email()
    {
      return this.reactiveForm.get('email');
    }
    get phone()
    {
      return this.reactiveForm.get('phone');
    }

createCustomer(model: Customer, isValid) {
    
        if (!isValid) {
            this.toastr.error('Please fix errors');
            //this.childModal.show();    
        } else {
            
            this.http.post(`${appConfig.apiUrl}/customers`,model ,{ observe: 'response' }).subscribe(data=>{

            })
            console.log(model)
        }

    } 

    gotoTemplateForm() {
        this.router.navigate(['/forms']);
    }
}   