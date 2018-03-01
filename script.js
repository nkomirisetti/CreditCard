// api URL
const urlGET = 'https://techcase-cards-api.herokuapp.com/api/v1/cards';
// creditCards represents the json object from the API that has
var creditCards = [];
// each of these represent the total number of merchants and cardTags from the api
var merchants = [];
var cardTags = [];
// represents the creditcards that fit the criteria from the search
var selectedCreditCards = [];


// gets data from URL and checks integrity
fetch(urlGET).then(function(response) {
  if(response.ok) {
    // pulls json object from response and assigns it to
    response.json().then(function(json) {
      this.creditCards = json;
      setup();
    });

  } else {
    // fail case if response is not ok
    console.log('API PULL failed')
  }
});


function setup(){
    // main region where we will populate the Cards
    var main = document.querySelector('main');



    // add options based on options from API
    var merchantSelect = document.getElementById("selectMerchant");
    for (var i = 0; i < this.creditCards.length; i++){
      // prevents adding duplicates to radio group
      if (this.merchants.includes(creditCards[i].merchant) == false) {
        this.merchants.push(this.creditCards[i].merchant);
      }
    }
    // pushes merchants list to html
    for (var i = 0; i < merchants.length; i++){
      var element = document.createElement("option");
      element.textContent = merchants[i];
      element.value = merchants[i];
      merchantSelect.appendChild(element);
    }

    // pulls features similiar to code above from cards array
    var featureSelect = document.getElementById("chooseTags");
    for (var i = 0; i < this.creditCards.length; i++){
      for (var j = 0; j < this.creditCards[i].tags.length; j++){
        if (this.cardTags.includes(this.creditCards[i].tags[j]) == false){
          this.cardTags.push(this.creditCards[i].tags[j]);
        }
      }
    }

  // runs through each tag and sets visiblity to false if
  // not found in merchants list
  if(cardTags.includes("travel") == false){
    document.getElementById("travel").style.visibility = "hidden";
  }
  if(cardTags.includes("no_annual_fee") == false){
    document.getElementById("no_annual_fee").style.visibility = "hidden";
  }
  if(cardTags.includes("zero_intro_apr") == false){
    document.getElementById("zero_intro_apr").style.visibility = "hidden";
  }
  if(cardTags.includes("cashback") == false){
    document.getElementById("cashback").style.visibility = "hidden";
  }



  this.selectedCreditCards = this.creditCards;
  populateCardList();
};

// runs when button is pressed, maybe remove and replace with live view?
function generalUpdate(){
  this.selectedCreditCards = [];
  var selectedMerchant = document.querySelector('#selectMerchant');
  if (selectedMerchant.value === "all merchants"){
    this.selectedCreditCards = this.creditCards;
    creditScoreUpdate();
  } else {
  for (var i=0; i<this.creditCards.length; i++){
    if (selectedMerchant.value == this.creditCards[i].merchant){
        this.selectedCreditCards.push(this.creditCards[i]);
        creditScoreUpdate();
      }
    }
  }
}

function creditScoreUpdate(){
    // creates new empty array that we will push matches to
    var creditFilteredCards = [];
    // loops through and pushes matches only
    for (var i = 0; i < this.selectedCreditCards.length; i++){
      if (this.selectedCreditCards[i].recommended_credit_scores[0].min < getCreditScore()){
        creditFilteredCards.push(selectedCreditCards[i]);
      }
    }
    // sets filtered array to new selected cards array
    this.selectedCreditCards = creditFilteredCards;
    tagUpdate();
};

// filters based on tags checked
function tagUpdate(){
  var tagFilteredCards = [];
  var selectedTags = getSelectedTags();
  for (var i = 0; i < this.selectedCreditCards.length; i++){
    var match = true;
    for (var j = 0; j < selectedTags.length; j++){
      if (this.selectedCreditCards[i].tags.includes(selectedTags[j]) == false){
        match = false;
      }
    }
    if (match == true){
      tagFilteredCards.push(this.selectedCreditCards[i]);
    }
  }
  clearCardList();
  this.selectedCreditCards = tagFilteredCards;
  populateCardList();
}


// returns credit score from slider
function getCreditScore(){
  return slideCreditScore.value;
};

// returns which tags are selected by the user
function getSelectedTags(){
  var selectedTags = [];
  if (document.getElementById("travel").checked==true){
    selectedTags.push("travel");
  }
  if (document.getElementById("no_annual_fee").checked==true){
    selectedTags.push("no_annual_fee");
  }
  if (document.getElementById("zero_intro_apr").checked==true){
      selectedTags.push("zero_intro_apr");
  }
  if (document.getElementById("cashback").checked==true){
      selectedTags.push("cashback");
  }
  return selectedTags;
}
// sends data to api
function sendToAPI(creditCardNumber,creditScore){
  fetch('https://techcase-cards-api.herokuapp.com/api/v1/cards/'+creditCardNumber+'/apply', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({
           "creditScore": creditScore.toString()
         }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
}

function populateCardList(){

      var ul = document.createElement('ul');
      ul.id = "cardList";
      var container = document.getElementById('cardListContainer').appendChild(ul);
      if (selectedCreditCards.length == 0){
        var noMatchesFoundText = document.createElement('li');
        noMatchesFoundText.id = "noMatchesFoundText";
        noMatchesFoundText.innerHTML += "No Matches Found, try broadening your filter";
        ul.appendChild(noMatchesFoundText);
      }
      this.selectedCreditCards.forEach(function(card){
      var li = document.createElement('li');
      li.id = 'li';

      var cardContainer = document.createElement('div');
      cardContainer.id = "cardContainer";

      var cardImageContainer = document.createElement('div');
      cardImageContainer.id = "cardImageContainer";

      var cardInfoContainer = document.createElement('div');
      cardInfoContainer.id = "cardInfoContainer";

      //Add image
      var cardImage = document.createElement('img');
      cardImage.id = "cardImage";
      cardImage.setAttribute('src', card.image);
      cardImage.onclick=ga('send','event',
        'Cards',
        'imageClick',
        card.name
      );

      //Add info
      var cardInfoList = document.createElement('ul');
      cardInfoList.id = "cardInfoList";

      var merchant = document.createElement('li');
      merchant.id = "infoListElement";
      var cardName = document.createElement('li');
      cardName.id = "infoListElement";
      var tags = document.createElement('li');
      tags.id = "infoListElement";
      var buttonHolder = document.createElement('li');
      buttonHolder.id = "infoListElement";
      var detailsButton = document.createElement('button');
      detailsButton.id = card.id;
      detailsButton.onclick = function(){
          eventDetailsClick(card.name);
          var modalWindow = document.getElementById('modalWindow');
          document.getElementById("modalImage").src = card.image;
          document.getElementById("modalCreditRange").textContent = "Credit Score Range: "
          + card.recommended_credit_scores[0].min
          + " to " + card.recommended_credit_scores[card.recommended_credit_scores.length-1].max;
          document.getElementById("modalMerchant").textContent = "Merchant: "
          + card.merchant;
          if (card.intro_apr.does_not_apply == false){
            document.getElementById("modalIntro").textContent = "Intro APR: "
            + card.intro_apr.rate + "% for " +card.intro_apr.months + " months";
          }
          if (card.regular_apr.variable == true){
            document.getElementById("modalNormal").textContent =
            "Normal APR: Variable rate at " + card.regular_apr.rate + "%";
          } else{
            document.getElementById("modalNormal").textContent =
            "Normal APR: Non-variable rate at " + card.regular_apr.rate + "%";
          }

          if (card.rates_and_fees.length == 1){
              if(card.rates_and_fees[0].fee == 0){
                document.getElementById("modalRates").textContent = "Rates and Fees: No annual fee";
              } else if (card.rates_and_fees[0].caveat == ""){
                document.getElementById("modalRates").textContent = "Rates and Fees: Annual fee of "
                + card.rates_and_fees[0].fee + ".";
              } else {
                document.getElementById("modalRates").textContent = "Rates and Fees: Annual fee of "
                + card.rates_and_fees[0].fee + " and " + card.rates_and_fees[0].caveat;
              }
          } else {
            if(card.rates_and_fees[0].fee == 0){
              document.getElementById("modalRates").textContent = "Rates and Fees: No annual fee. ";
            } else if (card.rates_and_fees[0].caveat == ""){
              document.getElementById("modalRates").textContent = "Rates and Fees: Annual fee of "
              + card.rates_and_fees[0].fee + ". ";
            } else {
              document.getElementById("modalRates").textContent = "Rates and Fees: Annual fee of "
              + card.rates_and_fees[0].fee + " and " + card.rates_and_fees[0].caveat +". ";
            }

            document.getElementById("modalRates").textContent += card.rates_and_fees[1].name + " at rate of " +
            card.rates_and_fees[1].rate + " for duration of " + card.rates_and_fees[1].duration_months + " months.";

          };
        };
<<<<<<< HEAD
=======
        document.getElementById("modalApplyButton").onclick = function(){
          var enteredScore = prompt("Please enter your credit score");
          if (enteredScore.isInteger() == true && enteredScore < 851 && enteredScore > 299){
            ga('send','event',
              'Cards',
              'applyClickPass',
              card.name,
              enteredScore
            );
          }
          else {
              alert(enteredScore + " is not a valid credit score, please enter a non-decimal number between 300 and 850");
              ga('send','event',
                'Cards',
                'applyClickFail',
                card.name,
                enteredScore
              );
          }

        };
>>>>>>> 5fe72e4fb598c4647628a54c694d379d3120214f




          modalWindow.style.display = "block";

        //


      //detailsButton.onclick = "displayCardDetails()";
      buttonHolder.appendChild(detailsButton);
      cardInfoList.appendChild(merchant);
      cardInfoList.appendChild(cardName);
      cardInfoList.appendChild(tags);
      cardInfoList.appendChild(buttonHolder);
      merchant.innerHTML += "Merchant: ".bold() + card.merchant;
      cardName.innerHTML += "Name: ".bold() + card.name;

      var formattedString = [];
      for (var i = 0; i < card.tags.length; i++){
        formattedString[i] = card.tags[i].toString().charAt(0).toUpperCase() + card.tags[i].slice(1);
        formattedString[i] = formattedString[i].replace(/_/g," ");
        formattedString[i] = " " + formattedString[i];
      }

      if (formattedString.length == 1){
        tags.innerHTML += "Tag: ".bold() + formattedString;
      }
      else {
        tags.innerHTML += "Tags: ".bold() + formattedString;
      }
      detailsButton.innerHTML = "Details".bold();



      //Append Children
      cardInfoContainer.appendChild(cardInfoList);
      cardImageContainer.appendChild(cardImage);
      cardContainer.appendChild(cardInfoContainer);
      cardContainer.appendChild(cardImageContainer);
      li.appendChild(cardContainer);
      ul.appendChild(li);


})};


function clearCardList(){
    var parent = document.getElementById("cardListContainer");
    var child = document.getElementById("cardList");
    parent.removeChild(child);
}


function detailsButtonClick() {
    var modalWindow = document.getElementById('modalWindow');
    modalWindow.style.display = "block";
}

window.onload = function() {
  var modalCloseX = document.getElementById('modalCloseX');
  var modalWindow = document.getElementById('modalWindow');
  modalCloseX.onclick = function (){

    modalWindow.style.display = "none";
  };
}



function updateCreditScore(){
  document.getElementById("creditScoreLabel").textContent= document.getElementById("slideCreditScore").value.toString();
}

function getCurrentMerchant(){
  return document.getElementById("selectMerchant").value;
}

function eventDetailsClick(cardname){
console.log(cardname+" event details run");
  ga('send','event',
    'Cards',
    'buttonClick',
    cardname
  );
}
