import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuariosService } from '../services/usuarios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css',
})
export class AddEditComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      primeiroNome: '',
      cargo: '',
      email: '',
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.data) {
        this.usuarioService
          .atualizarUsuario(this.data.id, this.form.value)
          .subscribe({
            next: (val: any) => {
              alert('Usuário atualizado.');
              this.dialogRef.close(true);
              this.usuarioService.enviarDados('teste');
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.usuarioService.adicionarUsuario(this.form.value).subscribe({
          next: (val: any) => {
            alert('Usuário cadastrado.');
            this.dialogRef.close(true);
            this.usuarioService.enviarDados('teste');
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
