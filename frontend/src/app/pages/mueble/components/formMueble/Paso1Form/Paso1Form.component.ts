import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-Paso1Form',
  templateUrl: './Paso1Form.component.html',
  styleUrls: ['./Paso1Form.component.css']
})
export class Paso1FormComponent implements OnInit {


  constructor(  private fb: FormBuilder) { }

  @Input() imagenesIn?: string[];
  @Input() nombreIn?: string;
  @Output() formularioPaso1Change = new EventEmitter<FormGroup>();

  formularioPaso1:FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    imagenes: [[],], //strings para visualización
    archivos_imagenes: [[]], //Files para creación en la base de datos
  })

  get nombre() {
    return this.formularioPaso1.controls['nombre'];
  }
  get imagenes() {
    return this.formularioPaso1.controls['imagenes'];
  }

  get archivos_imagenes() {
    return this.formularioPaso1.controls['archivos_imagenes'];
  }



  ngOnInit() {

    if (!!this.imagenesIn && !!this.nombreIn) {
      this.formularioPaso1.patchValue({
        nombre: this.nombreIn,
        imagenes: this.imagenesIn
      })
    }

    this.formularioPaso1.valueChanges.subscribe(() => {
      this.onSubmit();
    });

  }

  onArchivoSeleccionadoChange($event: { archivo: File }) {
    const url = URL.createObjectURL($event.archivo);
    const imagenesUpdated = [...this.imagenes.value, url];
    const archivosImagenesUpdated = [...this.archivos_imagenes.value, $event.archivo];
  
   
    this.formularioPaso1.patchValue({
      imagenes: imagenesUpdated,
      archivos_imagenes: archivosImagenesUpdated,
    });
  
  }

  
onSubmit() {
  this.formularioPaso1Change.emit(this.formularioPaso1);  
}
  
  


  
  

}
