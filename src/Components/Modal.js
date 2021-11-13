class Modal {
  constructor({ modal, closeButton, initialValue, onCloseButtonClicked }) {
    this.modal = modal;
    this.closeButton = closeButton;

    this.modalContent = this.modal.querySelector(".modal");

    this.isShowModal = initialValue;

    this.onCloseButtonClicked = onCloseButtonClicked;
  }
  init() {
    if (this.isShowModal) this.openModal();
    else this.closeModal();

    this.listener();
  }
  listener() {
    this.closeButton.addEventListener("click", () => {
      if (this.isShowModal) this.closeModal();
      else this.openModal();
    });

    this.modalContent.addEventListener("animationend", () => {
      this.modalContent.style.display = this.isShowModal ? "block" : "none";
      this.modal.style.display = this.isShowModal ? "flex" : "none";

      if (!this.isShowModal) this.onCloseButtonClicked();
    });
  }
  closeModal() {
    this.isShowModal = false;

    this.modalContent.classList.add("hide-modal");
    this.modalContent.classList.remove("show-modal");
  }
  openModal() {
    this.isShowModal = true;

    this.modal.style.display = "flex";

    this.modalContent.classList.remove("hide-modal");
    this.modalContent.classList.add("show-modal");
  }
}

export default Modal;
