window.onload = init;
var headers = {};
var url= "http://localhost:3000"

function init (){
    //document.querySelector('.btn-primary').addEventListener('click', deleteEmpleado);
    let form1 = document.querySelector('#form1')
    form1.addEventListener('submit', deleteEmpleado)
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

function deleteEmpleado(event) {
    event.preventDefault()

    var nombre = document.getElementById("Nombre").value;

   /* console.log({headers:headers.headers,data:{nombre:nombre,
            apellidos:apellidos,
            tel:tel,
            mail:mail,
            direccion:direccion}})*/

    axios({
        method: 'post',
        url: url+"/eliminar",
        headers: headers.headers,
        data:{
            nombre:nombre

        }
    }).then(res => {
        //console.log(res)
             if(res.data.code==0){
                clearFields()
                alert("DELETE exitoso")
                //console.log(res.data)
            }else if (res.data.code==1){
                alert("ALGO SALIO MAL CON DELETE EMPLEADO")
            }
    }).catch(err => {
        console.log(err)
    })
    return false;
}


function clearFields(){
    document.getElementById("Nombre").value=""
}