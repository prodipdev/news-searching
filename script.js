// Get News Data from https://gnews.io API
const loadNews = async (search) => {
  const formattedSearch = encodeURIComponent(search);
  const url = `https://gnews.io/api/v4/search?q=${formattedSearch}&apikey=13d3169c08d3c484251472051919676d`;
  console.log(formattedSearch)

  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert(`HTTP error! status: ${response.status}`);
      return;
    }
    const data = await response.json();
    displayNews(data.articles);
  }
  catch (error) {
    alert(`Fetch error: ${error}`);
  }
};

// Add dynamic search field methods
const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
// Add click event listener to the search button
searchBtn.addEventListener("click", () => {
  loadNews(searchField.value);
  searchField.value = '';
});
// Add keyup event listener to the search field
searchField.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

// Add a dynamic display for each news in news-container
const displayNews = (newsList) => {
  const newsContainer = document.getElementById("news-container");
  newsList.forEach(news => {
    const div = document.createElement("div");
    div.classList.add("mt-10")
    div.innerHTML = `
    <div class="bg-gray-50 shadow-md rounded-md p-4">
      <div class="flex gap-5 mb-4 text-sm">
        <a href="${news.source.url}" class="underline text-blue-500">${news.source.name}</a>
        <p class="">Published: ${news.publishedAt}</p>
      </div>
      <h2 class="mb-2 text-xl font-semibold">${news.title}</h2>
      <hr>
      <p class="mb-2">${news.description}</p>
      <div class="grid grid-cols-12 gap-3 mt-3">
          <div class="col-span-5"><img class="w-full rounded-md" src="${news.image}"></div>
          <p class="col-span-7">${news.content}</p>
      </div>
    </div>
    `
    newsContainer.appendChild(div);
  })
}

// Call default news
loadNews("trending news");