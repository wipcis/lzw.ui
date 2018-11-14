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
      type: "root",
      tags: ""
    },
    {
      accountName: "logging",
      roleName: "",
      email: "",
      billing: false,
      type: "service",
      tags: ""
    },
    {
      accountName: "security",
      roleName: "",
      email: "",
      billing: false,
      type: "service",
      tags: ""
    },
    {
      accountName: "sharedservices",
      roleName: "",
      email: "",
      billing: false,
      type: "service",
      tags: ""
    }
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
    alert(JSON.stringify(this.accountList[i]));
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
      type: "",
      tags: ""
    });
  }
}
