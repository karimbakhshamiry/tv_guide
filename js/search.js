const searchBtn = document.getElementById('submit')
let searchInput = document.getElementById('search')
async function getTvShows(query) {
    let response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    let data = await response.json()
    
    return data
}

function displayTvShows(tvShowDataArray){
    console.log(tvShowDataArray)
    // const seasons = tvShow._embedded.seasons
    
    document.getElementsByTagName('main')[0].innerHTML = `
        <div class="searched-tv-shows">
            ${getTvShowHtml(tvShowDataArray)}
        </div>
    `
        // <div class="seasons">
        //     <div class="seasons-header">Seasons</div>
        //     ${displaySeasons(seasons, tvShow.name)}
        // </div>
        
        
}

function getTvShowHtml(tvShowArray) {

    let tvShowHtml = ''
    if (tvShowArray.length > 0) {
        tvShowHtml = tvShowArray.map( tvShow => {
            return `
                <div class="tv-show">
                    <h4 class="tv-show-name">${tvShow.show.name}</h4>
                    <div class="tv-show-image"><img src="${tvShow.show.image === null ? '' : tvShow.show.image.original}" alt="${tvShow.show.name} poster" /></div>
                    <div class="tv-show-summary">${tvShow.show.summary === null ? 'Description not applicable' : tvShow.show.summary}</div>
                </div>
            `
        }).join('')

    }else {
        tvShowHtml = "<h2>Unable to find what you're looking for. Please try another search.</h2>"
    }

    return tvShowHtml
}

document.getElementById('submit').addEventListener('click', e => {
    e.preventDefault()
    if (searchInput.value.length > 0) {
        getTvShows(searchInput.value).then(displayTvShows).catch(e => console.error(e))
        searchInput.value = ''
    }
})