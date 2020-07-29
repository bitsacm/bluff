// init
var suits = ["spades", "diamonds", "clubs", "hearts"]; //An Array of card suites
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]; //This will hold all possible values of cards except the jokers

function createDeck() {   //It will return a new deck of cards to the caller

	var deck = new Array();

	for(var i = 0; i < suits.length; i++) {

		for(var j = 0; j < values.length; j++) {

			var card = {Value: values[j], Suit: suits[i]}; //Pairing each value of suit to each possible value of cards
			deck.push(card); //adding each created card to our deck 

		}
	}

	//Adding jokers to the deck
	var joker1 = {};         
	joker1.Value = "Joker";
	joker1.Suit = "Joker";
	var joker2 = {};
	joker2.Value = "Joker";
	joker2.Suit = "Joker";
	deck.push(joker1);
	deck.push(joker2);
	
	return deck; //Returning the deck
}

function renderDeck(deck) {  //Rendering the deck of cards on the screen

	for(var i = 0; i < deck.length; i++) {           //Iterating over all cards in the deck
		var card = document.createElement("div");	 //Creating a div for every card to attach it with an element with id "root" 
		var value = document.createElement("div");	 //A div to hold the value of a card
		var suit = document.createElement("div");	 //A div to hold the suit of a card
		card.className = "card";					 //Adding classes for help in css
		value.className = "value";
		suit.className = "suit " + deck[i].Suit;

		value.innerHTML = deck[i].Value;   //Setting the value of the card
		card.appendChild(value);		   //Adding value to the card
		card.appendChild(suit);			   //Adding suit to the card

		document.getElementById("root").appendChild(card); //Appending all cards of the deck as a child to the element with id "root" one at a time
	}
}

window.addEventListener('DOMContentLoaded',function(){  //Executing after the page is loaded

deck1 = createDeck();  //Creating a new deck of cards
renderDeck(deck1);	   //Rendering the newly created deck of cards

});