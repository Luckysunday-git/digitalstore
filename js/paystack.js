(function () {
  const whatsappPhone = "2348130853304";
  const loader = document.getElementById("loadingOverlay");

  document.addEventListener("DOMContentLoaded", () => {
    /* ================= ENROLL NOW ================= */
    document.body.addEventListener("click", (e) => {
      const btn = e.target.closest(".pay-btn");
      if (!btn) return;

      // Show loader
      if (loader) loader.classList.remove("hidden");

      // Get product card
      const productCard = btn.closest(".product-card");
      if (!productCard) return;

      const selectedProduct = {
        topic: productCard.dataset.topic || "Course Enrollment",
        price: productCard.dataset.price || 0,
      };

      // Store globally
      window.selectedProduct = selectedProduct;

      // Small delay for UX
      setTimeout(() => {
        if (loader) loader.classList.add("hidden");

        const modal = document.getElementById("paymentModal");
        if (modal) modal.classList.remove("hidden");
      }, 400);
    });

    /* ================= CLOSE MODAL ================= */
    const closeBtn = document.getElementById("paymentClose");
    if (closeBtn) {
      closeBtn.onclick = () => {
        document.getElementById("paymentModal").classList.add("hidden");
      };
    }

    const modal = document.getElementById("paymentModal");
    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) modal.classList.add("hidden");
      };
    }

    /* ================= SEND PAYMENT PROOF ================= */
    const proofBtn = document.getElementById("sendProofBtn");
    if (proofBtn) {
      proofBtn.onclick = () => {
        const product = window.selectedProduct || {};
        const topic = product.topic || "Course Enrollment";
        const price = product.price
          ? `₦${parseInt(product.price).toLocaleString()}`
          : "₦0";

        const msg = `Hello Coach Lucky,

I have completed payment of ${price} for:
*${topic}*

Please confirm my payment.`;

        const whatsappURL = `whatsapp://send?phone=${whatsappPhone}&text=${encodeURIComponent(
          msg
        )}`;

        // Show loader briefly
        if (loader) loader.classList.remove("hidden");

        setTimeout(() => {
          window.location.href = whatsappURL;
        }, 300);
      };
    }

    /* ================= AUTO HIDE LOADER ================= */
    window.addEventListener("focus", () => {
      if (loader) loader.classList.add("hidden");
    });
  });
})();
