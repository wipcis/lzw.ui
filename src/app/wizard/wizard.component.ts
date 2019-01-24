import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css'],
})
export class WizardComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) {
  }

  vpcConfigurationFormGroup: FormGroup;
  reviewFormGroup: FormGroup;
  changedValue;

  csps = [
    {
      name: "Amazon Web Services",
      value: "aws"
    },
    {
      name: "Microsoft Azure",
      value: "azure"
    },
    {
      name: "Google Cloud Platform",
      value: "gcp"
    }
  ]

  accountList = [
    {
      accountName: "orgroot",
      roleName: "",
      email: "",
      billing: true,
      accountType: "root",
      tags: ""
    },
    {
      accountName: "logging",
      roleName: "",
      email: "",
      billing: false,
      accountType: "service",
      tags: ""
    },
    {
      accountName: "security",
      roleName: "",
      email: "",
      billing: false,
      accountType: "service",
      tags: ""
    },
    {
      accountName: "sharedservices",
      roleName: "",
      email: "",
      billing: false,
      accountType: "service",
      tags: ""
    },
    {
      accountName: "",
      roleName: "",
      email: "",
      billing: false,
      accountType: "service",
      tags: ""
    }
  ]
  accountTypeOptions = [
    {value: "root", viewValue: "Root Account"},
    {value: "service", viewValue: "Service Account"},
    {value: "user", viewValue: "IAM User Account"}
  ]
  outJson = {
    csp: "aws",
    org: "",
    orgPrefix: "",
    accounts: this.accountList,
  }

  displayedColumns = {
    accounts: ["accountName", "roleName", "email", "billing", "type", "tags", "actionsColumn"]
  }

  ngOnInit() {
    this.vpcConfigurationFormGroup = this._formBuilder.group({
      vpcConfigurationCtrl: ['', Validators.required]
    });
    this.reviewFormGroup = this._formBuilder.group({
      reviewCtrl: ['', Validators.required]
    });
  }

  removeAccount(i) {
    this.accountList.splice(i, 1);
   }

  onchange(i: number, event: any) {
    alert("Index " + i + " Event: " + JSON.stringify(event));
  }

  addAccount() {
    this.accountList.push({    
      accountName: "",
      roleName: "",
      email: "",
      billing: true,
      accountType: "",
      tags: ""
    });
  }
  compareItems(i1, i2) {
    return i1 && i2 && i1.id===i2.id;
  }
}
