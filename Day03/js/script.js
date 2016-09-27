/*

var fName = "Tyler";
var mName = "Miguel";
var lName = "Lujan";

var firstMiddleLast = new String("Tyler Miguel Lujan");

var yearsNotDead = 23;
var whatIsPie = 3.14;

var a = 0.1;
var b = 0.2;
var c = a * b;

//console.log(c);

var myBool = true;

var myArr = [3, "Tyler", true, 3.14, ["red,", "green", "blue"]];

var person = {
  name: "Tyler",
  age: 23,
  hairColor: "brown"
};

//alert(myArr[2]);

var userName = prompt("What is your name?");
person.name = userName;
console.log(person);

var userAge = prompt("what is your age");
person.age = parseInt (userAge);
console.log(person);

var ans = confirm("Is the sky blue");
alert(ans);
*/

/*
var locale = 'en-us'
var theDate = new Date();
var myBday = new Date("11-15-92");

var theYear = theDate.getFullYear();
var theCalDate = theDate.getDate();
var theWeekDay = theDate.getDay();
var theMon = theDate.getMonth();

var longWeekday = theDate.toLocaleString('us-en', {weekday: 'long'});
var longMonth = theDate.toLocaleString('us-en', {month: 'long'});

console.log(theYear);
console.log(theCalDate);
console.log(theWeekDay);
console.log(longWeekday);
console.log(theMon);
console.log()longMonth;
console.log(longWeekday + "" + longMonth + " " + theCalDate + "" + theYear)
*/


/*console.log(randNum);

var roundNum = Math.round(4.5999);
//console.log(roundNum);

var floorNum = Math.floor(4.5);
console.log(Math.floor(randNum * 11));

var ceilNum = Math.ceil(4.1111);
console.log(ceilNum);

console.log(Math.min(-10, -20));

var power = Math.pow(2, 3);
console.log(power);
*/

var userNum = prompt("pick a number");
console.log(userNum);

var num = parseInt(userNum);
console.log(num);

var randNum = Math.round(Math.random() * num) ;
console.log(randNum);
