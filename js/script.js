console.log($)

var apiKey = '9e606f2776ec4ff09ffc5daf55cc385b'

var baseUrl  = 'https://congress.api.sunlightfoundation.com//legislators/locate?'

var numberOfZip = 77074
var numberZip = 'zip=' + parseInt(numberOfZip)
var zip = numberZip+'&apikey='

var fullUrl = baseUrl + apiKey
var zipUrl =  baseUrl + zip + apiKey 

var promise = $.getJSON(zipUrl)
// console.log(promise)


var handleData = function(jsonData) {
	var resultsArray = jsonData.results
	var htmlString = ''
	for (var i = 0; i < resultsArray.length ; i++) {
		// console.log([resultsArray[i]])
	var personObject = resultsArray[i]
	htmlString += personToHTML(personObject)
	// console.log(htmlString)
	}

	var containerEl = document.querySelector('#container')
	containerEl.innerHTML = htmlString

}

var personToHTML = function( personObject ){
	var priceNum = Math.round((Math.random()*9008000)+2000)
	var priceStr = priceNum.toString()

	console.log(priceStr)
	var newPersonStringinHTML = '<div class ="mobster"><div class="fullName"><h1>Politican For Hire:</h1>' + '<h2>' +personObject.first_name + '    '+personObject.last_name + '</h2></div>'
		newPersonStringinHTML += '<li class="email"><h3>email:</h3>' + personObject.oc_email + '</li>'
		newPersonStringinHTML += '<li class="party_state" ><h3>(party)state:</h3>' + '(' + personObject.party + ') ' + personObject.state + '</li>'
		newPersonStringinHTML += '<li class="office" ><h3>office:</h3>' + personObject.office + '</li></ul>'
		newPersonStringinHTML += '<div class="website" ><h3>website:</h3>' + personObject.website + '</div>'
		newPersonStringinHTML += '<div class="price" ><h3>Cost Per Bill:</h3> <p>' + '$'+priceNum + '</p></div></div>'
	return newPersonStringinHTML
}


var inputEl = document.querySelector('input.zipFinder')
// console.log(inputEl)

var addItem = function(keyEvent) {
  var targetEl = keyEvent.target
  // console.log(targetEl)

  if (keyEvent.keyCode === 13) {
      numberOfZip = inputEl.value
      zipper = parseInt(numberOfZip) + '&apikey='
	  pathName = baseUrl + 'zip=' +zipper + apiKey
	  var promise = $.getJSON(pathName)
	  console.log(promise)
	  promise.then(handleData)
	  // function that refreshes the page with the pat

  }
}

inputEl.addEventListener('keydown',addItem)



promise.then(handleData)