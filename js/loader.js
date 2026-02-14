(function () {
  const loader = document.getElementById("loadingOverlay");

  if (!loader) return;

  document.addEventListener("click", function (e) {
    const btn = e.target.closest("button");
    if (!btn) return;

    loader.classList.remove("hidden");

    // Safety auto-hide (prevents stuck loader)
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 100);
  });

  // Hide loader when page regains focus (WhatsApp opens)
  window.addEventListener("focus", () => {
    loader.classList.add("hidden");
  });
})();
