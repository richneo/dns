document.getElementById("lookupBtn").addEventListener("click", function() {
    const domain = document.getElementById("domain").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (domain) {
        // Fetch DNS information from an external API
        fetch(`https://dns-api.org/api/v1/dns/${domain}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Display results
                data.forEach(record => {
                    const resultItem = document.createElement("div");
                    resultItem.innerHTML = `<strong>${record.type}</strong>: ${record.value}`;
                    resultsDiv.appendChild(resultItem);
                });
            })
            .catch(error => {
                resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
            });
    } else {
        resultsDiv.innerHTML = "<p>Please enter a domain.</p>";
    }
});
