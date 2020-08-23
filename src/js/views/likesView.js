// LIKES PANEL INTERFACE LINK

// Imports
import { elements, elementStrings, removeExistingHighlight, highlightCorrespondingItem } from "./base";
import { limitAdviceText } from "./searchView";

// HIDING THE LIKES PANEL
const hideLikesPanel = () => {
    elements.likes.style.visibility = "hidden";
};

// SHOWING THE LIKES PANEL
const showLikesPanel = () => {
    elements.likes.style.visibility = "visible";
};

// SHOW/HIDE LIKES PANEL BASED ON NUMBER OF LIKED ADVICE ELEMENTS
export const toggleLikePanel = numOfLikes => {
    (numOfLikes > 0) ? showLikesPanel() : hideLikesPanel(); 
}

// CREATING LIKE ELEMENT AND INJECTING INTO LIKES LIST IN DOM
export const renderLikeElement = like => {
    const likeElement =
    `<li>
        <a class="likes__link" href="#${like.id}">
            <div class="likes__data">
                <p class="likes__advice">${like.text}</p>
            </div>
        </a>
    </li>`
    elements.likesList.insertAdjacentHTML("beforeend", likeElement);
    console.log(like.text);
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
    const heartImg = document.querySelector(`.${elementStrings.adviceHeartImg}`);
    console.log(heartImg);
    if (heartImg) {
        heartImg.src = `img/heart${isLiked ? '' : '-outline'}.png`;
        console.log(heartImg.src) 
    }
};


// HIGHLIGHTING SELECTED ELEMENT IN THE RESULTS LIST OF ADVICES
export const highlightSelectedLike = (id) => {

    // Removing highlight on any like element which existed previously
    removeExistingHighlight(elementStrings.likeLink);
    
    // Adding highlight to correct liked element in the likes panel when advice div corresponds
    highlightCorrespondingItem(elementStrings.likeLink, id);
    
  };