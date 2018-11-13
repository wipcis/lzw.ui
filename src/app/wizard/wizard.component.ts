import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  introFormGroup: FormGroup;
  designInputsFormGroup: FormGroup;
  vpcConfigurationFormGroup: FormGroup;
  reviewFormGroup: FormGroup;
  csp = "aws";
  dataSource = [];
  
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
  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.introFormGroup = this._formBuilder.group({
      introCtrl: ['', Validators.required]
    });
    this.designInputsFormGroup = this._formBuilder.group({
      designInputsCtrl: ['', Validators.required]
    });
    this.vpcConfigurationFormGroup = this._formBuilder.group({
      vpcConfigurationCtrl: ['', Validators.required]
    });
    this.reviewFormGroup = this._formBuilder.group({
      reviewCtrl: ['', Validators.required]
    });
  }

}
