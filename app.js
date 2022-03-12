require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa, 
        leerInput, 
        listadoTareasBorrar, 
        confirmar,
        mostrarListadoCheckList
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() =>{
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ) {
        //establecer las tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        // Imprimir el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
                break;
            case '2':
                tareas.listadoCompleto();
                    
                break;
            case '3':
                tareas.listarCompletadas();
                break;
            case '4':
                tareas.listarPendientes();
                break;
            case '5':
                const ids = await mostrarListadoCheckList( tareas.listaArr );
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listaArr );
                if( id !== '0' ) {

                    const ok = await confirmar('¿Está seguro de borrar la tarea?');
    
                    if (ok) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }

                }
                break;
        }

        guardarDB( tareas.listaArr );

        await pausa();
        
    } while ( opt !== '0' );


    // pausa();
};


main()