import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { UniformesService } from 'src/app/servicios/uniformes/uniformes.service'; 
import { pedidos } from 'src/app/interfaces/pedidos';
import { carrito } from 'src/app/interfaces/carrito';
import { productos } from 'src/app/interfaces/productos';
import { caracteristicas_productos } from 'src/app/interfaces/caracteristicas'; 
import { tienda } from 'src/app/interfaces/tienda';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service'; 

 
import { Observable } from 'rxjs';
import { FiltroState } from 'src/app/state/estadisticas/elementoSeleccionados.state';

interface estadisticasUniforme {
  total: number;
  totalPorTalla: number[]; // suma de talla en la posicion de su respectiva talla 

}



@Component({
  selector: 'app-estadisticas-uniformes',
  templateUrl: './estadisticas-uniformes.component.html',
  styleUrls: ['./estadisticas-uniformes.component.css'],
 
})





export class EstadisticasUniformesComponent implements OnInit {

//
  loading: boolean = true;  
  statuses!: any[];
  selectedPedidos: pedidos = {
    id: 0, 
    id_tienda: 0,
    fecha: new Date(),
    fecha_entrega: null,
    estado: '',
    sfid: ''

  }
//


 
  productos_nombres = ['Forro', 'Polo', 'Pantalon', 'Tarjeta', 'Lanyard', 'Lanyard Practicas'];

  estadisticasPorTalla: estadisticasUniforme;


  
  tiendaSeleccionada: tienda = {
    id: 0,
    cif: '',
    razon_social: '',
    tipo_distribuidor: '',
    sfid: '',
    nombre: '',
    activo: false,
    visible: false,
    vodafone: false,
    lowi: false,
    canal: '',
    tipo_pdv: '',
    zona_geografica: '',
    provincia: '',
    poblacion: '',
    cp: '',
    pertenencia_mueble_tienda: [],
    imagen_plano: {
      id_imagen: 0,
      url: ''
    },
  }

  tiendas: tienda[] = [];

  pedidosTodos!: pedidos[];
  pedidosFiltrados!: pedidos[];

  carritoTodos!: carrito[];
  carritoFiltrado!: carrito[];

  productosTodos: productos[] = [];
  producto: productos = {
    id: 0,
    nombre: '',
    precio: 0,
    genero: '',
    descripcion: '',
    imagenes: {
      id_imagen: 0,
      url: ''
    },
    caracteristicas_productos: [],

  }
  productosPredefinidos: productos[] = [];

  productos_filtrados: productos[] = [];

  caracteristicas_productos!: caracteristicas_productos[];

  mostrarInfoProducto: boolean = false;
  ///
  data: any;
  dataHombre: number[] = [];
  dataMujer: number[] = [];
  dataUnisex: number[] = [];
  options: any;
  mostrarGrafica: boolean = false;
  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
//

  public loading$: Observable<boolean>;
  public periodo_fechas$: Observable<Date[]>;

  rangeDates: Date[] | undefined;

  constructor(private uniformesService: UniformesService, private tiendasService: TiendasService, private state: FiltroState) {
    this.dataHombre = new Array(this.productos_nombres.length).fill(0);
    this.dataMujer = new Array(this.productos_nombres.length).fill(0);
    this.dataUnisex = new Array(this.productos_nombres.length).fill(0);
    this.setStateSelectors();
   }
   private setStateSelectors() {
    this.loading$ = this.state.loading$;
    this.periodo_fechas$ = this.state.periodoFechas$;
 
  }

  


  inicializar() {
    this.uniformesService.getPedidos().subscribe((pedidos) => {
      this.pedidosTodos = pedidos;
      this.loading = false;
    })

    this.uniformesService.getCarrito().subscribe((carrito) => { //todos los items registrados en carritos
      this.carritoTodos = carrito;
    })

    this.uniformesService.getProductos().subscribe((productos) => {
      this.productosTodos = productos;

    })

    this.uniformesService.getCaracteristicas().subscribe((caracteristicas_productos) => {
      this.caracteristicas_productos = caracteristicas_productos;
    })

    this.inicializaProductos();
    this.inicializaCaracteristicasProducto(); 
    this.initTiendas() 
  }

  initTiendas() {
    this.tiendasService.getAllTiendas().subscribe((data: tienda[]) => {
      this.tiendas = data;
    })
  }



  inicializaProductos() {
    this.productosPredefinidos = [];
    this.uniformesService.getProductos().subscribe(
      (productos: productos[]) => {
        this.productosPredefinidos = productos;
      //  this.producto_seleccionado = this.productosTodos[0];
        this.inicializaCaracteristicasProducto();
      }
    );

  }
 
  inicializaCaracteristicasProducto() {
    this.uniformesService.getCaracteristicas().subscribe(
      (caracteristicas: caracteristicas_productos[]) => {
        this.caracteristicas_productos = caracteristicas;
        this.productosPredefinidos.map(producto => {
          producto.caracteristicas_productos = this.caracteristicas_productos.filter(caracteristica => caracteristica.id_producto === producto.id);
      
        })
      }
    );
  }


  onTiendaSelected(){
    this.filtrarPorFecha();
  }

  filtrarPorFecha() {
    if(this.rangeDates == undefined){return;}
    this.dataHombre = new Array(this.productos_nombres.length).fill(0);
    this.dataMujer = new Array(this.productos_nombres.length).fill(0);
    this.dataUnisex = new Array(this.productos_nombres.length).fill(0);
    this.productos_filtrados = [];

    this.pedidosFiltrados = [];
    this.carritoFiltrado = [];


    if (this.rangeDates) {

      this.pedidosFiltrados = this.pedidosTodos.filter((pedido) => { //solo por fecha
        return new Date(pedido.fecha).getTime() >= new Date(this.rangeDates[0]).getTime() && new Date(pedido.fecha).getTime() <= new Date(this.rangeDates[1]).getTime();
      });
      if(this.tiendaSeleccionada.id != 0){
        this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => pedido.id_tienda === this.tiendaSeleccionada.id);
      }
 
      this.pedidosFiltrados.forEach((pedido) => {
        const carritosFiltrados = this.carritoTodos.filter(carrito => carrito.id_pedido === pedido.id);
        this.carritoFiltrado = [...this.carritoFiltrado, ...carritosFiltrados];
      });

      this.carritoFiltrado.forEach((carrito) => { // implementar dataHombre, mujer y unisex
        let caracteristica = this.caracteristicas_productos.find(caracteristica => caracteristica.id === carrito.id_caracteristicas_productos);
        let producto = this.productosTodos.find(producto => caracteristica.id_producto === producto.id);
        const producto_seleccionado: productos = {
          id: caracteristica.id_producto,
          nombre: producto.nombre,
          precio: producto.precio,
          genero: producto.genero,
          descripcion: producto.descripcion,
          imagenes: producto.imagenes,
          caracteristicas_productos: [],
          caracteristica_seleccionada:{
            id: caracteristica.id,
            id_producto: caracteristica.id_producto,
            genero: "",
            talla: caracteristica.talla,
            stock: 0
          },
          cantidad: carrito.cantidad,
        }

        this.productos_filtrados.push(producto_seleccionado);
      })

      console.log(this.productos_filtrados);

      this.productos_filtrados.forEach(producto => {
        for(let i = 0; i < this.productos_nombres.length; i++){
          if(producto.nombre == this.productos_nombres[i]){
            if(producto.genero == 'Hombre'){
              this.dataHombre[i] += producto.cantidad;

            }else if(producto.genero == 'Mujer'){
             this.dataMujer[i] += producto.cantidad; 
            }else if(producto.genero == null){
              this.dataUnisex[i] += producto.cantidad;
            }
          } 
        }

      })
      console.log(this.dataHombre, this.dataMujer, this.dataUnisex);
      this.data = {
        labels: this.productos_nombres,
        datasets: [
            {
                label: 'Hombre',
                backgroundColor: this.documentStyle.getPropertyValue('--blue-500'),
                borderColor: this.documentStyle.getPropertyValue('--blue-500'),
                data: this.dataHombre
            },
            {
                label: 'Mujer',
                backgroundColor: this.documentStyle.getPropertyValue('--pink-500'),
                borderColor: this.documentStyle.getPropertyValue('--pink-500'),
                data: this.dataMujer
            },
            {
                label: 'Unisex',
                backgroundColor: this.documentStyle.getPropertyValue('--yellow-500'),
                borderColor: this.documentStyle.getPropertyValue('--yellow-500'),
                data: this.dataUnisex
            }
        ]
      };
      this.mostrarGrafica = true;
    }  
  }

  mostrarInfo(nombre: string, genero: string) {
    this.producto = this.productosPredefinidos.find(producto => (producto.nombre == nombre) && (producto.genero == genero));

    this.estadisticasPorTalla = {
      total: 0,
      totalPorTalla: new Array(this.producto.caracteristicas_productos.length).fill(0),
    }

    this.productos_filtrados.forEach(producto => {
      if(producto.id == this.producto.id){
        for(let i = 0; i< this.producto.caracteristicas_productos.length; i++){
          if(this.producto.caracteristicas_productos[i].talla == producto.caracteristica_seleccionada.talla){
            this.estadisticasPorTalla.totalPorTalla[i] += producto.cantidad;
            this.estadisticasPorTalla.total += producto.cantidad;
          }
        }
      }
    })
    console.log(this.estadisticasPorTalla);
    this.mostrarInfoProducto = true;
  }


  ngOnInit(): void {


    this.inicializar();
    this.periodo_fechas$.subscribe(fechas => {
    
      this.rangeDates = fechas;
      if(fechas.length == 0){
        this.rangeDates = [new Date('2023-01-01'), new Date()];
      }
      this.filtrarPorFecha();

    });


    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          legend: {
              labels: {
                  color: this.textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: this.textColorSecondary,
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  color: this.surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: this.textColorSecondary
              },
              grid: {
                  color: this.surfaceBorder,
                  drawBorder: false
              }
          }

      }
    };
    setTimeout(() => {
      this.filtrarPorFecha();
    },1300)
    console.log(this.pedidosTodos);
  }






}