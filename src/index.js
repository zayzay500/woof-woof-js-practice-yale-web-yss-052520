document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar')
    const dogInfoDiv = document.getElementById('dog-info')
    const filterButton = document.getElementById('good-dog-filter')
    let goodDogFilter = false

    function filterGoodDogs(dogs) {
        const goodDogs = dogs.filter(dog => {
            return dog.isGoodDog
        })
        return goodDogs
    }
    
    function filterOn(dogs) {
        filterButton.innerText = "Filter good dogs: ON"
        loadDogs(filterGoodDogs(dogs))
    }
    
    function filterOff(dogs) {
        filterButton.innerText = "Filter good dogs: OFF"
        loadDogs(dogs)
    }

    function toggleFilter(dogs) {
        goodDogFilter = !goodDogFilter
        goodDogFilter ? filterOn(dogs) : filterOff(dogs)
    }

    function enableFilterButton() {
        filterButton.addEventListener('click', () => {
            dogBar.innerHTML = ""
            fetch('http://localhost:3000/pups')
                .then(res => res.json())
                .then(dogs => toggleFilter(dogs))
        })
    }
    
    function configGoodDogObj(value) {
        return {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: value
            })
        }
    }

    function toggleGoodDog(dog) {
        const newValue = !dog.isGoodDog
        fetch(`http://localhost:3000/pups/${dog.id}`, configGoodDogObj(newValue))
            .then(res => res.json())
            .then(displayDog)
    }

    function goodDogButton(dog) {
        const button = document.createElement('button')
        button.addEventListener('click', () => { toggleGoodDog(dog) })
        return button
    }
    
    function makeH2(dog) {
        const h2 = document.createElement('h2')
        h2.innerText = dog.name
        return h2
    }
    
    function makeButton(dog) {
        const button = goodDogButton(dog)
        button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
        return button
    }
    
    function makeImg(dog) {
        const img = document.createElement('img')
        img.src = dog.image
        return img
    }

    function displayDog(dog) {
        dogInfoDiv.innerHTML = ""
        const img = makeImg(dog)
        const h2 = makeH2(dog)
        const button = makeButton(dog)
        dogInfoDiv.append(img, h2, button)
    }

    function dogSpan(dog) {
        const dogSpan = document.createElement('span')
        dogSpan.innerText = dog.name
        dogBar.append(dogSpan)
        dogSpan.addEventListener('click', () => { displayDog(dog) })
    }

    function loadDogs(dogs) {
        dogs.forEach(dog => dogSpan(dog))
    }

    function dogFetch() {
        fetch('http://localhost:3000/pups')
            .then(res => res.json())
            .then(dogs => loadDogs(dogs))
    }

    dogFetch()
    enableFilterButton()
})