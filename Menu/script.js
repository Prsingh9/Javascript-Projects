const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "bison steak",
    category: "dinner",
    price: 22.99,
    img: "./images/item-10.jpg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menu); //menu is the array of items that we made, menu is argument
  displayMenuButtons();
});

function displayMenuItems(menuItems) {
  //menuItems is an array containing items ,menuItems=menu
  let displayMenu = menuItems.map(function (item) {
    return `<article class="menu-item">
        <img src=${item.img} class="photo" alt="">
        <div class="item-info">
            <header>
                <h4>${item.title}</h4>
                <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">
                ${item.desc}
            </p>
        </div>
    </article>`;
  });

  displayMenu = displayMenu.join(" ");
  // console.log(displayMenu);
  sectionCenter.innerHTML = displayMenu;
}

//define  displayMenuButtons fcuntion

function displayMenuButtons() {
  //we are extracting unique categories
  const categories = menu.reduce(
    function (values, item) {
      //values=["all","breakfast","lunch","shakes","dinner"]
      if (!values.includes(item.category)) {
        //!["all,"breakfast"].includes("lunch")=!false=true
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  // console.log(categories);

  //creating and displaying buttons dynamically
  const categoryBtns = categories
    .map(function (category) {
      //categories=["all","breakfast","lunch","shakes","dinner"]
      console.log(category);
      return ` <button type="button" class="filter-btn" data-id=${category}>${category}</button>`;
    })
    .join(" ");

  btnContainer.innerHTML = categoryBtns;

  const flterBtn = btnContainer.querySelectorAll(".filter-btn");
  console.log(flterBtn);

  flterBtn.forEach(function (btn) {
    //btn=b2
    btn.addEventListener("click", function (e) {
      //e is event object
      // console.log(e.currentTarget.dataset.id);
      const category = e.currentTarget.dataset.id;

      const menuCategory = menu.filter((menuItem) => {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      // console.log(menuCategory);
      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
}
