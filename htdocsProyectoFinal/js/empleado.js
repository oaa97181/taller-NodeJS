window.onload = init;
var headers = {};
var url= "http://localhost:3000"

function init (){
    //document.querySelector('.btn-primary').addEventListener('click', loadEmpleado);
    let form1 = document.querySelector('#form1')
    form1.addEventListener('submit', loadEmpleado)
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

function loadEmpleado(event) {
    event.preventDefault()

    var nombre = document.getElementById("Nombre").value;
    var apellidos = document.getElementById("Apellidos").value;
    var tel = document.getElementById("Telefono").value;
    var mail = document.getElementById("Mail").value;
    var direccion = document.getElementById("Direccion").value;

   /* console.log({headers:headers.headers,data:{nombre:nombre,
            apellidos:apellidos,
            tel:tel,
            mail:mail,
            direccion:direccion}})*/

    axios({
        method: 'post',
        url: url+"/empleado",
        headers: headers.headers,
        data:{
            nombre:nombre,
            apellidos:apellidos,
            tel:tel,
            mail:mail,
            direccion:direccion
        }
    }).then(res => {
        //console.log(res)
             if(res.data.code==0){
                clearFields()
                alert("Registro exitoso")
                 
                //console.log(res.data)
            }else if (res.data.code==1){
                alert("ALGO SALIO MAL CON AGREGAR EMPLEADO")
            }
    }).catch(err => {
        console.log(err)
    })
    return false;
}

function clearFields(){
    document.getElementById("Nombre").value=""
     document.getElementById("Apellidos").value=""
     document.getElementById("Telefono").value=""
     document.getElementById("Mail").value=""
     document.getElementById("Direccion").value=""
}