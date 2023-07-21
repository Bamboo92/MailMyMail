var geocoder = L.Control.Geocoder.geoapify({
  apiKey: 'YOUR_GEOAPIFY_API_KEY' // replace with your actual API key
});

var input = document.getElementById('address-input');
var marker;

input.addEventListener('input', function() {
  geocoder.geocode(input.value, showResult, 5);
});

function showResult(err, data) {
  if (err) {
    console.error(err);
    return;
  }

  var coordinates = data[0].center; // coordinates of the first suggestion
  console.log(coordinates); // you can handle the coordinates as you want
}