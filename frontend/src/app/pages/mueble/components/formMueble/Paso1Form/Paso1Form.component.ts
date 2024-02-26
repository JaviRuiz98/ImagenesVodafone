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

  @Input() imagenesIn?: string[];
  @Input() nombreIn?: string;
  @Input() regionIn?: regiones;
  @Input() objetivo_form: 'crear' | 'editar' = 'crear';

  @Output() formularioPaso1Change = new EventEmitter<FormGroup>();

  formularioPaso1:FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    region : ['',],
    imagenes: [[],], //strings para visualización
    archivos_imagenes: [[], Validators.max(2)], //Files para creación en la base de datos
  });

  get nombre() {
    return this.formularioPaso1.controls['nombre'];
  }
  get imagenes() {
    return this.formularioPaso1.controls['imagenes'];
  }

  get archivos_imagenes() {
    return this.formularioPaso1.controls['archivos_imagenes'];
  }

  get region(){
    return this.formularioPaso1.controls['region'];
  }

  


  ngOnInit() {
    this.enumService.getAllRegiones().subscribe((regiones: regiones[]) => {
      this.regiones = regiones;
    });
   
    if (!!this.imagenesIn && !!this.nombreIn) {
      console.log(this.regionIn);
      this.formularioPaso1.patchValue({
        nombre: this.nombreIn,
        imagenes: this.imagenesIn,
        region: this.regionIn
      });
    
      this.onSubmit();
    }

    this.formularioPaso1.valueChanges.subscribe(() => {
      this.onSubmit();
    });



  }

  ngOnChanges(changes: SimpleChanges) {
     if (changes['objetivo_form']) {
       
     }
  }

  deleteImage(index: number) {
    this.formularioPaso1.patchValue({
      imagenes: this.imagenes.value.filter((_, i) => i !== index)
    })
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
