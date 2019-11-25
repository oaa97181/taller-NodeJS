window.onload = init;
var headers = {};
var url= "http://localhost:3000"

function init (){
    document.querySelector('.btn-primary').addEventListener('click', loadEmpleado);
    if(localStorage.getItem("token")){
        //aqui hariamos algo 
        headers={
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
    }else {
        window.location.href="index.html"
    }
}

function loadEmpleado() {
axios.get(url+"/empleado", headers).then(res => {


    insertEmpleado()
}).catch(err => {
    console.log(err)
})
}

function insertEmpleado() {
    var nombre = document.getElementById("Nombre").value;
    var apellidos = document.getElementById("Apellidos").value;
    var tel = document.getElementById("Telefono").value;
    var mail = document.getElementById("Mail").value;
    var direccion = document.getElementById("Direccion").value;

            axios({
          method: 'get',
          url: 'http://localhost:3000/empleado',
          data: {
            nombre:nombre,
            apellidos:apellidos,
            tel:tel,
            mail:mail,
            direccion:direccion
          }
        }).then(res => {
            if(res.data.code==0){
                alert("Registro exitoso")
                console.log(res.data)
            }else if (res.data.code==1){
                alert("ALGO SALIO MAL CON AGREGAR EMPLEADO")
            }
        }).catch(err=>{
            console.log(err)
        });
}
