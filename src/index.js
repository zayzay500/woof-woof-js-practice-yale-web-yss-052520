document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar')
    const dogInfoDiv = document.getElementById('dog-info')
    
    function toggleGoodDog(dog) {
        // debugger
        const newValue = !dog.isGoodDog
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                isGoodDog: newValue
            })
        })
        .then(res => res.json())
        .then(displayDog)
        // debugger
    }
    
    function goodDogButton(dog) {
        const button = document.createElement('button')
        button.addEventListener('click', () => {toggleGoodDog(dog)})
        return button
    }
    
    function displayDog(dog) {
        dogInfoDiv.innerHTML = ""
        const img = document.createElement('img')
        img.src = dog.image
        const h2 = document.createElement('h2')
        h2.innerText = dog.name
        const button = goodDogButton(dog)
        button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
        dogInfoDiv.append(img, h2, button)
    }
    
    function dogSpan(dog) {
        const dogSpan = document.createElement('span')
        dogSpan.innerText = dog.name
        dogBar.append(dogSpan)
        dogSpan.addEventListener('click', () => {displayDog(dog)})
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
})