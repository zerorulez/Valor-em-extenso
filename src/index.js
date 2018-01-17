'use strict'

// The program starts here
function iniciaVerificacao() {

	// Take the value of the text input in lower case
	var valor = document.getElementById('porExtenso').value.toLowerCase();

	// Remove special characters
	var valor = removerAcento(valor);

	// Remove the 'e' characters from the string
	var valor = valor.replace(/ e/g,"");

	defineValor(valor);
}

function removerAcento(palavra) {
	var palavraSemAcento = "";
	var caracterComAcento = "áàãâäéèêëíìîïóòõôöúùûüç";
	var caracterSemAcento = "aaaaaeeeeiiiiooooouuuuc";

	for (var i = 0; i < palavra.length; i++)
	{
		var char = palavra.substr(i, 1);
		var indexAcento = caracterComAcento.indexOf(char);
		if (indexAcento != -1) {
			palavraSemAcento += caracterSemAcento.substr(indexAcento, 1);
		} else {
			palavraSemAcento += char;
		}
	}
	return palavraSemAcento;
} 

function unidade(palavra) {
	var unidadePorExtenso = {
		"zero":   0,
		"um":     1,
		"dois":   2,
		"tres":   3,
		"quatro": 4,
		"cinco":  5,
		"seis":   6,
		"sete":   7,
		"oito":   8,
		"nove":   9
	};
	

	var unidades = unidadePorExtenso[palavra];

	if  (unidades != undefined) {
		return unidades;
	}

}

function dezena(palavra) {

	var dezenaPorExtenso = {
		"dez": 10,
		"onze": 11,
		"doze": 12,
		"treze": 13,
		"quatorze": 14,
		"quinze": 15,
		"dezesseis": 16,
		"dezessete": 17,
		"dezoito": 18,
		"dezenove": 19,
		"vinte": 20,
		"trinta": 30,
		"quarenta": 40,
		"cinquenta": 50,
		"sessenta": 60,
		"setenta": 70,
		"oitenta": 80,
		"noventa": 90
	};

	var dezenas = dezenaPorExtenso[palavra];

	if  (dezenas == undefined) {
		return unidade(palavra);
	} else {
		return dezenas;
	}
}

function centena(palavra) {

	var centenaPorExtenso = {
		"cem":          100,
		"cento":        100,
		"duzentos":     200,
		"trezentos":    300,
		"quatrocentos": 400,
		"quinhentos":   500,
		"seiscentos":   600,
		"setecentos":   700,
		"oitocentos":   800,
		"novecentos":   900
	};

	var centenas = centenaPorExtenso[palavra];

	if  (centenas == undefined) {
		return dezena(palavra);
	} else {
		return centenas;
	}
}

function defineValor(valor) {

	var palavras = valor.split(" ");
	var numerico = 0.0;
	var total = 0.0;
	var i = 0;
	var y = 0;

	for (i; i < palavras.length; i++) {

		var palavra = palavras[i];

		switch(palavra) {
			case 'milhao':
			numerico = 0;
			for (y; y < i; y++) {

				numerico += centena(palavras[y]);

			}

			total += numerico * 1000000;
			y = i + 1;

			break;

			case 'milhoes':
			numerico = 0;
			for (y; y < i; y++) {
				numerico += centena(palavras[y]);
			}

			total += numerico * 1000000;
			y = i + 1;

			break;

			case 'mil':

			if ( i == 0 ) {
				total = 1000;
				break;

			} else {
				numerico = 0;
				for (y; y < i; y++) {

					numerico += centena(palavras[y]);

				}

				total += numerico * 1000;
				y = i + 1;
				break;

			}

			case 'reais':
			numerico = 0;
			for (y; y < i; y++) {

				var verifica = centena(palavras[y]);
				if (!(isNaN(verifica))) {
					numerico += verifica;
				}
			}

			total += numerico;
			y = i + 1;
			break;

			case 'centavos':

			numerico = 0;
			for (y; y < i; y++) {

				var verifica = centena(palavras[y]);
				if (!(isNaN(verifica))) {
					numerico += ((verifica % 100) * 0.01);
				}
			}
			total += numerico;
			break;

			default:
			break;
		}

	}

	alert('R$ ' + total.toFixed(2));
}