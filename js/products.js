(function () {
  window.freeCourses = [
    { name: "How to Create AI Videos for Content & Income" },
    { name: "How to Make Money with AI" },
    { name: "How to optimize post or ads with AI for 100% engagment" },
    { name: "How to make money through affiliate marketing" },
    { name: "How to Create AI Social Media Content That Converts" },
    { name: "How to Use AI to Create Profitable Contents" },
    { name: "How to Build Faceless YouTube Channels with AI" },
    { name: "How to Create website/landing page with AI" },
    { name: "How to automate goods and services with AI" },
    { name: "How to Design Graphics with AI and Get Paid" },
  ];
  const productsGrid = document.getElementById("productsGrid");

  /* ================= MODALS ================= */
  const lessonsModal = document.getElementById("lessonsModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalLessons = document.getElementById("modalLessons");
  const modalClose = document.getElementById("modalClose");

  const paymentModal = document.getElementById("paymentModal");
  const paymentClose = document.getElementById("paymentClose");
  const ngnAmountEl = document.getElementById("ngnAmount");
  const intlAmountEl = document.getElementById("intlAmount");
  const nigeriaPayment = document.getElementById("nigeriaPayment");
  const intlPayment = document.getElementById("intlPayment");
  const sendProofBtn = document.getElementById("sendProofBtn");
  const enquiryBtn = document.querySelector(".enquiry");
  const payCardBtn = document.getElementById("payCardBtn");

  /* ================= CHECKOUT ================= */
  const freeCourseSelect = document.getElementById("freeCourseSelect");
  const checkoutList = document.getElementById("checkoutCourses");

  let selectedProductIndex = null;
  let selectedFreeIndex = null;

  /* ================= COUNTRY ================= */
  async function getUserCountry() {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return data.country_code || "NG";
    } catch {
      return "NG";
    }
  }

  /* ================= RENDER PRODUCTS ================= */
  function renderProducts() {
    productsGrid.innerHTML = "";

    window.products.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "product-card";

      const preview = product.lessons.slice(0, 3);

      card.innerHTML = `
          <h4 class="productName">${product.name}</h4>
          <ul>
            ${preview.map((l) => `<li>${l}</li>`).join("")}
            ${
              product.lessons.length > 3
                ? `<li><strong>+ ${
                    product.lessons.length - 3
                  } more lessons</strong></li>`
                : ""
            }
          </ul>
  
          <div class="price-row">
            <span class="price">₦${product.price.toLocaleString()}</span>
            <button class="pay-btn">Enroll Now</button>
          </div>
  
          <button class="view-lessons-btn">View all Lessons</button>
        `;

      card.querySelector(".view-lessons-btn").onclick = () =>
        openLessonsModal(product);

      card.querySelector(".pay-btn").onclick = () => openPaymentModal(index);

      productsGrid.appendChild(card);
    });
  }

  /* ================= LESSONS ================= */
  function openLessonsModal(product) {
    modalTitle.innerText = product.name;
    modalLessons.innerHTML = "";
    product.lessons.forEach((l) => {
      const li = document.createElement("li");
      li.textContent = l;
      modalLessons.appendChild(li);
    });
    lessonsModal.classList.remove("hidden");
  }

  modalClose.onclick = () => lessonsModal.classList.add("hidden");
  lessonsModal.onclick = (e) => {
    if (e.target === lessonsModal) lessonsModal.classList.add("hidden");
  };

  /* ================= PAYMENT ================= */
  async function openPaymentModal(index) {
    selectedProductIndex = index;
    selectedFreeIndex = null;

    const product = window.products[index];

    ngnAmountEl.innerText = `₦${product.price.toLocaleString()}`;
    intlAmountEl.innerText = `$${(product.price / 750).toFixed(2)}`;

    const country = await getUserCountry();
    nigeriaPayment.style.display = country === "NG" ? "block" : "none";
    intlPayment.style.display = country === "NG" ? "none" : "block";

    populateFreeCourses();
    updateCheckoutSummary();

    paymentModal.classList.remove("hidden");
  }

  paymentClose.onclick = () => paymentModal.classList.add("hidden");
  paymentModal.onclick = (e) => {
    if (e.target === paymentModal) paymentModal.classList.add("hidden");
  };

  /* ================= FREE COURSES (AI) ================= */
  function populateFreeCourses() {
    if (!freeCourseSelect) return;

    freeCourseSelect.innerHTML = `<option value="">Select a free AI course here</option>`;

    window.freeCourses.forEach((course, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = course.name;
      freeCourseSelect.appendChild(opt);
    });
  }

  function updateCheckoutSummary() {
    if (!checkoutList || selectedProductIndex === null) return;

    checkoutList.innerHTML = "";

    const paid = window.products[selectedProductIndex];
    checkoutList.innerHTML += `<li>${
      paid.name
    } — ₦${paid.price.toLocaleString()}</li>`;

    if (selectedFreeIndex !== null) {
      const free = window.freeCourses[selectedFreeIndex];
      checkoutList.innerHTML += `<li class="free">${free.name} — FREE</li>`;
    }
  }

  if (freeCourseSelect) {
    freeCourseSelect.addEventListener("change", (e) => {
      selectedFreeIndex = e.target.value === "" ? null : Number(e.target.value);
      updateCheckoutSummary();
    });
  }

  /* ================= WHATSAPP ================= */
  /* ================= WHATSAPP (DIRECT APP) ================= */
  const phone = "2348130853304";

  sendProofBtn.onclick = () => {
    if (selectedProductIndex === null) return;

    const paid = window.products[selectedProductIndex];

    let msg = `Hello Coach Lucky,

I have paid ₦${paid.price.toLocaleString()} for:
*${paid.name}*`;

    if (selectedFreeIndex !== null) {
      msg += `

I also selected free course:
*${window.freeCourses[selectedFreeIndex].name}*`;
    }

    msg += `

Please find my proof of payment below.`;

    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(
      msg
    )}`;

    setTimeout(() => {
      window.location.href = url;
    }, 100);
  };

  enquiryBtn.onclick = () => {
    if (selectedProductIndex === null) return;

    const p = window.products[selectedProductIndex];
    const msg = `Hello Coach Lucky,

I want to enquire about:
*${p.name}*`;

    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(
      msg
    )}`;

    setTimeout(() => {
      window.location.href = url;
    }, 100);
  };

  /* ================= PAYSTACK ================= */
  function payWithCard() {
    if (selectedProductIndex === null) return;
    const product = window.products[selectedProductIndex];

    const name = prompt("Enter your full name");
    const email = prompt("Enter your email");
    if (!name || !email) return alert("Name and email required");

    PaystackPop.setup({
      key: "pk_live_f1cd72816e1e7939f2026803b200eb1f6ac00c1b",
      email,
      amount: product.price * 100,
      currency: "NGN",
      ref: "TRAINING-" + Math.floor(Math.random() * 1e9),
      callback: (res) => {
        let msg = `Hello Coach Lucky,%0A%0AI just paid for:%0A*${product.name}*%0AReference: ${res.reference}`;
        if (selectedFreeIndex !== null) {
          msg += `%0AFree AI course: *${window.freeCourses[selectedFreeIndex].name}*`;
        }
        window.open(`https://wa.me/2348130853304?text=${msg}`, "_blank");
      },
    }).openIframe();
  }

  if (payCardBtn) payCardBtn.onclick = payWithCard;

  /* ================= INIT ================= */
  document.addEventListener("DOMContentLoaded", renderProducts);
})();
