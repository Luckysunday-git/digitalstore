(function () {
  const whatsappPhone = "2348130853304";

  document.addEventListener("DOMContentLoaded", () => {
    // Handle "Enroll Now" clicks
    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains("pay-btn")) {
        // Show loading overlay
        const loading = document.getElementById("loadingOverlay");
        if (loading) loading.style.display = "flex";

        // Get the selected product info from its card
        const productCard = e.target.closest(".product-card");
        if (!productCard) return;

        const selectedProduct = {
          topic: productCard.dataset.topic || "Unknown",
          price: productCard.dataset.price || 0,
        };

        // Store globally
        window.selectedProduct = selectedProduct;

        // Update modal amount dynamically
        const amountEl = document.getElementById("modalAmount");
        if (amountEl) {
          amountEl.textContent = `₦${parseInt(
            selectedProduct.price
          ).toLocaleString()}`;
        }

        // Simulate short loading, then show modal
        setTimeout(() => {
          if (loading) loading.style.display = "none";

          const modal = document.getElementById("paymentModal");
          if (modal) modal.classList.remove("hidden");
        }, 500); // 500ms loading effect
      }
    });

    // Close modal
    const closeBtn = document.getElementById("paymentClose");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        const modal = document.getElementById("paymentModal");
        modal.classList.add("hidden");
      });
    }

    // Close modal if click outside content
    const modal = document.getElementById("paymentModal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("hidden");
      });
    }

    // Send proof of payment
    const proofBtn = document.getElementById("sendProofBtn");
    if (proofBtn) {
      proofBtn.addEventListener("click", () => {
        const product = window.selectedProduct || {};
        const topic = product.topic || "Course Enrollment";
        const price = product.price
          ? `₦${parseInt(product.price).toLocaleString()}`
          : "₦0";

        const msg = `*Hello Coach Lucky*,\n\nI have completed payment of *${price}* for *${topic}*.\nPlease confirm.`;

        const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
          msg
        )}`;
        window.open(url, "_blank");
      });
    }
  });
})();
