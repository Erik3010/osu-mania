import Modal from "./Components/Modal";

class UI {
  constructor({
    game,
    startGameButton,
    resumeGameButton,
    speedLevelRadios,
    pauseModalEl,
  }) {
    this.game = game;

    this.startModal = null;
    this.pauseModal = null;
    this.finishModal = null;

    this.speedLevelRadios = speedLevelRadios;
    this.selectedLevel = this.speedLevelRadios.find((el) => el.checked)?.value;

    this.startGameButton = startGameButton;
    this.resumeGameButton = resumeGameButton;

    this.pauseModalEl = pauseModalEl;
  }
  async init() {
    this.initStartModal();
    this.initPauseModal();
    this.initFinishModal();

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
  initFinishModal() {
    this.finishModal = new Modal({
      modal: document.querySelector("#finish-modal"),
      initialValue: false,
    });
    this.finishModal.init();
  }
  speedModeChangeHandler(e) {
    if (!e.target.checked) return;

    this.selectedLevel = e.target.value;
  }
  async startGameHandler() {
    await this.startModal.close();

    this.game.init(this.selectedLevel);
  }
  async pauseGameHandler(e) {
    if (e.code !== "Escape" || this.game.ms === 0) return;

    this.game.pauseGame();

    this.pauseModalEl.time.innerHTML = (this.game.ms / 1000).toFixed(2);
    this.pauseModalEl.score.innerHTML = `${this.game.score}%`;

    await this.pauseModal.open();
  }
  async resumeGameHandler() {
    await this.pauseModal.close();

    this.game.resumeGame();
  }
}

export default UI;
