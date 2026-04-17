document.addEventListener("DOMContentLoaded", function () {
new TypeIt("#greeting", { 
    lifeLike: false, 
	cursor: false,
    speed: 0 
})
	.type("w")
	.pause(300)
	.type("h")
	.pause(300)
	.type("o")
	.pause(300)
	.type("a")
	.pause(120)
	.type("m")
	.pause(120)
	.type("i")
	.pause(120)
	.type(" ")
	.pause(120)
	.type("?")
	.go();

});