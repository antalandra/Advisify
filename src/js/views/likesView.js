// LIKES PANEL INTERFACE LINK

// Imports
import { elements, elementStrings } from "./base";
import { limitAdviceText } from "./searchView";

// HIDING THE LIKES PANEL
const hideLikesPanel = () => {
    elements.likesButton.style.visibility = "visible";
};

// SHOWING THE LIKES PANEL
const showLikesPanel = () => {
    elements.likesButton.style.visibility = "hidden";
};

// SHOW/HIDE LIKES PANEL BASED ON NUMBER OF LIKED ADVICE ELEMENTS
export const toggleLikePanel = numOfLikes => {
    (numOfLikes > 0) ? showLikesPanel() : hideLikesPanel(); 
}

// CREATING LIKE ELEMENT AND INJECTING INTO LIKES LIST IN DOM
export const renderLikeElement = (like) => {
    const likeElement =
    `<li>
        <a class="likes__link" href="#${like.id}">
            <div class="likes__data">
                <p class="likes__advice">${like.text}</p>
            </div>
        </a>
    </li>`
    elements.likesList.insertAdjacentHTML("beforeend", likeElement);
};

// DELETING LIKE ELEMENT FROM THE LIST IN THE DOM BASED ON ID
export const deleteLikeElement = id => {
    const el = document.querySelector( `.likes__link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
};

// TOGGLE IMG FOR ICON DEPENDING ON WHETHER ITEM IS LIKED OR NOT
// TRUE: HEART FILLED
// FALSE: HEART OUTLINED
export const toggleHeartIcon = isLiked => {
    const heartIcon = document.querySelector(`.${elementStrings.adviceHeartIcon}`);
    if (heartIcon) {
        heartIcon.src = `img/heart${isLiked ? '' : '-outline'}.png`; 
    }
};