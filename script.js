const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll(".parallax");
const purchaseButton = document.querySelector(".purchase-button");
const quantityValue = document.querySelector("[data-quantity-value]");
const quantityMinus = document.querySelector("[data-quantity-minus]");
const quantityPlus = document.querySelector("[data-quantity-plus]");
let journalQuantity = 1;

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const updateParallax = () => {
  const offset = Math.min(window.scrollY * 0.12, 80);
  parallaxItems.forEach((item) => {
    item.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
  });
};

const updatePurchaseQuantity = () => {
  if (!quantityValue || !purchaseButton) return;

  const label = journalQuantity === 1 ? "journal" : "journals";
  const subject = encodeURIComponent(`Quiero comprar ${journalQuantity} ${label} Lo Simple`);
  const body = encodeURIComponent(`Hola, quiero comprar ${journalQuantity} ${label} Lo Simple.`);

  quantityValue.textContent = journalQuantity;
  purchaseButton.href = `${purchaseButton.dataset.base}?subject=${subject}&body=${body}`;
  purchaseButton.textContent = `Solicitar ${journalQuantity} ${label}`;
};

quantityMinus?.addEventListener("click", () => {
  journalQuantity = Math.max(1, journalQuantity - 1);
  updatePurchaseQuantity();
});

quantityPlus?.addEventListener("click", () => {
  journalQuantity = Math.min(20, journalQuantity + 1);
  updatePurchaseQuantity();
});

window.addEventListener("scroll", () => {
  updateHeader();
  updateParallax();
});

updateHeader();
updateParallax();
updatePurchaseQuantity();
