window.onload = init;

function init (){
    if(localStorage.getItem("token")){

    }else {
        window.location.href="index.html"
    }
    loadPokemon()
}

function loadPokemon() {
axios.get("http://localhost:3000/pokemon").then(res => {
    console.log(res)
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