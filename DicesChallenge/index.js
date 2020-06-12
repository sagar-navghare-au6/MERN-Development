var randomNumber1 = Math.floor((Math.random() * 6) + 1);
console.log(randomNumber1);

var randomDiceImage = "images/dice"+ randomNumber1 +".png";
console.log(randomDiceImage);

var image1 = document.querySelectorAll('img')[0];
console.log(image1);
image1.setAttribute('src',randomDiceImage);


var randomNumber2 = Math.floor((Math.random() * 6) + 1);
console.log(randomNumber1);

var randomDiceImage1 = "images/dice"+ randomNumber2 +".png";
console.log(randomDiceImage1);

var image2 = document.querySelectorAll('img')[1];
console.log(image2);
image2.setAttribute('src',randomDiceImage1);


if(randomNumber1>randomNumber2){
    document.querySelector('h1').innerHTML ='🚩Play 1 Wins';
}
else if (randomNumber1<randomNumber2){
    document.querySelector('h1').innerHTML = '🚩Play 2 Wins';
}
else{
    document.querySelector('h1').innerHTML = 'o ohh Draw the match!';
}