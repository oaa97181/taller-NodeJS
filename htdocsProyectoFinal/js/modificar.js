window.onload = init;
var headers = {};
var url= "http://localhost:3000"

function init (){
    //document.querySelector('.btn-primary').addEventListener('click', buscarEmpleado);
    let form1 = document.querySelector('#form1')
    form1.addEventListener('submit', buscarEmpleado)
    let form2 = document.querySelector('#form2')
    form2.addEventListener('submit', modificarEmpleado)
    if(localStorage.getItem("token")){
        console.log("tenemos el token")
        headers={
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
    }else {
        window.location.href="index.html"
    }
}

function buscarEmpleado(event) {
    event.preventDefault()

    var nombre = document.getElementById("Nombre").value;
    var apellidos = document.getElementById("Apellidos").value;

    axios({
        method: 'post',
        url: url+"/buscar",
        headers: headers.headers,
        data:{
            nombre:nombre,
            apellidos:apellidos
        }
    }).then(res => {
        clearFields(res.data)
             if(res.data.code==0){
            }else if (res.data.code==1){
                alert("ALGO SALIO MAL CON BUSQUEDA EMPLEADO")
            }
    }).catch(err => {
        console.log(err)
    })
    return false;
}

function clearFields(empleado){
    var body = document.querySelector("body");
    for (var i = 0; i < empleado.length; i++) {
        body.innerHTML += " <h3> RESULTADOS DE LA BUSQUEDA </h3>";
        body.innerHTML += "NOMBRE: " + `${empleado[i].empleado_nombre}` + "<br>";
        body.innerHTML += "APELLIDO: " +`${empleado[i].empleado_apellidos}` + "<br>";
        body.innerHTML += "DIRECCION: " +`${empleado[i].empleado_direccion}` + "<br>";
        body.innerHTML += "MAIL: " +`${empleado[i].empleado_mail}` + "<br>";
        body.innerHTML += "TELEFONO: " +`${empleado[i].empleado_tel}` + "<br>";
    }
    document.getElementById("Nombre").value=""
     document.getElementById("Apellidos").value=""

}




function modificarEmpleado(event) {
    event.preventDefault()

    var nombre = document.getElementById("Nombre2").value;
    var apellidos = document.getElementById("Apellidos2").value;
    var tel = document.getElementById("Telefono").value;
    var mail = document.getElementById("Mail").value;
    var direccion = document.getElementById("Direccion").value;

    axios({
        method: 'post',
        url: url+"/modificar",
        headers: headers.headers,
        data:{
            nombre:nombre,
            apellidos:apellidos,
            tel:tel,
            mail:mail,
            direccion:direccion
        }
    }).then(res => {
        clearFields(res.data)
        alert("UPDATE exitoso!")
             if(res.data.code==0){
            }else if (res.data.code==1){
                alert("ALGO SALIO MAL CON BUSQUEDA EMPLEADO")
            }
    }).catch(err => {
        console.log(err)
    })
    return false;
}