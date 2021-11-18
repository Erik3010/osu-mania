class Modal {
  constructor({ modal, initialValue }) {
    this.modal = modal;
    this.modalContent = this.modal.querySelector(".modal");

    this.isShowModal = initialValue;

    this.resolveCallback = null;
  }
  init() {
    if (this.isShowModal) {
      this.open();
    } else {
      this.close();
    }

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
  close() {
    return new Promise((resolve) => {
      this.isShowModal = false;

      this.modalContent.classList.add("hide-modal");
      this.modalContent.classList.remove("show-modal");

      this.resolveCallback = resolve;
    });
  }
  open() {
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
