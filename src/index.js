document.addEventListener("DOMContentLoaded", event => {     
  const dogBar = document.querySelector('#dog-bar')
  const dogInfo = document.querySelector('#dog-info')

  const addPupsToDogBar = (pups) => {
  
    let span = document.createElement('span')
    span.textContent = pups.name
    span.id = pups.id

    span.addEventListener('click', pupsSpanClick)

    dogBar.append(span)
  }

  const pupsSpanClick = (e) => {
    fetch(`http://localhost:3000/pups/${e.target.id}`)
    .then(response => response.json())
    .then(obj_pups => {
      
      e.preventDefault()
  
      dogInfo.innerHTML = ""
      let div = document.createElement('div')
      let image = document.createElement('img')
      let h2 = document.createElement('h2')
      let button = document.createElement('button')
      
      image.src = obj_pups.image
      h2.textContent = obj_pups.name

      if (obj_pups.isGoodDog === true) {
        button.textContent = "Good Dog!"
        button.id = obj_pups.id
      } else {
        button.textContent = "Bad Dog!"
        button.id = obj_pups.id
      }

      button.addEventListener('click', toggleButton)

      div.appendChild(image)
      div.appendChild(h2)
      div.appendChild(button)

      dogInfo.append(div)
  })
  }

  const toggleButton = (e) => {
    
    e.preventDefault()
    let newValue

    if(e.target.innerText.includes("Good")) {
      e.target.innerText = "Bad Dog"
      newValue = false
    } else {
      e.target.innerText = "Good Dog"
      newValue = true
    }

    fetch(`http://localhost:3000/pups/${e.target.id}`, {
      
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
          isGoodDog: newValue
        })
      })
    .then(response => response.json())

  }
  
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(obj_pups => {
  
    obj_pups.forEach(pups => {
      addPupsToDogBar(pups)
    })
  })
  
});