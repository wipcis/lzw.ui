import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
interface vpc {
  id: number,
  name: string,
  cidrBlock: string,
  enableDnsSupport: boolean,
  region: string,
  instanceTenancy: string,
  tags: string
}

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
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
      id: 1,
      accountName: "orgroot",
      roleName: "",
      email: "",
      billing: true,
      accountType: "root",
      tags: ""
    },
    {
      id: 2,
      accountName: "logging",
      roleName: "",
      email: "",
      billing: false,
      accountType: "service",
      tags: ""
    },
    {
      id: 3,
      accountName: "security",
      roleName: "",
      email: "",
      billing: false,
      accountType: "service",
      tags: ""
    },
    {
      id: 4,
      accountName: "sharedservices",
      roleName: "",
      email: "",
      billing: false,
      accountType: "service",
      tags: ""
    },
    {
      id: 5,
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
  instanceTenancyOptions = [
    {value: "default", viewValue: "Shared Hardware"},
    {value: "dedicated", viewValue: "Single Tenant Hardware"},
    {value: "host", viewValue: "Dedicated Host"}
  ]
  vpcList = [
    {
      id: 1,
      name: "sharedservices",
      cidrBlock: "10.1.0.0/16",
      enableDnsSupport: true,
      region: "us-east-1",
      instanceTenancy: "default",
      tags: ""
    },
    {
      id: 2,
      name: "sandbox",
      cidrBlock: "10.2.0.0/16",
      enableDnsSupport: false,
      region: "us-east-1",
      instanceTenancy: "default",
      tags: ""
    },
    {
      id: 3,
      name: "preprod",
      cidrBlock: "10.3.0.0/16",
      enableDnsSupport: true,
      region: "us-east-1",
      instanceTenancy: "default",
      tags: ""
    },
    {      
      id: 4,
      name: "prod",
      cidrBlock: "10.4.0.0/16",
      enableDnsSupport: true,
      region: "us-east-1",
      instanceTenancy: "default",
      tags: ""
    },
    {
      id: 5,
      name: "dmz",
      cidrBlock: "10.5.0.0/16",
      enableDnsSupport: true,
      region: "us-east-1",
      instanceTenancy: "default",
      tags: ""
    },
    {
      id: 6,
      name: "dr",
      cidrBlock: "10.6.0.0/16",
      enableDnsSupport: true,
      region: "us-west-1",
      instanceTenancy: "default",
      tags: ""
    }
  ]
  subnets = {
    sharedservices: [
      {cidrBlock: "10.1.1.0/24", tags: ""}
    ],
    sandbox: [
      {cidrBlock: "10.2.1.0/24", tags: ""}
    ],
    preprod: [
      {cidrBlock: "10.3.1.0/24", tags: ""}
    ],
    prod: [
      {cidrBlock: "10.4.1.0/24", tags: ""}
    ],
    dmz: [
      {cidrBlock: "10.5.1.0/24", tags: ""}
    ],
    dr: [
      {cidrBlock: "10.6.1.0/24", tags: ""}
    ]
  }
  securityGroups = {
    sharedservices: [
      {
        name: "websg", 
        description: "web security group",
        egress: "egress,any,80,tcp,10.1.0.0/24|10.1.1.0/24",
        ingress: "ingress,any,80,tcp,10.1.0.0/24|10.1.1.0/24",
        tags: "",
      }
    ],
    sandbox: [
      {
        name: "websg", 
        description: "web security group",
        egress: "egress,any,80,tcp,10.1.0.0/24|10.1.1.0/24",
        ingress: "ingress,any,80,tcp,10.1.0.0/24|10.1.1.0/24",
        tags: "",
      }
    ],
    preprod: [
      {
        name: "websg", 
        description: "web security group",
        egress: "egress,any,80,tcp,10.1.0.0/24|10.1.1.0/24",
        ingress: "ingress,any,80,tcp,10.1.0.0/24|10.1.1.0/24",
        tags: "",
      }
    ],
    prod: [
      {
        name: "websg", 
        description: "web security group",
        egress: "egress,any,80,tcp,10.1.0.0/24|10.1.1.0/24",
        ingress: "ingress,any,80,tcp,10.1.0.0/24|10.1.1.0/24",
        tags: "",
      }
    ],
    dmz: [
      {
        name: "websg", 
        description: "web security group",
        egress: "egress,any,80,tcp,10.1.0.0/24|10.1.1.0/24",
        ingress: "ingress,any,80,tcp,10.1.0.0/24|10.1.1.0/24",
        tags: "",
      }
    ],
    dr: [
      {
        name: "websg", 
        description: "web security group",
        egress: "egress,any,80,tcp,10.1.0.0/24|10.1.1.0/24",
        ingress: "ingress,any,80,tcp,10.1.0.0/24|10.1.1.0/24",
        tags: "",
      }
    ]
  }
  services = {
    sharedservices: {
      directoryServices:"enabled",
      cloudwatch:"disabled",
      cloudtrail:"disabled",
      configLogs:"disabled",
      storageEncryption:"disabled",
      internetGateway:"disabled",
      sso:"disabled",
      loadBalancer:"disabled",
      firewall:"disabled",
      s2svpn:"disabled",
      directConnectGateway:"disabled",
      bastionHost:"disabled",
      caching:"disabled",
      cloudfront:"disabled"
    },
    sandbox: {
      directoryServices:"enabled",
      cloudwatch:"disabled",
      cloudtrail:"disabled",
      configLogs:"disabled",
      storageEncryption:"disabled",
      internetGateway:"disabled",
      sso:"disabled",
      loadBalancer:"disabled",
      firewall:"disabled",
      s2svpn:"disabled",
      directConnectGateway:"disabled",
      bastionHost:"disabled",
      caching:"disabled",
      cloudfront:"disabled"
    },
    preprod: {
      directoryServices:"enabled",
      cloudwatch:"disabled",
      cloudtrail:"disabled",
      configLogs:"disabled",
      storageEncryption:"disabled",
      internetGateway:"disabled",
      sso:"disabled",
      loadBalancer:"disabled",
      firewall:"disabled",
      s2svpn:"disabled",
      directConnectGateway:"disabled",
      bastionHost:"disabled",
      caching:"disabled",
      cloudfront:"disabled"
    },
    prod: {
      directoryServices:"enabled",
      cloudwatch:"disabled",
      cloudtrail:"disabled",
      configLogs:"disabled",
      storageEncryption:"disabled",
      internetGateway:"disabled",
      sso:"disabled",
      loadBalancer:"disabled",
      firewall:"disabled",
      s2svpn:"disabled",
      directConnectGateway:"disabled",
      bastionHost:"disabled",
      caching:"disabled",
      cloudfront:"disabled"
    },
    dmz: {
      directoryServices:"enabled",
      cloudwatch:"disabled",
      cloudtrail:"disabled",
      configLogs:"disabled",
      storageEncryption:"disabled",
      internetGateway:"disabled",
      sso:"disabled",
      loadBalancer:"disabled",
      firewall:"disabled",
      s2svpn:"disabled",
      directConnectGateway:"disabled",
      bastionHost:"disabled",
      caching:"disabled",
      cloudfront:"disabled"
    },
    dr: {
      directoryServices:"enabled",
      cloudwatch:"disabled",
      cloudtrail:"disabled",
      configLogs:"disabled",
      storageEncryption:"disabled",
      internetGateway:"disabled",
      sso:"disabled",
      loadBalancer:"disabled",
      firewall:"disabled",
      s2svpn:"disabled",
      directConnectGateway:"disabled",
      bastionHost:"disabled",
      caching:"disabled",
      cloudfront:"disabled"
    },
  }
  vpcPeersList = [
    {
      name: "prod-dmz",
      vpcId: "prod",
      peerVpcId: "dmz",
      tags: ""
    },
    {
      name: "prod-dr",
      vpcId: "prod",
      peerVpcId: "dr",
      tags: ""
    },
    {
      name: "prod-sandbox",
      vpcId: "prod",
      peerVpcId: "sandbox",
      tags: ""
    }
  ]
  s3list = [
    {
      bucketName: "logging",
      accessControl: "",
      bucketEncryption: true,
      corsConfig: "",
      tags: ""
    },
    {
      bucketName: "app-templates",
      accessControl: "",
      bucketEncryption: false,
      corsConfig: "",
      tags: ""
    },
  ]

  outJson = {
    csp: "aws",
    org: "",
    orgPrefix: "",
  }

  outJsonStr = JSON.stringify(this.outJson, null, 4);

  selectedTab = 0;
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
      id: this.accountList.length + 1,
      accountName: "",
      roleName: "",
      email: "",
      billing: true,
      accountType: "",
      tags: ""
    });
  }

  removeVpc(i) {
    this.vpcList.splice(i,1);
    delete this.subnets[i];
    delete this.securityGroups[i];
    delete this.services[i];
  }
  addVpc() {
    this.vpcList.push({
      id: this.vpcList.length + 1,
      name: "",
      cidrBlock: "",
      enableDnsSupport: true,
      region: "us-east-1",
      instanceTenancy: "default",
      tags: ""
    });
    console.log(JSON.stringify(this.vpcList));
  }
  removeVpcPeer(i) {
    this.vpcPeersList.splice(i,1);
  }
  addVpcPeer() {
    this.vpcPeersList.push({
      name: "",
      vpcId: "",
      peerVpcId: "",
      tags: ""
    });
  }
  removeS3Bucket(i) {
    this.s3list.splice(i,1);
  }
  addS3Bucket() {
    this.s3list.push(    {
      bucketName: "",
      accessControl: "",
      bucketEncryption: true,
      corsConfig: "",
      tags: ""
    });
  }
  removeSubnet(vpc,j){
    this.subnets[vpc].splice(j,1);
  }
  addSubnet(vpc) {
    this.subnets[vpc].push({
      cidrBlock: "x.x.x.x/x",
      tags: ""      
    })
  }
  removeSecurityGroup(vpc,j){
    this.securityGroups[vpc].splice(j,1);
  }
  addSecurityGroup(vpc) {
    this.securityGroups[vpc].push({
      name: "", 
      description: "",
      egress: "",
      ingress: "",
      tags: ""     
    })
  }
  compareItems(i1, i2) {
    return i1 && i2 && i1.id===i2.id;
  }
  trackElement(index: number, element: any) {
    return element ? element.id : null;
  }

  submitRequest() {
    console.log("Landing Zone create request submitted");
  }

  nextTab() {
    this.selectedTab += 1;
    if (this.selectedTab > this.vpcList.length) this.selectedTab = this.vpcList.length;
  }
  prevTab() {
    this.selectedTab -= 1;
    if (this.selectedTab < 0) this.selectedTab = 0;
  }
  constructAndReview() {
    var acc = []
    for(var obj of this.accountList) {
      if (/\S/.test(obj.accountName)) { 
        var str = obj.accountName + ":" + obj.roleName + ":" + obj.email + ":" + obj.billing + ":" +
          obj.accountType + ":" + obj.tags;
        acc.push(str);
      }
    }
    this.outJson["accounts"] = acc;

    this.outJsonStr = JSON.stringify(this.outJson,null,4);
    console.log("Config complete for review");
  }
}
