function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  const autocomplete1 = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete-input-1'),
    { types: ['geocode'] }
  );

  const autocomplete2 = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete-input-2'),
    { types: ['geocode'] }
  );

  document.getElementById('autocomplete-input-1').placeholder = '';
  document.getElementById('autocomplete-input-2').placeholder = '';
  
  // Avoid paying for unnecessary data by restricting the set of place fields
  // that are returned to just the address components and formatted address.
  autocomplete1.setFields(['address_component', 'formatted_address']);
  autocomplete2.setFields(['address_component', 'formatted_address']);
}

// Add a DOMContentLoaded event listener to the document, and call 
// initAutocomplete when it's ready.
document.addEventListener("DOMContentLoaded", function() {
  initAutocomplete();
});

// Funktion zum Entfernen und Hinzufügen des Schattens beim Hovern und beim Fokus
function setupShadowEffect() {
  const items = document.querySelectorAll('.pac-item');

  items.forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      this.parentElement.style.boxShadow = 'none';
    });

    item.addEventListener('mouseleave', function() {
      this.parentElement.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
    });

    // Erstelle einen MutationObserver, der Änderungen der class-Eigenschaft überwacht
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if(mutation.attributeName === 'class') {
          // Prüfe, ob das Element die Klasse 'pac-item-selected' hat
          if(item.classList.contains('pac-item-selected')) {
            item.parentElement.style.boxShadow = 'none';
          }/* else {
            item.parentElement.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
          }*/
        }
      });
    });

    // Starte die Überwachung der class-Eigenschaft
    observer.observe(item, { attributes: true });
  });
}

// Set up the MutationObserver
const observer = new MutationObserver(function() {
  setupShadowEffect();
});

// Tell the observer to look for new .pac-item elements being added to the DOM
observer.observe(document.body, { childList: true, subtree: true });

// Run the setupShadowEffect function initially to catch any .pac-item elements that already exist
setupShadowEffect();
