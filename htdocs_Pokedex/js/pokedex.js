window.onload = loadPokemon;

function loadPokemon() {
	var pokemonRequest = new XMLHttpRequest()
	pokemonRequest.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200){
			//console.log(this.responseText)
			//console.log(JSON.parse(this.responseText))
			var pokemon=JSON.parse(this.responseText)
			displayPokemon(pokemon)
		}
	}
	pokemonRequest.open("GET", "http://localhost:3000/pokemon")
	pokemonRequest.send()
}

function displayPokemon(pokemon){
	var body =document.querySelector("body")
	for (var i = 0; i < pokemon.length; i++) {
		body.innerHTML+= `<h3>${pokemon[i].pok_name}</h3>`
	}
}