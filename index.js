document.addEventListener("DOMContentLoaded", () => {
  let allFacts = [];
  let currentFactIndex = 0

  document.getElementById('load-facts').addEventListener('click', function() {
      fetch('https://catfact.ninja/facts?limit=50')
          .then(response => response.json())
          .then(data => {
              allFacts = data.data;
              displayFact(allFacts[currentFactIndex]);
              document.getElementById('next-fact').style.display = 'block';
          })
          .catch(error => {
              console.error('Error fetching cat facts:', error);
          });
  });

  document.getElementById('next-fact').addEventListener('click', function() {
      currentFactIndex++;
      if (currentFactIndex >= allFacts.length) {
          currentFactIndex = 0;
      }
      displayFact(allFacts[currentFactIndex]);
  });

  function displayFact(fact) {
      const factDisplay = document.getElementById('fact-display');
      factDisplay.innerHTML = '';  // Clear previous facts

      const factElement = document.createElement('div');
      factElement.innerHTML = `<p>${fact.fact}</p>`;  // Use a single fact object
  
     fetch('https://api.thecatapi.com/v1/images/search')
          .then(response => response.json())
          .then(imageData => {
              const catImageUrl = imageData[0].url;
              const imgElement = document.createElement('img');
              imgElement.src = catImageUrl;
              imgElement.alt = "Random cat image";
              imgElement.style.width = "100%";
              imgElement.style.borderRadius = "5px";
           factElement.appendChild(imgElement)   
          })
          .catch(error => {
              console.log('Error fetching cat image:', error);
          });
          factDisplay.appendChild(factElement)
        
  }

  document.getElementById('toggle-dark-mode').addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
  });

  document.getElementById('add-custom-fact').addEventListener('click', function() {
      const customFactInput = document.getElementById('custom-fact');
      const factText = customFactInput.value.trim();

      if (factText) {
          addCustomFact(factText);
          customFactInput.value = '';
      } else {
          alert("Please enter a fact before submitting.");
      }
  });

  function addCustomFact(fact) {
      const customFactList = document.getElementById('custom-facts-list');
      const listItem = document.createElement('li');

      fetch('https://api.thecatapi.com/v1/images/search')
          .then(response => response.json())
          .then(imageData => {
              const catImageUrl = imageData[0].url;

              listItem.innerHTML = `
                  <div class="fact-text">${fact}</div>
                  <img src="${catImageUrl}" alt="Random cat image" style="width: 100%; border-radius: 5px;">
                  <div class="fact-actions">
                      <div>
                          <button class="like-btn">Like</button>
                          <span class="like-count">0</span> likes
                      </div>
                      <button class="delete-btn">X</button>
                  </div>
              `;

              listItem.querySelector('.like-btn').addEventListener('click', function() {
                  const likeCountSpan = listItem.querySelector('.like-count');
                  let likeCount = parseInt(likeCountSpan.textContent, 10);
                  likeCountSpan.textContent = likeCount + 1;
              });

              listItem.querySelector('.delete-btn').addEventListener('click', function() {
                  customFactList.removeChild(listItem);
              });

              customFactList.appendChild(listItem);
          })
          .catch(error => {
              console.error('Error fetching cat image:', error);
          });
  }
});