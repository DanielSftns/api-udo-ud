const { Router } = require('express');
const router = Router(); 
const request = require("request-promise"),
    RUTA = "https://proyectoudo-92b9b.firebaseio.com/horarios.json";

let Horarios=[];
let estadoHorario= new Array(5);
let materiasQueChocan=[];
let CombinacionesHorarios=[];
let horariosFinales=[];



request({
    uri: RUTA,
    json: true, // Para que lo decodifique automáticamente 
}).then(items => {
    for(let item of items){
      Horarios.push(item);
    }
    // console.log('cargado horarios');
});


class Api{
  // materiasPorCursar
  // tamanoGrupo
  // tamanoMinimoGrupo
  // minimoCreditos
  // limiteCreditos
  // posiblesCombinaciones=[]

  constructor(materiasPorCursar, tamanoGrupo, tamanoMinimoGrupo, minimoCreditos, limiteCreditos){
        this.materiasPorCursar= materiasPorCursar;
        this.tamanoGrupo= tamanoGrupo;
        this.tamanoMinimoGrupo= tamanoMinimoGrupo;
        this.minimoCreditos= minimoCreditos;
        this.limiteCreditos= limiteCreditos;
        this.posiblesCombinaciones=[];
    }
  generarTodasPosibilidades(){
    return new Promise((resolve, reject)=>{
      this.posiblesCombinaciones=[];
      do{
      this.generarPermutacionNoSust(this.materiasPorCursar, [], this.tamanoGrupo);
      this.tamanoGrupo--;
      }while(this.tamanoGrupo>=this.tamanoMinimoGrupo);

      if(this.posiblesCombinaciones.length == 0){
        const errorMessage = `Las materias que puedes ver no llegan a: ${this.minimoCreditos} créditos`;
        reject(errorMessage);
      }else{
        resolve(this.posiblesCombinaciones);
      }
      
    })
    .then(posiblesCombinaciones => posiblesCombinaciones)
    .catch(error => error);
  }

  generarPermutacionNoSust(elementos,actual, cantidad){
    if(cantidad==0){
      if(!this.compruebaExistencia(actual)){
        if(this.CompruebaCreditos(actual)){  
        
          this.posiblesCombinaciones.push(actual);

        }
      }
    }else{
      for(let i=0; i<elementos.length; i++){
        if(!actual.includes(elementos[i])){
          this.generarPermutacionNoSust(elementos,actual.concat(elementos[i]),cantidad-1);
        }

      }
    }
  }

  CompruebaCreditos(combinacion){
    let suma =0;
    for(let materia of combinacion){
      suma = suma + materia.creditos;
      if(suma > this.limiteCreditos){
        // console.log(suma,'Rango NO aceptado', combinacion)
        return false;
      } 
    }
    if(suma < this.minimoCreditos){
      return false;
    }else{
      //Esta combinacion está dentro del rango aceptado
      return true;
    }
  }

  compruebaExistencia(combinacion){
    for(let i=0; i<this.posiblesCombinaciones.length; i++){
      let coincidencias=0;
      for(let j=0; j<combinacion.length; j++){
        if((this.posiblesCombinaciones[i]).includes(combinacion[j])){
          coincidencias++;
          if(coincidencias == combinacion.length && combinacion.length == (this.posiblesCombinaciones[i]).length){
          // console.log('REPETIDA', this.posiblesCombinaciones[i]);
          return true;
          }

        }
      }
    }
    //false si no existe
    return false;
  }

  /*horarios*/
  dia(dia){
    let DIA;
    switch (dia){
      case "Lun":
        DIA = 0;
        break;
      case "Mar":
        DIA = 1;
        break;
      case "Mie":
        DIA = 2;
        break;
      case "Jue":
        DIA = 3;
        break;
      default:
        DIA = 4;
        break;
    }
    return DIA;
  }
  desde(desde){
    let DESDE;
    switch (desde){
      case "07:00":
        DESDE = 0;
        break;
      case "07:50":
        DESDE = 1;
        break;
      case "08:35":
        DESDE = 2;
        break;
      case "08:40":
        DESDE = 3;
        break;
      case "09:25":
        DESDE = 4;
        break;
      case "09:30":
        DESDE = 5;
        break;
      case "10:15":
        DESDE = 6;
        break;
      case "10:20":
        DESDE = 7;
        break;
      case "11:05":
        DESDE = 8;
        break;
      case "11:10":
        DESDE = 9;
        break;
      case "11:55":
        DESDE = 10;
        break;
      case "12:00":
        DESDE = 11;
        break;
      case "12:45":
        DESDE = 12;
        break;
      case "12:50":
        DESDE = 13;
        break;
      case "13:35":
        DESDE = 14;
        break;
      case "14:00":
        DESDE = 15;
        break;
      case "14:45":
        DESDE = 16;
        break;
      case "14:50":
        DESDE = 17;
        break;
      case "15:35":
        DESDE = 18;
        break;
      case "15:40":
        DESDE = 19;
        break;
      case "16:25":
        DESDE = 20;
        break;
      case "16:30":
        DESDE = 21;
        break;
      case "17:15":
        DESDE = 22;
        break;
      case "17:20":
        DESDE = 23;
        break;
      case "18:05":
        DESDE = 24;
        break;
      case "18:55":
        DESDE = 25;
        break;          
      default:
      // 19:45
        DESDE = 26;
        break;
    }
    return DESDE;
  }
  hasta(hasta){
    let HASTA;
    switch (hasta){
      case "07:00":
        HASTA = 0;
        break;
      case "07:50":
        HASTA = 1;
        break;
      case "08:35":
        HASTA = 2;
        break;
      case "08:40":
        HASTA = 3;
        break;
      case "09:25":
        HASTA = 4;
        break;
      case "09:30":
        HASTA = 5;
        break;
      case "10:15":
        HASTA = 6;
        break;
      case "10:20":
        HASTA = 7;
        break;
      case "11:05":
        HASTA = 8;
        break;
      case "11:10":
        HASTA = 9;
        break;
      case "11:55":
        HASTA = 10;
        break;
      case "12:00":
        HASTA = 11;
        break;
      case "12:45":
        HASTA = 12;
        break;
      case "12:50":
        HASTA = 13;
        break;
      case "13:35":
        HASTA = 14;
        break;
      case "14:00":
        HASTA = 15;
        break;
      case "14:45":
        HASTA = 16;
        break;
      case "14:50":
        HASTA = 17;
        break;
      case "15:35":
        HASTA = 18;
        break;
      case "15:40":
        HASTA = 19;
        break;
      case "16:25":
        HASTA = 20;
        break;
      case "16:30":
        HASTA = 21;
        break;
      case "17:15":
        HASTA = 22;
        break;
      case "17:20":
        HASTA = 23;
        break;
      case "18:05":
        HASTA = 24;
        break;
      case "18:55":
        HASTA = 25;
        break;            
      default:
        HASTA = 26;
        break;
    }
    return HASTA;
  }

  comprobarPosibleHorario(combinacion){
    if(!this.compruebaInexistenciaDeChoque(combinacion)){
      return false;
    }
    for(let i=0; i<5;i++){
      estadoHorario[i] = new Array(27);
      for(let j=0;j<27;j++){
        estadoHorario[i][j]={
          estado: false,
          materia:'',
          seccion:'',
          dia:'',
          desde:'',
          hasta:''
        };
      }
    }

    for(let materia of combinacion){
      // console.log(materia)
      let HorarioMateria = Horarios.filter(horario => horario.codigo == materia.codigo);
      let SeccionesMateria = [];
      for(let item of HorarioMateria){
        if(!SeccionesMateria.includes(item.seccion)){
          SeccionesMateria.push(item.seccion);
        }
      }
      // console.log('intendando con:',materia.materia);
      // console.log('secciones: ',SeccionesMateria);
      let diasClase = HorarioMateria.filter(h =>h.seccion == materia.seccion);
      // console.log('dias de clase',diasClase)
      for(let dia of diasClase){
        // console.log(dia)
        let DIA = this.dia(dia.dia);
        let DESDE = this.desde(dia.desde);
        let HASTA = this.hasta(dia.hasta);
        // console.log(dia)
        // console.log(DIA,DESDE,HASTA)
        let i = DESDE;
        do {
          if(estadoHorario[DIA][i].estado==true){
            let choque ={
              materia1:{
                codigo:dia.codigo,
                materia: dia.materia,
                seccion: dia.seccion
              },
              materia2:{
                codigo: estadoHorario[DIA][i].codigo,
                materia: estadoHorario[DIA][i].materia,
                seccion: estadoHorario[DIA][i].seccion
              }
            }
            // console.log('materias que chocan',materiasQueChocan)
            materiasQueChocan.push(choque);
            // errorMessage = `${dia.materia} choca con: ${estadoHorario[DIA][i].materia}, el día: ${estadoHorario[DIA][i].dia} a las: ${dia.desde}`;
              // console.log('Error',dia.materia,'choca con:', this.estadoHorario[DIA][i].materia,' el dia: ',this.estadoHorario[DIA][i].dia,' a las:', dia.desde);
              // for(let k=0; k<5;k++){
              //   for(let j=0;j<27;j++){
              //     this.estadoHorario[k][j]={
              //       estado: false,
              //       materia:'',
              //       seccion:'',
              //       dia:'',
              //       desde:'',
              //       hasta:''
              //     };
              //   }
              // }
              // this.intentos++;
              // console.log('Intento: ',this.intentos);
              return false;
          }else{
            estadoHorario[DIA][i]={
              estado: true,
              materia: dia.materia,
              codigo: dia.codigo,
              seccion: dia.seccion,
              dia: dia.dia,
              desde: dia.desde,
              hasta: dia.hasta
            };
            // console.log('agregado',this.estadoHorario[DIA][i]);
          }
          i++;
        }while (i <= HASTA);
        
      }/*fin dia for*/      
    }/*fin materia for*/
    return true;

  }


  comprobarCombinacionHorario(combinacion){
    horariosFinales=[];
    let materiasAnadidas = [];
    let combinacionSecciones=[];
    //esto para determinar el total de secciones, armar las
    //saber las combinaciones posibles para saber si es imposibles la combinacion
    for(let materia of combinacion){
      // console.log(materia)
      let CodigoMateria = materia.codigo;
      let Hmateria = Horarios.filter(horario=> horario.codigo === CodigoMateria);
      // console.log(materia.materia,'=',Hmateria)
      let secciones = [];
      for(let item of Hmateria){
        if(!secciones.includes(item.seccion)){
          secciones.push(item.seccion);
          let materiaSeccion = {
            codigo: materia.codigo,
            materia: materia.materia,
            seccion: item.seccion
          };
          combinacionSecciones.push(materiaSeccion);
        }
      }
      // console.log(materia.materia,'secciones: ',secciones)
    }

    let imposible =false;
    let intentos = 0;
    // console.log('para combinar:',combinacionSecciones);
    this.generarCombinacionesH(combinacionSecciones,[],combinacion.length);
    // // console.log(this.posiblesCombinaciones);
    let posiblesIntentos= CombinacionesHorarios.length;
    // console.log('posibles cominaciones:',posiblesIntentos)
    for(let horario of CombinacionesHorarios){
      if(this.comprobarPosibleHorario(horario)){
        // console.log(horario);
        horariosFinales.push(horario);
      }else{
        intentos++;
        // console.log('Error, en: ', horario)
        // console.log(this.errorMessage)
        // console.log('Intento: ',intentos)
        if(intentos >= posiblesIntentos){
          imposible=true;
          break;
        }
      }
    }
    if(imposible){
      // console.log('imposible')
      return false;
    }else{
      // console.log('Intento: ',intentos)
      // console.log('horarios finales', this.horariosFinales)
      // console.log(this.materiasQueChocan)
      return true;
    }
    


  }/*fin funcion*/

  generarCombinacionesH(elementos,actual, cantidad){
    if(cantidad==0){
      if(!this.compruebaExistenciaH(actual)){
       
          CombinacionesHorarios.push(actual);
    
      }
    }else{
      for(let i=0; i<elementos.length; i++){
        if(!actual.some(materia => materia.codigo == elementos[i].codigo)){
          this.generarCombinacionesH(elementos,actual.concat(elementos[i]),cantidad-1);
        }
      }
    }
  }

  compruebaExistenciaH(combinacion){
    for(let i=0; i<CombinacionesHorarios.length; i++){
      let coincidencias=0;
      for(let j=0; j<combinacion.length; j++){
        if(CombinacionesHorarios[i].some(materia => materia.seccion == combinacion[j].seccion && materia.codigo == combinacion[j].codigo)){
          coincidencias++;
          if(coincidencias == combinacion.length && combinacion.length == (CombinacionesHorarios[i]).length){
          // console.log('REPETIDA', this.posiblesCombinaciones[i]);
          return true;
          }

        }
      }
    }
    //false si no existe
    return false;
  }

  compruebaInexistenciaDeChoque(combinacion){
    for(let choqueGuardado of materiasQueChocan){
      // console.log(choqueGuardado)
      // console.log(combinacion)
      let choque=[];
      for(let materia of combinacion){
        // console.log(materia)
        if(choqueGuardado.materia1.codigo == materia.codigo && choqueGuardado.materia1.seccion == materia.seccion){
          choque.push(materia);
        }
        if(choqueGuardado.materia2.codigo == materia.codigo && choqueGuardado.materia2.seccion == materia.seccion){
          choque.push(materia);
        }
      }
      // console.log(choque)
      if(choque.length==2){
        // console.log('choque detectado', choqueGuardado)
        return false;
      }
    }
    return true;
  }


}


router.post('/', (req, res) =>{
  
  const {materias, Grupo, tamanoMinimo, minimoC, limiteC} = req.body;
  if(materias && Grupo && tamanoMinimo && minimoC && limiteC){
    const materiasPorCursar = materias;
    
    const tamanoGrupo = parseInt(Grupo);
    const tamanoMinimoGrupo = parseInt(tamanoMinimo); 
    const minimoCreditos = parseInt(minimoC); 
    const limiteCreditos = parseInt(limiteC); 

    const api = new Api(materiasPorCursar, tamanoGrupo, tamanoMinimoGrupo, minimoCreditos, limiteCreditos);
    api.generarTodasPosibilidades().then(combinaciones => {
      let exito=false;
      let posicion = 0;
      let imposible=false;
      for(let combinacion of combinaciones){
        if(posicion==combinaciones.length){
          imposible=true;
          break;
        }
        if(api.comprobarCombinacionHorario(combinaciones[posicion])){
          exito=true;
          break;
        }
        posicion++;
      }

      if(imposible){
        res.send('IMPOSIBLE');
      }else{
        res.json(horariosFinales);
      }

    }).catch(error => {
    	res.send(error);
    })
    
  }else{
    res.send('Error in data')
  }

});

module.exports = router;