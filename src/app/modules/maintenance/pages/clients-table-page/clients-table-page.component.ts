import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/core/models/client';
import { Page } from 'src/app/core/models/page';
import { ClientService } from 'src/app/core/services/client.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-clients-table-page',
  templateUrl: './clients-table-page.component.html',
  styleUrls: ['./clients-table-page.component.css']
})
export class ClientsTablePageComponent implements OnInit {

  constructor(private clientService: ClientService, private toastService: ToastService){}

  clientPage: Page<Client> = {} as Page<Client>;
  page = 1;

  clients: Client[] = [];
  nameFilter: string = "";


  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients(this.nameFilter, this.page).subscribe({
        next: response => {
            this.clientPage.content = response.body;
            this.clientPage.numberOfElements = parseInt(response.headers.get("X-Total-Count") || "0");
        }
    });
  }

  pageChange(){
    this.loadClients();
  }

  filterName(){
    this.loadClients();
  }

  delete(client: Client){
    this.clientService.delete(client).subscribe({
      next: () => {
       this.toastService.show("Cliente removido com sucesso!",{classname: "bg-success text-light"});
       this.loadClients();
      },
      error: () => {
        this.toastService.show("Erro ao remover o cliente!",{classname: "bg-danger text-light"});
      }
  });
  }


}

