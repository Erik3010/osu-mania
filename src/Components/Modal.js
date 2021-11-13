class Modal {
  constructor({ modal, activator, initialValue }) {
    this.modal = modal;
    this.activator = activator;

    this.modalContent = this.modal.querySelector(".modal");

    this.isShowModal = initialValue;
  }
  init() {
    if (this.isShowModal) this.openModal();
    else this.closeModal();

    this.listener();
  }
  listener() {
    this.activator.addEventListener("click", () => {
      const isModalShow = this.modal.classList.contains("show");
      // const isModalShow = this.modalContent.classList.contains("show-modal");

      if (isModalShow) this.closeModal();
      else this.openModal();
    });

    this.modalContent.addEventListener("animationend", () => {
      const display = this.isShowModal ? "block" : "none";

      this.modalContent.style.display = display;
      this.modal.style.display = display;
    });
  }
  closeModal() {
    this.modalContent.classList.add("hide-modal");
    this.modalContent.classList.remove("show-modal");

    this.modal.classList.remove("show");
    this.modal.classList.add("hide");

    this.isShowModal = false;
  }
  openModal() {
    this.modalContent.classList.remove("hide-modal");
    this.modalContent.classList.add("show-modal");

    this.modal.classList.add("show");
    this.modal.classList.remove("hide");

    this.isShowModal = true;
  }
}

export default Modal;
