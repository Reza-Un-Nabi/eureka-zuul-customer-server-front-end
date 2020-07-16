import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import {Customer} from '../../models/customer';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../http-service';
import { updateBinding } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: Customer; 
  closeResult: string;
  customerForm: FormGroup;
  submitted = false;
  customerValue: any;
  customerList: Observable<Customer[]>;
  updateSubmitted = false;
  updateMessage="Update Successfully";
  isupdated = false;
  updateCustomer: Customer;

  //url 
  addUrl ='/add';
  getAllUrl= '/getAll';
  getBysingleIdUrl ='/get';
  updateUrl = '/update';
  deleteUrl= '/delete'
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private httpService: HttpService
  ) { }

  
  ngOnInit() {
  // getting all Customers
  this.getAllCustomers();

    // form validation
    this.customerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]]
    });

  }
/* insert Customer */
insertCustomer(): void {

  // stop here if form is invalid
  this.submitted = true;
  if (this.customerForm.invalid) {
    return;
  }

  this.httpService.post(this.addUrl,this.customerForm.value).subscribe(res => {

      this.getAllCustomers();
      this.resetAddFormField();
  })
}

//get all Customer
getAllCustomers() {

  this.httpService.get(this.getAllUrl).subscribe(res => {
    this.customerList = res;
  })
}

  // get Customer by id
  getCustomerById(id: number) {

    this.httpService.get(this.getBysingleIdUrl+'/'+id).subscribe(data => {
      this.customerValue = data;
    });
  }
//reset Admin User Form Field
resetAddFormField() {
  this.customerForm = this.formBuilder.group({
    name: [''],
    company: ['']
  });
}

 //update Customer 
 updateCustomerValue() {
  // stop here if form is invalid
  this.updateSubmitted = true;
  if (this.updateCustomerForm.invalid) {
    return;
  }
  this.updateCustomer = new Customer();
  this.updateCustomer.id = this.updateCustomerForm.get("cust_id").value;
  this.updateCustomer.name = this.updateCustomerForm.get("cust_name").value;
  this.updateCustomer.company = this.updateCustomerForm.get("cust_company").value;
  this.httpService.post(this.updateUrl,this.updateCustomer).subscribe(res => {

    this.getAllCustomers();
  });
}
//delete Customer
deleteCustomer(id:number) {
  this.httpService.delete(this.deleteUrl+'/'+id).subscribe(data => {
    this.getAllCustomers();
  
  });
}
// form validation
updateCustomerForm = this.formBuilder.group({
  cust_id: ['', [Validators.required]],
  cust_name: ['', [Validators.required]],
  cust_company: ['', [Validators.required]]
});

/* for popup OK,close Button */
open(content) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.isupdated = false;
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

/* end popup */
}
