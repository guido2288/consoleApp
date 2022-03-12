const Tarea = require('./tarea');

//creamos la clase
class Tareas {
    //propiedad 
    _listado = {};
    //usamos get para retornar nuevo array
    get listaArr () {

        const listado = [];
        //el array lo llenamos mediante esta función
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        } )
        //regresamos el array 
        return listado;

    }

    constructor() {
        this._listado = {}
    }

    borrarTarea(id = ''){

        if( this._listado[id] ) {
            delete this._listado[id];   
        }

    } 

    cargarTareasFromArray( tareas = [] ){
        
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        } );

    };

    
    crearTarea( desc = '' ){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    
    listadoCompleto( ){
        
        console.log();
        this.listaArr.forEach( (tarea , i )=> {
            //sacamos el indice
            const idx = `${i + 1}`.yellow;
            const { desc , completadoEn} = tarea; 
            const estado = ( completadoEn )
                                ? 'Compleatada'.green
                                : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`);
        } );

    };

    

    listarCompletadas(  ){

        let contador = 0;
        this.listaArr.forEach( (tarea, i) => {

            
            const { desc , completadoEn} = tarea; 
            const estado = ( completadoEn )
                                ? 'Compleatada'.green
                                : 'Pendiente'.red;
            
            if( completadoEn ) {
                contador += 1;
                return console.log(`${ (contador + '.').yellow } ${ desc } :: ${ completadoEn.yellow }`);
            }

        } )
    };

    listarPendientes(  ){
        let contador = 0;
        this.listaArr.forEach( (tarea, i) => {

            
            const { desc , completadoEn} = tarea; 
            const estado = ( completadoEn )
                                ? 'Compleatada'.green
                                : 'Pendiente'.red;
            
            if( !completadoEn ) {
                contador += 1;
                return console.log(`${ (contador + '.').yellow } ${ desc } :: ${ estado }`);
            }

        } )
    };

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listaArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        } )

    }

};

module.exports = Tareas;