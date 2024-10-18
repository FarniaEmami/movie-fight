const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'b063078d', 
            s: searchTerm
        }
    })

    console.log(response.data)
}

const input = document.querySelector('input')

const onInput = debounce(event => {
    fetchData(event.target.value)
}, 500)

input.addEventListener('input', onInput)


