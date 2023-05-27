const myQuery = `
query metros ($cursor:String) {
    metroStations(first:2 after:$cursor){
        edges {
            node {
                name
                coordinates {
                    latitude
                    longitude
                }
            }
        }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}
`

const url = new URL("https://barcelona-urban-mobility-graphql-api.netlify.app/graphql")
const myVar = { cursor: null }
url.searchParams.set("query", myQuery)
url.searchParams.set("variables", JSON.stringify(myVar))
url.searchParams.set("operationName", "metros")
const response = await fetch(url)
const nameStation = await response.json()
for (const station of nameStation.data.metroStations.edges) {
    console.log(station.node.name)
}

const nextPage = nameStation.data.metroStations.pageInfo.endCursor
myVar.cursor = nextPage
url.searchParams.set("variables", JSON.stringify(myVar))
const response2 = await fetch(url)
const dataStation = await response2.json()
for (const station of dataStation.data.metroStations.edges) {
    console.log(station)
}