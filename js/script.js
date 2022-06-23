
//---------------------------CURIOSIDADES-----------------------------------------

/*Solo me funciona una vez al cargar la pag,
y cuando abro el boton de curiosidades no se cierra luego...será por el async y await?*/ 

const contenedor = document.querySelector('#contenedorTarjetas');

const btnCuriosidades = document.querySelector('#curiosidades');


function crearHTML(array) {
    contenedor.innerHTML = '';
    array.forEach((info) => {
        const tarjeta = `
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Sabías que...?</h5>
                        <p class="card-text">${info.contenido}</p>
                    </div>
                </div>
            </div>`;
        contenedor.innerHTML += tarjeta;
    })
}

async function traerInfo(){
  const respuesta = await fetch ("https://fedeperin-harry-potter-api.herokuapp.com/info");
  const info = await respuesta.json();
  crearHTML(info);
}


btnCuriosidades.addEventListener('click',()=>{
  traerInfo();
})



//--------------------------------FORM INFO CASAS----------------------------------------------


const nombre = document.getElementById("autoSizingInput");
const cambios = document.querySelectorAll(".cambios");
const ocultar = document.querySelector("formCasas");
let check = document.getElementsByClassName("check");

function recuperarUsuario(storage) {
  let userInStorage = JSON.parse(storage.getItem("usuario"));
  return userInStorage;
}

function guardado(usuario) {
  if (usuario) {
    mostrarPregunta(cambios, "disNon");
  }
}

function mostrarPregunta(array, clase) {
  array.forEach((element) => {
    element.classList.toggle(clase);
  });
}

for (const checkbox of check) {
  checkbox.onclick = validarDatos;
}

//FUNCION PARA VALIDAR DATOS
function validarDatos(e) {
  btn = e.target;

  if (nombre.value == "") {
    alert("Debes ingresar tu nombre y elige una casa para enviar información");
  } else {
    casaSelect = btn.value; 

    let user = nombre.value; 
    let casa = casaSelect; 

    //MANDAR INFO AL LOCALSTORAGE
    const usuario = {
      user: user, //CREO OBJETO
      casa: casa,
    };

    localStorage.setItem("usuario", JSON.stringify(usuario)); 
  }
  swal
    .fire({
      title: "Hola, " + nombre.value,
      text:
        "Esperamos que puedas probar tus conocimientos y sumar puntos para " +
        `${casaSelect}`,
      confirmButtonText: "Comencemos!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        mostrarPregunta(cambios, "disNon");
      }
    });
}

//---------------------------PRIMER PREGUNTA----------------------------------------------------------------
let check1 = document.getElementsByClassName("check1");
let answer1 = document.getElementById("gridRadios1"); // CAMBIE EL LLAMADO POR EL ID, para tomar la informacion del checkbox correcta.
let answer2 = document.getElementsByClassName("answer2");
let answer3 = document.getElementsByClassName("answer3");

function recuperarQ1(storage) {
  let q1InStorage = JSON.parse(storage.getItem("question1"));
  return q1InStorage;
}

for (const checkbox1 of check1) {
  checkbox1.onclick = validarCheck1;
}

function validarCheck1(e) {
  btn = e.target;
  answerSelect = btn.value;

  let correcto = answer1.checked; // CREO UNA VARIABLE PARA VER SI LA OPCION CORRECTA ESTA SELECCIONADA
  if (correcto) {
    //SI ES TRUE,ES CORRECTA, SINO INCORRECTO
    swal
      .fire({
        title: "Correcto!",
        text: "10 puntos para " + casaSelect,
        confirmButtonText: "Siguente",
      })
      .then((result) => {
        if (result.isConfirmed) {
          mostrarPregunta2(cambios, "disNon2");
          let pregDos = document.getElementById("pregunta2"); 
          pregDos.style.display = "block";
        }
      });
    
  } else {
    swal.fire({
      title: "Incorrecto!",
      confirmButtonText: "Siguente",
    })
    .then((result)=>{
      if (result.isConfirmed) {
        mostrarPregunta2(cambios, "disNon2");
        let pregDos = document.getElementById("pregunta2"); 
        pregDos.style.display = "block";
      }
    });
  }


  const valorAq1 = {
    answer1: 10,
    answer2: 0,
    answer3: 0,
  };
  localStorage.setItem("valorAq1", JSON.stringify(valorAq1));
}



//---------------------------SEGUNDA PREGUNTA---------------------------------------------------------------

let check2 = document.getElementsByClassName("check2");
let answer4 = document.getElementsByClassName("answer4");
let answer5 = document.getElementById("gridRadios5");
let answer6 = document.getElementsByClassName("answer6");

function recuperarQ2(storage) {
  let q2InStorage = JSON.parse(storage.getItem("question2"));
  return q2InStorage;
}

function guardado2(question2) {
  if (question2) {
    mostrarPregunta2(cambios, "disNon2");
  }
}

function mostrarPregunta2(array, clase) {
  array.forEach((element) => {
    element.classList.toggle(clase);
  });
}

for (const checkbox2 of check2) {
  checkbox2.onclick = validarCheck2;
}


function validarCheck2(e) {
  btn = e.target;
  answerSelect = btn.value;

  let correcto = answer5.checked; // CREO UNA VARIABLE PARA VER SI LA OPCION CORRECTA ESTA SELECCIONADA
  if (correcto) {
    //SI ES TRUE,ES CORRECTA, SINO INCORRECTO
    swal
      .fire({
        title: "Correcto!",
        text: "10 puntos para " + casaSelect,
        confirmButtonText: "Siguente",
      })
      .then((result) => {
        if (result.isConfirmed) {
          mostrarPregunta3(cambios, "disNon3");
          let pregTres = document.getElementById("pregunta3"); 
          pregTres.style.display = "block";
          let pregDos = document.getElementById("pregunta2"); 
          pregDos.style.display = "none";
        }
      });

    
  } else {
    swal.fire({
      title: "Incorrecto!",
      confirmButtonText: "Siguente",
    })
    .then((result) => {
      if (result.isConfirmed) {
        mostrarPregunta3(cambios, "disNon3");
        let pregTres = document.getElementById("pregunta3"); 
        pregTres.style.display = "block";
        let pregDos = document.getElementById("pregunta2"); 
        pregDos.style.display = "none";
      }
    });
  }

  const valorAq2 = {
    answer4: 0,
    answer5: 10,
    answer6: 0,
  };
  localStorage.setItem("valorAq2", JSON.stringify(valorAq2));
}



//---------------------------TERCER PREGUNTA---------------------------------------------------------------
//No encuentro el error por el que no me registra la respuesta.

let check3 = document.getElementsByClassName("check3");
let answer7 = document.getElementById("gridRadios7");
let answer8 = document.getElementsByClassName("answer8");
let answer9 = document.getElementsByClassName("answer6");

function recuperarQ3(storage) {
  let q3InStorage = JSON.parse(storage.getItem("question3"));
  return q3InStorage;
}

function guardado3(question3) {
  if (question3) {
    mostrarPregunta3(cambios, "disNon3");
  }
}

function mostrarPregunta3(array, clase) {
  array.forEach((element) => {
    element.classList.toggle(clase);
  });
}

for (const checkbox3 of check3) {
  checkbox3.onclick = validarCheck3;
}

function validarCheck3(e) {
  btn = e.target;
  answerSelect = btn.value;

  let correcto = answer7.checked; // CREO UNA VARIABLE PARA VER SI LA OPCION CORRECTA ESTA SELECCIONADA
  if (correcto) {
    //SI ES TRUE,ES CORRECTA, SINO INCORRECTO
    swal
      .fire({
        title: "Correcto!",
        text: "10 puntos para " + casaSelect,
        confirmButtonText: "Siguente",
      })
      .then((result) => {
        if (result.isConfirmed) {
          mostrarPregunta4(cambios, "disNon4");
          let pregCuatro = document.getElementById("pregunta4"); 
          pregCuatro.style.display = "block";
          let pregTres = document.getElementById("pregunta3"); 
          pregTres.style.display = "none";
        }
      });

  } else {
    swal.fire({
      title: "Incorrecto!",
      confirmButtonText: "Siguente",
    })
    .then((result) => {
      if (result.isConfirmed) {
        mostrarPregunta4(cambios, "disNon4");
        let pregCuatro = document.getElementById("pregunta4"); 
        pregCuatro.style.display = "block";
        let pregTres = document.getElementById("pregunta3"); 
        pregTres.style.display = "none";
      }
    });
  }

  const valorAq3 = {
    answer7: 10,
    answer8: 0,
    answer9: 0,
  };
  localStorage.setItem("valorAq3", JSON.stringify(valorAq3));
}







