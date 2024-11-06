const createAutocomplete = ({ root }) => {
    root.innerHTML = `
        <label><b>Search for a movie</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div> 
        </div>
    `

    const input = root.querySelector('input')
    const dropdown = root.querySelector('.dropdown')
    const resultWrapper = root.querySelector('.results')

    const onInput = debounce( async event => {
        const movies = await fetchData(event.target.value)

        if(!movies.length){
            dropdown.classList.remove('is-active')
            return
        }

        resultWrapper.innerHTML = ''
        dropdown.classList.add('is-active')
        for(let movie of movies){
            const option = document.createElement('a')
            const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster

            option.classList.add('dropdown-item')
            option.innerHTML = `
                <img src="${imgSrc}" />
                ${movie.Title}
            `

            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active')
                input.value = movie.Title

                onMovieSelect(movie)
            })

            resultWrapper.appendChild(option)
        }
        
    }, 500)

    input.addEventListener('input', onInput)

    document.addEventListener('click', event => {
        if(!root.contains(event.target)){
            dropdown.classList.remove('is-active')
        }
    })
}