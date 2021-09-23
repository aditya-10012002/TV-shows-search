const showDisplay = document.querySelector('#showContainer');
const form = document.querySelector('#showSearch');
let links = [];

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    links = [];
    const elements = document.querySelectorAll('.card');
    for (let element of elements)
        element.remove();
    const searchTerm = form.elements[0].value;
    const config = { params: { q: searchTerm } };
    const show = await axios.get("https://api.tvmaze.com/search/shows", config);
    addElements(show.data);
    form.elements[0].value = '';

    // Just checking if selecting new formed links possible!!

    links = document.querySelectorAll('.aLink');
    for (let link of links) {
        link.addEventListener('click', (e) => {
            console.log("Link works!!!");
            //link.href = 'https://www.google.com';
        })
    }


})

const addElements = (shows) => {
    for (let data of shows) {
        if (data.show.image && data.show.image.medium) {
            //console.log(data.show);
            const nameHeading = document.createElement('h5');
            const aLink = document.createElement('a');
            aLink.innerText = data.show.name;
            aLink.classList.add('aLink');
            nameHeading.appendChild(aLink);
            const newImg = document.createElement('img');
            newImg.src = data.show.image.medium;

            newImg.classList.add('card-img-top');
            nameHeading.classList.add('card-title', 'text-center')

            const displayBody = document.createElement('div');
            displayBody.classList.add('card-body');
            displayBody.append(nameHeading);

            const display = document.createElement('div');
            display.classList.add('card', 'd-inline-block', 'm-3', 'border', 'border-primary', 'col-sm-5', 'col-md-3', 'col-lg-2');
            display.append(newImg, displayBody);
            showDisplay.append(display);
        }
    }
}