//Webhook URL
const webhookUrl = "https://hook.eu2.make.com/m8o8kokophthtg7yan345td9ry9h3eul";

//Form variables
const form = document.getElementById("webhookForm");
const style = document.getElementById("style");
const ratio = document.getElementById("ratio");
const imageDescriptionInput = document.getElementById("image-description");
const theme = document.getElementById("theme");
const purposeInput = document.getElementById("purpose");

//Prompt variables
const purpose = [
  {
    title: "Write me a title in 2 words that reflecting this topic : ",
    paragraph: "Write a strong statement of max 80 char about "
  },
  {
    title: "Write me a catchy clickbait video title of max 50 char about ",
    paragraph: "Write a viral video description in max 100 char about "
  }
];

const instructions = {
  title: "",
  paragraph: ""
};

let imageDescription = "";

const stringFormat =
  '. Do not include bold text or any special character. Do not use \' or "".';

//output variables
const output = document.getElementById("output");
const title = document.getElementById("output-title");
const posterImage = document.getElementById("output-image");
const colorOverlay = document.getElementById("color-overlay");
const paragraph = document.getElementById("output-paragraph");
const outputElement = document.getElementById('output-element');

const font = {
  Roboto: "'Roboto'",
  Lora: "'Lora'",
  OpenSans: "'Open Sans'",
  Merriweather: "'Merriweather'",
  Montserrat: "'Montserrat'",
  Poppins: "'Poppins'",
  Raleway: "'Raleway'",
  PlayfairDisplay: "'Playfair Display'",
  Ubuntu: "'Ubuntu'",
  Oswald: "'Oswald'",
  SourceSerif: "'Source Serif Pro'",
  Quicksand: "'Quicksand'",
  FiraSans: "'Fira Sans'",
  Spectral: "'Spectral'"
};

// Designer variables
const fontFamilySelector = document.getElementById("font-family");
const designer = document.getElementById("designer");