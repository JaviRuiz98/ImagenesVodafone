import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  @Output() formularioPaso1AddedImage = new EventEmitter< { imagenes: string, archivos_imagenes: File }>();
  @Output() formularioPaso1DeletedExpositor = new EventEmitter<number>();


  get nombre_mueble() {
    return this.formulario.controls['nombre_mueble'];
  }
 
  get region(){
    return this.formulario.controls['region'];
  }
  get expositores() {
    return this.formulario.get('expositores') as FormArray;
  }
  
  get imagenesExpositores(): string[] {
    let imagenes: string[] = [];
  
    this.expositores.controls.forEach((expositor) => {
      const atributosExpositores = expositor.get('atributos_expositores') as FormArray;
  
      atributosExpositores.controls.forEach((atributoExpositor) => {
        
        const elemento = atributoExpositor.get('elemento') as FormGroup;
        const categoria = elemento.get('categoria_elementos')?.value;
        const imagen = elemento.get('imagen')?.value;
        if (imagen && categoria.id === 3) {
          imagenes.push(imagen);
        }
      });
    });
  
    const imagenesUnicas = [...new Set(imagenes)];
    console.log()
    return imagenesUnicas;
  }
  
  

  ngOnInit() {
    this.enumService.getAllRegiones().subscribe((regiones: regiones[]) => {
      this.regiones = regiones;
    });
   


  }

 
  deleteImage(index: number) {
    this.formularioPaso1DeletedExpositor.emit(index);
  }

  onArchivoSeleccionadoChange($event: { archivo: File }) {
    const url = URL.createObjectURL($event.archivo);
 
    this.formularioPaso1AddedImage.emit({
      imagenes: url,
      archivos_imagenes: $event.archivo
    });

  }


}
