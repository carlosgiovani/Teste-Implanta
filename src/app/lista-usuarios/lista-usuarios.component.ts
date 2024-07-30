import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEditComponent } from '../add-edit/add-edit.component';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css',
})
export class ListaUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cargo', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  recebimentoValor: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog
  ) {
    const contrecebido = usuariosService.obterDados().subscribe((dados) => {
      this.recebimentoValor = dados;
      if (dados) {
        this.getListaUsuarios();
      }
    });
  }

  ngOnInit(): void {
    this.getListaUsuarios();
  }

  getListaUsuarios() {
    this.usuariosService.listarUsuarios().subscribe({
      next: (resp) => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  delUsuario(id: number) {
    this.usuariosService.deletarUsuario(id).subscribe({
      next: (resp) => {
        alert('Usuário deletado');
        this.getListaUsuarios();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  editarUsuario(data: any) {
    this.dialog.open(AddEditComponent, {
      data,
    });
  }
}
