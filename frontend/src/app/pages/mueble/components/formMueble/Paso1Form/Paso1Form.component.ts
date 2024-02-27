import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regiones } from 'src/app/interfaces/regiones';
import { EnumService } from 'src/app/servicios/enum.service';

@Component({
  selector: 'app-Paso1Form',
  templateUrl: './Paso1Form.component.html',
  styleUrls: ['./Paso1Form.component.css']
})
export class Paso1FormComponent implements OnInit {

  regionSeleccionada?: regiones;
  regiones: regiones[] = [];


  constructor(  private fb: FormBuilder, private enumService: EnumService) { }

  @Input () formulario : FormGroup;
  @Input() objetivo_form: 'crear' | 'editar' = 'crear';

  @Output() formularioPaso1AddedImage = new EventEmitter();


  get nombre_mueble() {
    return this.formulario.controls['nombre_mueble'];
  }
  get imagenes() {
    return this.formulario.controls['imagenes'];
  }

  get archivos_imagenes() {
    return this.formulario.controls['archivos_imagenes'];
  }

  get region(){
    return this.formulario.controls['region'];
  }

  ngOnInit() {
    this.enumService.getAllRegiones().subscribe((regiones: regiones[]) => {
      this.regiones = regiones;
    });
   


  }

 
  deleteImage(index: number) {
    this.formulario.patchValue({
      imagenes: this.imagenes.value.filter((_, i) => i !== index)
    })
  }

  onArchivoSeleccionadoChange($event: { archivo: File }) {
    const url = URL.createObjectURL($event.archivo);
    const imagenesUpdated = [...this.imagenes.value, url];
    const archivosImagenesUpdated = [...this.archivos_imagenes.value, ];
  
   
    this.formulario.patchValue({
        imagenes:imagenesUpdated,
        archivos_imagenes:archivosImagenesUpdated
    });

    this.formularioPaso1AddedImage.emit();

  }


}
