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
};

// runs when button is pressed, maybe remove and replace with live view?
function generalUpdate(){
  //console.log("fuck");
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
    var creditFilteredCards = [];
    for (var i = 0; i < this.selectedCreditCards.length; i++){
      if (this.selectedCreditCards[i].recommended_credit_scores[0].min < getCreditScore()){
        creditFilteredCards.push(selectedCreditCards[i]);
      }
    }
    this.selectedCreditCards = creditFilteredCards;
    tagUpdate();
};

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
  this.selectedCreditCards = tagFilteredCards;
  console.log(selectedCreditCards.length)
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

function sendToAPI(){

  fetch('https://techcase-cards-api.herokuapp.com/api/v1/cards/'+82457245+'/apply', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({
           "creditScore": getCreditScore().toString()
         }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
}
