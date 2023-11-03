// scriupts that go in the header need to have defer since they wont have access and wait to load until the page is loaded

console.log("Hello There");
alert("Water");

const tags = document.getElementsByTagName("img");
console.log(tags);

document.body.className = "bg-danger";

console.log(document.getElementsByClassName("is-invisible"));

console.log(document.querySelectorAll("div"));
console.log(document.querySelectorAll(".btn"));

const heroText = document.getElementsByClassName("hero-text")[0];
console.log(heroText);

const header = document.createElement("h3");
header.innerHTML = "Header Created By Dylan Heslop with JS";
header.className = "text-center fw-bold text-primary border border-primary";
console.log(header);
document.body.prepend(header);

heroText.append(header);
