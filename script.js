const apiKey = "42136761-fb3dffc36c917e867f4fbb7ae";
const searchForm = document.getElementById("searchform");
const searchInput = document.getElementById('search');
const colorSelect = document.getElementById('color');
const resultDiv = document.getElementById('result');
const previousPageBtn = document.getElementById('previouspage');
const nextPageBtn = document.getElementById('nextpage');

let search = '';
let color = '';
let page = 1;
let pageCounter;

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    page = 1;

    if (page == 1) {
        previousPageBtn.disabled = true;
    }

    search = searchInput.value;
    color = colorSelect.value;
    imageSearch();
    activateButtons();
});

function activateButtons() {
    const previousPage = previousPageBtn;
    const nextPage = nextPageBtn;

    previousPage.style.display = 'block';
    nextPage.style.display = 'block';
};

async function imageSearch() {
    try {
        const respone = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${search}&colors=${color}&image_type=photo&page=${page}&per_page=10`);

        if (!respone.ok) {
            throw new Error("No image")
        }

        const data = await respone.json();
        console.log(data);
        displayImages(data.hits);

        if (page == 1) {
            pageCounter = Math.ceil(data.totalHits / 10);
            if (pageCounter == 1) {
                nextPageBtn.disabled = true;
            }
            else {
                nextPageBtn.disabled = false;
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};

function displayImages(images) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    images.forEach(image => {
        const divElement = document.createElement('div');
        resultDiv.appendChild(divElement);

        const imgElement = document.createElement('img');
        imgElement.src = image.previewURL;
        imgElement.alt = image.tags;
        divElement.appendChild(imgElement);

        const tagsElement = document.createElement('p');
        tagsElement.textContent = image.tags;
        divElement.appendChild(tagsElement);

        const userElement = document.createElement('p');
        userElement.textContent = `User: ${image.user}`;
        divElement.appendChild(userElement);

    });
};

previousPageBtn.addEventListener("click", () => {
    if (page == 2) {
        previousPageBtn.disabled = true;
    }
    page--;
    nextPageBtn.disabled = false;
    imageSearch();
});

nextPageBtn.addEventListener("click", () => {
    page++;
    if (pageCounter == page) {
        nextPageBtn.disabled = true;
    }
    previousPageBtn.disabled = false;
    imageSearch();
});