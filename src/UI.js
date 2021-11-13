import Modal from "./components/Modal";

class UI {
  constructor({ game }) {
    this.game = game;

    this.modal = null;

    this.speedLeveEls = [
      ...document.querySelectorAll(".speed-mode input[type=radio]"),
    ];
    this.selectedLevel = this.speedLeveEls.find((el) => el.checked)?.value;
  }
  async init() {
    this.initModal();

    this.speedLeveEls.forEach((el) => {
      el.addEventListener("change", (e) => {
        if (e.target.checked) {
          this.selectedLevel = e.target.value;
          this.modal.onCloseButtonClicked = this.game.init.bind(
            this.game,
            this.selectedLevel
          );
        }
      });
    });
  }
  initModal() {
    this.modal = new Modal({
      modal: document.querySelector("#start-modal"),
      closeButton: document.querySelector("#start-btn"),
      initialValue: true,
      onCloseButtonClicked: this.game.init.bind(this.game, this.selectedLevel),
    });

    this.modal.init();
  }
}

export default UI;