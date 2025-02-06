//Webhook URL
const webhookUrl = "https://hook.eu2.make.com/m8o8kokophthtg7yan345td9ry9h3eul";

//Form variables
const form = document.getElementById("webhookForm");
const style = document.getElementById("style");
const ratio = document.getElementById("ratio");
const imageDescriptionInput = document.getElementById("image-description");
const theme = document.getElementById("theme");
const purposeInput = document.getElementById("purpose");
const regenerateButton = document.getElementById("regenerate");

//Prompt variables
const purpose = [
  {
    title: "Write me a catchy clickbait video title of max 40 char about ",
    subtitle: "Write me an eyebrow title in 1 or 2 words that reflecting this topic : "
  },
  {
    title: "",
    subtitle: ""
  }
];

const instructions = {
  title: "",
  subtitle: ""
};

let imageDescription = "";

const stringFormat =
  '. Do not include bold text or any special character. Do not use \' or "".';

//output variables
const output = document.getElementById("output");
const outputImage = document.getElementById("output-image");
const colorOverlay = document.getElementById("color-overlay");
const outputText = document.getElementById("output-text");
const outputSubtitle = document.getElementById("output-subtitle");
const outputTitle = document.getElementById("output-title");
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

const designer = document.getElementById("designer");
const backToMain = document.getElementById("back-to-main");
const colorOverlaySelector = document.getElementById("color-overlay-selector");
const stickerEditDone = document.getElementById("sticker-edit-done");

//Title
const titleEditDone = document.getElementById("title-edit-done");

const titleFontSizeSlider= document.getElementById("title-font-size-slider");
const titleFontSizeValue = document.getElementById("title-font-size-value");
const titleLetterSpacingSlider= document.getElementById("title-letter-spacing-slider");
const titleLetterSpacingValue = document.getElementById("title-letter-spacing-value");
const titleFontSelector = document.getElementById("title-font-selector");
const titleBackgroundSelector = document.getElementById("background-color-title-selector");
const addBackgroundTitle = document.getElementById("add-background-title");
const titleSkewSlider = document.getElementById("title-skew-slider");
const titleSkewValue = document.getElementById("title-skew-value");

//Subtitle
const subtitleEditDone = document.getElementById("subtitle-edit-done");

const subtitleFontSizeSlider = document.getElementById("subtitle-font-size-slider");
const subtitleFontSizeValue = document.getElementById("subtitle-font-size-value");
const subtitleLetterSpacingSlider = document.getElementById("subtitle-letter-spacing-slider");
const subtitleLetterSpacingValue = document.getElementById("subtitle-letter-spacing-value");
const subtitleFontSelector = document.getElementById("subtitle-font-selector");