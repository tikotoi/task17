let mainWraperPost = document.getElementById('post-block');
let overlayContent = document.getElementById('overlay');
let closeOverlay = document.getElementById('close');
let content = document.getElementById('content');
let addButton = document.getElementById('add');
let postOverlay = document.getElementById('postoverlay');
let form = document.getElementById('form');
let newpost = document.getElementById('newpost')

function ajax(url, callback) {
    let requist = new XMLHttpRequest();
    requist.open('GET', url);
    requist.addEventListener('load', function() {
        let data = JSON.parse(requist.responseText);
        callback(data);
    });

    requist.send();
}

ajax('https://jsonplaceholder.typicode.com/posts', function(data) {
    printData(data);
}); 

function printData(data) {
    data.forEach(element => {
        createPost(element);
    });
}


function createPost(item) {
 let divWrapper = document.createElement('div');
 divWrapper.classList.add('posts');
 divWrapper.setAttribute('data-id', item.id);

 let h2Tag = document.createElement('h2');
 h2Tag.innerText = item.id;
 let h3Tag = document.createElement('h3');
 h3Tag.innerText= item.title;

 let deleteButton= document.createElement('button');
 deleteButton.innerText = 'Delete Post';
 deleteButton.setAttribute('data-id', item.id);

 divWrapper.appendChild(h2Tag);
 divWrapper.appendChild(h3Tag);
 divWrapper.appendChild(deleteButton);
 deleteButton.classList.add('deleteButton');

 divWrapper.addEventListener('click', function (event) {
    let id = event.target.getAttribute('data-id');
    openOverlay(id);

})

deleteButton.addEventListener('click', function (event) {
    event.stopPropagation();
    let id = event.target.getAttribute('data-id');
    deletePost(id);
    divWrapper.classList.add('deletediv')
});

 mainWraperPost.appendChild(divWrapper);

 console.log(divWrapper);
}

function openOverlay(id) {
    overlayContent.classList.add('active');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    ajax(url, function(data) {
        overlayFunction(data);
    });
    console.log(id);
}

function deletePost(id) {
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
        method: 'DELETE',
    })
}

function overlayFunction(item) {
    let titlepost = document.createElement('h3');
    titlepost.innerText = item.title;
    
    let description = document.createElement('p');
    description.innerText = item.body;

    content.appendChild(titlepost);
    content.appendChild(description);
}

closeOverlay.addEventListener('click', function () {
    overlayContent.classList.remove('active');
    content.innerHTML = ' ';

})

addButton.addEventListener('click', function () {
    postOverlay.classList.add('active-add');
})

form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(event.target);

    let formData = {
        title:event.target[0].value,
        description:event.target[1].value,
    }
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body:JSON.stringify (formData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    .then((response) => response.json())
    .then((json) => console.log(json));

    createPost(formData);

       postOverlay.classList.remove('active-add');
    
})
