// Function to get user country
async function getUserCountry() {
  try {
    const res = await fetch("https://ipinfo.io/json?token=5b451922150e41");
    const data = await res.json();
    return data.country; // e.g., "NG", "KE", "CM"
  } catch (err) {
    console.error(err);
    return "NG"; // default to NG if API fails
  }
}

// Open payment modal and update amounts based on country
async function openPaymentModal(product) {
  const country = await getUserCountry();

  document.getElementById("paymentModal").classList.remove("hidden");

  document.getElementById(
    "ngnAmount"
  ).innerText = `₦${product.price.toLocaleString()}`;
  document.getElementById("intlAmount").innerText = `$${(
    product.price / 750
  ).toFixed(2)}`; // example USD conversion

  if (country === "NG") {
    document.getElementById("nigeriaPayment").style.display = "block";
    document.getElementById("intlPayment").style.display = "none";
  } else {
    document.getElementById("nigeriaPayment").style.display = "none";
    document.getElementById("intlPayment").style.display = "block";
  }

  document.getElementById("payCardBtn").onclick = () => {
    payWithCard(product);
  };
}

// Close modal
document.getElementById("paymentClose").onclick = () => {
  document.getElementById("paymentModal").classList.add("hidden");
};

function payWithCard(product) {
  const PAYSTACK_KEY = "pk_live_f1cd72816e1e7939f2026803b200eb1f6ac00c1b";
  const whatsappPhone = "2348130853304";

  const userName = prompt("Enter your full name:");
  const userEmail = prompt("Enter your email:");

  if (!userName || !userEmail) return alert("Please enter your name & email");

  const handler = PaystackPop.setup({
    key: PAYSTACK_KEY,
    email: userEmail,
    amount: product.price * 100, // NGN amount for Paystack
    currency: "NGN", // Paystack handles international cards
    ref: "FBADS-" + Math.floor(Math.random() * 1000000000 + 1),
    metadata: {
      custom_fields: [
        { display_name: "Topic", variable_name: "topic", value: product.name },
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: userName,
        },
      ],
    },
    callback: (res) => {
      alert(`Payment successful! Reference: ${res.reference}`);
      const msg = `*Hello Coach Lucky*,\nI paid ₦${product.price.toLocaleString()} for *${
        product.name
      }*.\nTransaction: *${res.reference}*`;
      window.location.href = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
        msg
      )}`;
    },
    onClose: () => alert("Payment window closed"),
  });

  handler.openIframe();
}

/* ================= FREE COURSE BONUS (FIXED) ================= */

let paidCourseIndex = null;
let freeCourseIndex = null;

/* Populate dropdown safely */
function populateFreeCourses(paidIndex) {
  const select = document.getElementById("freeCourseSelect");
  if (!select) {
    console.error("freeCourseSelect not found");
    return;
  }

  select.innerHTML = `<option value="">Select a free course</option>`;

  if (!window.products || !window.products.length) {
    console.error("Products not available");
    return;
  }

  window.products.forEach((course, index) => {
    if (index !== paidIndex) {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = course.name;
      select.appendChild(option);
    }
  });

  console.log("Free courses populated");
}

/* Update summary */
function updateCheckoutSummary() {
  const list = document.getElementById("checkoutCourses");
  if (!list || paidCourseIndex === null) return;

  list.innerHTML = "";

  const paid = window.products[paidCourseIndex];

  const paidItem = document.createElement("li");
  paidItem.textContent = `${paid.name} — ₦${paid.price}`;
  list.appendChild(paidItem);

  if (freeCourseIndex !== null) {
    const free = window.products[freeCourseIndex];
    const freeItem = document.createElement("li");
    freeItem.textContent = `${free.name} — FREE`;
    freeItem.classList.add("free");
    list.appendChild(freeItem);
  }
}

/* Listen AFTER DOM loads */
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("freeCourseSelect");

  if (select) {
    select.addEventListener("change", function () {
      freeCourseIndex = this.value === "" ? null : Number(this.value);
      updateCheckoutSummary();
    });
  }
});

/* OPEN PAYMENT MODAL */
function openPaymentModal(index) {
  paidCourseIndex = index;
  freeCourseIndex = null;

  const course = window.products[index];

  document.getElementById("ngnAmount").textContent = `₦${course.price}`;

  populateFreeCourses(index);
  updateCheckoutSummary();

  document.getElementById("paymentModal").classList.remove("hidden");
}
