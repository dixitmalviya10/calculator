import popSound from "../assets/sounds/pop-sound.mp3";

export function playClickSound() {
  const audio = new Audio(popSound);
  audio.play();
}
