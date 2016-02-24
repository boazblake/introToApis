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
	// console.log(personObject.first_name)
	var newPersonStringinHTML = '<div class ="mobster"><div class="fullName"><h3>Name:</h3>' + personObject.first_name + '    '+personObject.last_name + '</div>'
		newPersonStringinHTML += '<ul>'
		newPersonStringinHTML += '<li class="email"><h3>email:</h3>' + personObject.oc_email + '</li>'
		newPersonStringinHTML += '<li class="party_state" ><h3>(party)state:</h3>' + '(' + personObject.party + ') ' + personObject.state + '</li>'
		newPersonStringinHTML += '<li class="office" ><h3>office:</h3>' + personObject.office + '</li></ul>'
		newPersonStringinHTML += '<div class="website" ><h3>website:</h3>' + personObject.website + '</div></div>'
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