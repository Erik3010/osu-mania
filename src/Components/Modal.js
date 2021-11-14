class Modal {
  constructor({ modal, initialValue }) {
    this.modal = modal;
    this.modalContent = this.modal.querySelector(".modal");

    this.isShowModal = initialValue;

    this.resolveCallback = null;
  }
  init() {
    if (this.isShowModal) this.openModal();
    else this.closeModal();

    this.listener();
  }
  listener() {
    this.modalContent.addEventListener("animationend", () => {
      this.modal.style.display = this.isShowModal ? "flex" : "none";

      if (this.resolveCallback) {
        this.resolveCallback();
        this.resolveCallback = null;
      }
    });
  }
  closeModal() {
    return new Promise((resolve) => {
      this.isShowModal = false;

      this.modalContent.classList.add("hide-modal");
      this.modalContent.classList.remove("show-modal");

      this.resolveCallback = resolve;
    });
  }
  openModal() {
    return new Promise((resolve) => {
      this.isShowModal = true;

      this.modal.style.display = "flex";

      this.modalContent.classList.remove("hide-modal");
      this.modalContent.classList.add("show-modal");

      this.resolveCallback = resolve;
    });
  }
}

export default Modal;
