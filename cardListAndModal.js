var names = ['card1','card2','card3','card4', 'card5'];
var ul = document.createElement('ul');
ul.id = "cardList";
var container = document.getElementById('cardListContainer').appendChild(ul);

names.forEach(function(name){
	var li = document.createElement('li');
	li.id = 'cardListElement'

	var cardContainer = document.createElement('div');
	cardContainer.id = "cardContainer";

	var cardImageContainer = document.createElement('div');
	cardImageContainer.id = "cardImageContainer";

	var cardInfoContainer = document.createElement('div');
	cardInfoContainer.id = "cardInfoContainer";

	//Add image
	var cardImage = document.createElement('img');
	cardImage.id = "cardImage";
	cardImage.setAttribute('src', 'https://www.bankofamerica.com/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved_PCM/8blm_trvsigcm_v_250x158.png');

	//Add info
	var cardInfoList = document.createElement('ul');
	cardInfoList.id = "cardInfoList";

	var merchant = document.createElement('li');
	merchant.id = "infoListElement";
	var cardName = document.createElement('li');
	cardName.id = "infoListElement";
	var tags = document.createElement('li');
	tags.id = "infoListElement";
	var features = document.createElement('li');
	features.id = "infoListElement";
	var buttonHolder = document.createElement('li');
	buttonHolder.id = "infoListElement";
	var detailsButton = document.createElement('button');
	detailsButton.id = "cardDetailsButton"

	detailsButton.onclick = "displayCardDetails()";
	buttonHolder.appendChild(detailsButton);
	cardInfoList.appendChild(merchant);
	cardInfoList.appendChild(cardName);
	cardInfoList.appendChild(tags);
	cardInfoList.appendChild(features);
	cardInfoList.appendChild(buttonHolder);
	merchant.innerHTML += "Merchant: " + name;
	cardName.innerHTML += "Name: " + name;
	tags.innerHTML += "Tags: " + name;
	features.innerHTML += "Features: " + name;
	detailsButton.innerHTML = "Details";



	//Append Children
	cardInfoContainer.appendChild(cardInfoList);
	cardImageContainer.appendChild(cardImage);
	cardContainer.appendChild(cardInfoContainer);
	cardContainer.appendChild(cardImageContainer);
	li.appendChild(cardContainer);
	ul.appendChild(li);

	detailsButton.onclick = function(){
		var modalWindow = document.getElementById('modalWindow');
		modalWindow.style.display = "block";
	}
});
