import Modal from "./Components/Modal";

class UI {
  constructor({ game }) {
    this.game = game;
  }
  async init() {
    // await this.game.init();

    const modal = new Modal({
      modal: document.querySelector("#start-modal"),
      activator: document.querySelector("#start-btn"),
      initialValue: true,
    });
    modal.init();
  }
}

export default UI;
