fetch("https://api.noroff.dev/api/v1/rainy-days")
.then(res => {
    return res.json()
})
.then(data => {
    const allProducts = data; // Array av jakker
    const firstJacket = allProducts[0];
    const thirdJacket = allProducts[2];
    console.log(firstJacket.title +" "+ firstJacket.id)
const title = document.createElement("h3")
title.innerText = thirdJacket.title
const section = document.querySelector("#jacket-title")
console.log (section)
section.append(title)
})