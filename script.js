    function init() {
      gapi.client.init({
        apiKey: 'AIzaSyAZzWdUIN68Bf-hSa1yhLEkj2WOj692UZQ', // Use your API key here
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      }).then(function() {
        // Call your function to load data
        loadTouristPlaces();
      });
    }

    function loadTouristPlaces() {
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1jQhDCPsN1bb5WSz_SWBCtmLERjK3e-U-dLZfYdyw8Bw', // Use your spreadsheet ID here
        range: 'Sheet2!A2:C', // Adjust the sheet name and range as per your data
      }).then(function(response) {
        var values = response.result.values;
        if (values) {
          // Process the values and update the HTML
          var placesListDiv = document.getElementById('placesList');
          values.forEach(function(place) {
            placesListDiv.innerHTML += `
                            <div class="col-md-4 mb-4">
                                <div class="card">
                                    <img src="${place[2]}" class="card-img-top" alt="${place[0]}">
                                    <div class="card-body">
                                        <h5 class="card-title">${place[0]}</h5>
                                        <!-- Add more details if needed -->
                                    </div>
                                </div>
                            </div>
                        `;
          });
        } else {
          console.error('No data found.');
        }
      });
    }
    // Load the Google Sheets API
    gapi.load('client', init);
