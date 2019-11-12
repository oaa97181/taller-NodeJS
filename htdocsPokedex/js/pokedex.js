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
    loadPokemon()
}

function loadPokemon() {
axios.get(url+"/pokemon", headers).then(res => {
    console.log(res)
    displayPokemon(res.data)
}).catch(err => {
    console.log(err)
})
}

function displayPokemon(pokemon) {
    var body = document.querySelector("body");
    for (var i = 0; i < pokemon.length; i++) {
        body.innerHTML += `<h3>${pokemon[i].pok_name}</h3>`;
    }
}