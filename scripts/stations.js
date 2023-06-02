const myQuery = `
query metros ($latitude: Float!, $longitude: Float!) {
    metroStation(findBy: { closest: { latitude: $latitude, longitude: $longitude }}){
        ...on MetroStation {
            name
            coordinates {
                latitude
                longitude
            }
        }
    }
}
`;

const url = "https://healthy-fox-82.deno.dev/graphql";

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
  
async function success(pos) {
    const crd = pos.coords;
    
    const myVar = { latitude: crd.latitude, longitude: crd.longitude };
    console.log(myVar);

    async function fetchData() {
        const response = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ query: myQuery, variables: myVar, operationName: "metros" })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const text = await response.text();
        if (!text) {
            throw new Error('No response text');
        }
        
        try {
            const nameStation = JSON.parse(text);
            console.log(nameStation);
            
        } catch (error) {
            console.error('Invalid JSON:', text);
            console.error('Parse Error:', error);
        }
       
    }

    fetchData();
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
