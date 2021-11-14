import Modal from "./Components/Modal";

class UI {
  constructor({ game, startGameButton, resumeGameButton, speedLevelRadios }) {
    this.game = game;

    this.startModal = null;
    this.pauseModal = null;

    this.speedLevelRadios = speedLevelRadios;
    this.selectedLevel = this.speedLevelRadios.find((el) => el.checked)?.value;

    this.startGameButton = startGameButton;
    this.resumeGameButton = resumeGameButton;
  }
  async init() {
    this.initStartModal();
    this.initPauseModal();

    this.listener();
  }
  listener() {
    this.speedLevelRadios.forEach((el) =>
      el.addEventListener("change", this.speedModeChangeHandler.bind(this))
    );

    window.addEventListener("keydown", this.pauseGameHandler.bind(this));

    this.startGameButton.addEventListener(
      "click",
      this.startGameHandler.bind(this)
    );

    this.resumeGameButton.addEventListener(
      "click",
      this.resumeGameHandler.bind(this)
    );
  }
  initStartModal() {
    this.startModal = new Modal({
      modal: document.querySelector("#start-modal"),
      initialValue: true,
    });

    this.startModal.init();
  }
  initPauseModal() {
    this.pauseModal = new Modal({
      modal: document.querySelector("#pause-modal"),
      initialValue: false,
    });
    this.pauseModal.init();
  }
  speedModeChangeHandler(e) {
    if (!e.target.checked) return;

    this.selectedLevel = e.target.value;
  }
  async startGameHandler() {
    await this.startModal.closeModal();

    this.game.init(this.selectedLevel);
  }
  async pauseGameHandler(e) {
    if (e.code !== "Escape" || this.game.ms === 0) return;

    this.game.pauseGame();

    await this.pauseModal.openModal();
  }
  async resumeGameHandler() {
    await this.pauseModal.closeModal();

    this.game.resumeGame();
  }
}

export default UI;
