import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClientService } from 'src/app/core/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-client-form-page',
  templateUrl: './client-form-page.component.html',
  styleUrls: ['./client-form-page.component.css']
})
export class ClientFormPageComponent implements OnInit{

  clientForm: FormGroup;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private location: Location,
              private activedRouter: ActivatedRoute,
              private toastService: ToastService,
              private router: Router
              ) {
    this.clientForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      comments: ['']
    });
  }

  ngOnInit(): void {
     this.activedRouter.paramMap.subscribe( params => {
        let clientId = Number(params.get("id") ?? "0");

        if(clientId){
          this.loadClient(clientId);
          this.isEditing = true;
        }
     })
  }

  loadClient(clientId: number) {
      this.clientService.getClientById(clientId).subscribe({
          next: client => this.clientForm.setValue(client),
          error: () => alert("Erro ao carregar um cliente")
      })
  }

  save() {
    if (this.clientForm.valid) {
      if(this.isEditing){
        this.clientService.update(this.clientForm.value).subscribe(
          {
            next: () => {
              this.toastService.show("Cliente atualizado com sucesso!",{classname: "bg-success text-light"});
              this.router.navigate(['/clients-table']);
            },
            error: () => this.toastService.show("Erro ao salvar o cliente!",{classname: "bg-danger text-light"})
          }
        );
      }
      else{
        this.clientService.save(this.clientForm.value).subscribe(
          {
            next: () => {
              this.toastService.show("Cliente salvo com sucesso!",{classname: "bg-success text-light"});
              this.router.navigate(['/clients-table']);;
            },
            error: () => this.toastService.show("Erro ao criar o cliente!",{classname: "bg-danger text-light"})
          }
        );
      }
    }
  }

  cancel(){
    this.router.navigate(['/clients-table']);
  }

  get cfName() {return this.clientForm.get("name")}
  get cfPhone() {return this.clientForm.get("phone")}
  get cfDateOfBirth() {return this.clientForm.get("dateOfBirth")}

}
