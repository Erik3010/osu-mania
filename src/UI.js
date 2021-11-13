import Modal from "./Components/Modal";

class UI {
  constructor({ game }) {
    this.game = game;

    this.modal = null;
  }
  async init() {
    this.modal = new Modal({
      modal: document.querySelector("#start-modal"),
      closeButton: document.querySelector("#start-btn"),
      initialValue: true,
      onCloseButtonClicked: this.game.init.bind(this.game),
    });

    this.modal.init();
  }
}

export default UI;
