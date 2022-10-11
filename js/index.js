const searchBtn = document.getElementById('submit')
let searchInput = document.getElementById('search')
async function getTvShows(query) {
    let response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=seasons`)
    // let response = await fetch('tvshow.json')
    let data = await response.json()
    
    return data
}

function displayTvShows(tvShow){
    const seasons = tvShow._embedded.seasons
    
    document.getElementsByTagName('main')[0].innerHTML = `
        <div class="tv-show">
            <h4 class="tv-show-name">${tvShow.name}</h4>
            <div class="tv-show-image"><img src="${tvShow.image === null ? '' : tvShow.image.original}" alt="${tvShow.name} poster" /></div>
            <div class="tv-show-summary">${tvShow.summary}</div>
        </div>
        <div class="seasons">
            <div class="seasons-header">Seasons</div>
            ${displaySeasons(seasons, tvShow.name)}
        </div>
        
        
    `
}

function displaySeasons(seasonsArray, tvShowName) {
    const seasonsHtml = seasonsArray.map(season => {
        return `
            <div class="a-season">
                <div class="a-season-no">Season ${season.number}</div>
                <div class="a-episodes">${season.episodeOrder} episodes</div>
                <div class="a-season-image"><a href="${season.url}"><img src="${season.image === null ? '' : season.image.original}" alt="${tvShowName} ${season.episodeOrder} Poster" /></a></div>
                <div class="a-season-summary">${season.summary === null ? 'Description not applicable' : season.summary}</div>
            </div>
        `
    }).join('')

    return seasonsHtml
}

document.getElementById('submit').addEventListener('click', e => {
    e.preventDefault()
    if (searchInput.value.length > 0) {
        getTvShows(searchInput.value).then(displayTvShows).catch(e => console.error(e))
        searchInput.value = ''
    }
})

// getTvShows("heroes").then(displayTvShows).catch(e => console.error(e))