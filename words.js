var Words = {};

Words.elements = [
	{
		word: 'la bola', 
		images: ['bola1.jpg', 'bola2.jpg', 'bola3.jpg', 'bola4.jpg', 'bola5.jpg']
	},
	{
		word: 'la manzana',
		images: ['manzana1.jpg', 'manzana2.jpg', 'manzana3.jpg', 'manzana4.jpg']
	},
	{
		word: 'el perro',
		images: ['perro1.jpg', 'perro2.jpg', 'perro3.jpg']
	}
];
Words.img_dir = 'images';

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
Words.random = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Words.imgs_path = 'images';

Words.show_imgs = function () {
	console.log("show images");
	var text = '';
	Words.current.images.forEach(
		function (img, index, array) {
			text = text.concat('<img src="', Words.imgs_path, '/', img, '" />\n');
		}, this
	);
	document.getElementById('images').innerHTML = text;
}

Words.show_int_next = function () {
	console.log("show 'next word' interface");
	document.getElementById("forward_button").onclick = Words.load_next;
	document.getElementById("forward_button").value = 'Następne';
	document.getElementById("forward_button").focus();
	document.getElementById("word_field").setAttribute("disabled", "true");
}

Words.check_answer = function () {
	console.log("check answer");
	Words.state = "checked";
	if (document.getElementById("word_field").value === Words.current.word) {
		document.getElementById("comment").textContent = "dobrze";
	} else {
		document.getElementById("comment").textContent = 'źle, poprawna odpowiedź: "' + Words.current.word + '"';
	}
	Words.show_int_next();
}

Words.load_next = function () {
	console.log("load next word");
	
	Words.state = "question";
	Words.current = Words.elements[Words.random(0, Words.elements.length - 1)];
	console.log(Words.current.word);
	
	document.getElementById("word_field").value = '';
	document.getElementById("word_field").removeAttribute("disabled")
	document.getElementById("word_field").focus();
	document.getElementById("forward_button").onclick = Words.check_answer;
	document.getElementById("forward_button").value = 'Sprawdź';
	document.getElementById("comment").textContent = "";
	
	Words.show_imgs();
}

Words.state = "question";
Words.init = function () {
	Words.load_next();
	
	document.getElementById("word_field").onkeypress = function (target) {
		console.log("event word_field");
		if (target.key === "Enter") {
			if (Words.state === "question") {
				Words.check_answer();
			}
		}
	};
}

Words.start = function () {	
	// alternative to load event
	$('document').ready(Words.init);
}();

