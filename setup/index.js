
let preview = document.getElementById("preview");
let loadMoreBtn = document.getElementById("load-more-btn");
let cardCount = 4;

// fetch("http://localhost:3000/users")
// .then(res => res.json())
// .then(json => {
//   json.map( data => {
//     icon = ""
//     if (data.source_type === "facebook"){
//       icon = "/icons/facebook.svg";
//     } else if (data.source_type === "instagram"){
//       icon = "/icons/instagram-logo.svg";
//     }
//     preview.append(div_card(data.profile_image,
//                             data.name,
//                             data.source_type.src = icon,
//                             data.source_link,
//                             data.image,
//                             data.date,
//                             data.caption,
//                             data.likes));
//   })
// })

fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(json => {
    displayCards(json.slice(0, cardCount));
  });

function displayCards(data) {
  data.map(data => {
    icon = "";
    if (data.source_type === "facebook") {
      icon = "/icons/facebook.svg";
    } else if (data.source_type === "instagram") {
      icon = "/icons/instagram-logo.svg";
    }
    preview.appendChild(
      div_card(
        data.profile_image,
        data.name,
        (data.source_type.src = icon),
        data.source_link,
        data.image,
        data.date,
        data.caption,
        data.likes
      )
    );
  });

  cardCount += 4;
  
  // if (cardCount === json.length) {
  //   loadMoreBtn.style.display = "none";
  // }
}

loadMoreBtn.addEventListener("click", () => {
  fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(json => {
      displayCards(json.slice(cardCount, cardCount + 4));
    });
});

//  create div
function div_card (img,
                   name,
                   icon,
                   link,
                   postedimg,
                   date,
                   description,
                   likes){
  let card = document.createElement('div');
  card.innerHTML = `
  <div class="card" id="card">
    <div class="cardHeader">
      <div class="userInfo">
        <div class="userImage">
          <img src="${img}">
        </div>
        <div class="userDetails">
          <div class="userName">
            ${name}
          </div>
          <div class="date">
            ${date}
          </div>
        </div>
      </div>
      <div class="platform">
        <a href="${link}"><img src="${icon}"></a>
      </div>
    </div>

    <div class="postedImage">
      <img src="${postedimg}">
    </div>

    <div class="description">
      ${description}
    </div>

    <div class="likeBtn">
      <div>
        <img class="heart" src="/icons/heart.svg" alt="heart" id="heart" onclick="changeHeartColor()" />
      </div>
      <div id="heartCount">
        ${likes}
      </div>
    </div>
  </div> 
  `;
   return card
}

const selectgridrows = document.getElementById("numberOfColumns");
const gridContainer = document.getElementById("preview");

const gridTemplateColumns = {
  "1": "repeat(1, 1fr)",
  "2": "repeat(2, 1fr)",
  "3": "repeat(3, 1fr)",
  "4": "repeat(4, 1fr)",
  "5": "repeat(5, 1fr)",
};

function setGridTemplateColumns() {
  if (window.innerWidth >= 992) {
    const selectedOption = selectgridrows.value;
    gridContainer.style.gridTemplateColumns = gridTemplateColumns[selectedOption];
  } else {
    gridContainer.style.gridTemplateColumns = "";
  }
}

selectgridrows.addEventListener("change", setGridTemplateColumns);
window.addEventListener("resize", setGridTemplateColumns);

let btn = document.getElementById("lightTheme");
let btn2 = document.getElementById("darkTheme");

btn2.onclick = function() {
  document.body.classList.add("dark-theme");
  document.sidebar.classList.add("dark-theme");
}

btn.onclick = function() {
  document.body.classList.remove("dark-theme");
  document.sidebar.classList.remove("dark-theme");
}

// this code bellow was for the heart icon to be clickable but doesnt work as suposed to

// let count = 0;
// const heart = document.querySelector('.heart');
// const countDisplay = document.querySelector('#count');

// heart.addEventListener('click', function() {
//   if (heart.classList.contains('active')) {
//     heart.classList.remove('active');
//     count--;
//   } else {
//     heart.classList.add('active');
//     count++;
//   }
//   countDisplay.textContent = count;
// });




