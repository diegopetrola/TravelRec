async function searchClick() {
  const search = document.getElementById("search-input").value.toLowerCase();
  const searchEl = document.getElementById("search-res");
  searchEl.innerHTML = "";

  if (search === "") {
    searchEl.style.display = "none";
    return;
  }

  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    let results = data.temples.concat(data.beaches);
    for (c of data.countries) {
      results = results.concat(c.cities);
    }
    results = results.filter((v) => v.name.toLowerCase().includes(search));
    console.log(results);
    if (results.length > 0) {
      searchEl.style.display = "block"; // Show the container
      results.forEach((destination) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h1>${destination.name}</h1>
          <img src="${destination.imageUrl}" width="400px" />
          <p>${destination.description}</p>
        `;
        searchEl.appendChild(div);
      });
    } else {
      searchEl.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    searchEl.style.display = "none";
  }
}

function clearOnClick() {
  document.getElementById("search-res").style.display = "none";
}
