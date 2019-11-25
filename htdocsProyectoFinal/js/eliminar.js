window.onload = init;
var headers = {};
var url= "http://localhost:3000"

function init (){
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
    loadempleado()
}

function loadempleado() {
axios.get(url+"/eliminar", headers).then(res => {
    console.log(res)
    displayempleado(res.data)
}).catch(err => {
    console.log(err)
})
}

function displayempleado(empleado) {
    var body = document.querySelector("body");
    for (var i = 0; i < empleado.length; i++) {
        body.innerHTML += `<h3>${empleado[i].empleado_nombre}</h3>`;
    }
}


