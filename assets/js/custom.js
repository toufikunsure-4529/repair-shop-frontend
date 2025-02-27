$(document).ready(function () {
  $("#hero-slider").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    nav: false,
    dots: true,
    animateOut: "fadeOut",
    dotsEach: true,
    autoplayHoverPause: true,
  });
  $("#testimonial-slider").owlCarousel({
    autoplayHoverPause: true,
    autoplaySpeed: 2000,
    autoplay: true,
    loop: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
        dots: false,
      },
      600: {
        items: 2,
        dots: false,
      },
      1100: {
        items: 3,
        dots: true,
      },
    },
  });

  $(".brand-slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    autoplayHoverPause: true,
    smartSpeed: 5000,
    slideTransition: "ease-in-out",
    responsive: {
      0: { items: 3 },
      480: { items: 4 },
      768: { items: 5 },
      1000: { items: 8 },
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".number");
  let started = false; // To ensure the counter starts only once

  const startCounter = (entry) => {
    if (entry.isIntersecting && !started) {
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-number");
        let count = 0;
        const increment = target / 200; // Adjust for speed

        const updateCounter = () => {
          count += increment;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
          }
        };

        updateCounter();
      });
      started = true;
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => startCounter(entry));
    },
    { threshold: 0.5 }
  ); // Starts when 50% of the section is visible

  const counterSection = document.getElementById("section-counter");
  observer.observe(counterSection);
});

// Repair service
document.addEventListener("DOMContentLoaded", function () {
  // Add to cart functionality
  document.querySelectorAll(".btn-add").forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".repair-checkout-card");
      const serviceName = card.querySelector("h3").textContent;
      const price = card.querySelector(".current-price").textContent;

      // Toggle active state
      this.classList.toggle("active");
      if (this.classList.contains("active")) {
        this.textContent = "Remove";
        this.style.backgroundColor = "#28a745";
      } else {
        this.textContent = "Add";
        this.style.backgroundColor = "#e31837";
      }

      // Update total amount
      updateTotalAmount();
    });
  });

  // Coupon application
  const applyCouponBtn = document.querySelector(".btn-apply");
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", function () {
      const couponInput = document.querySelector(".coupon-section input");
      const couponCode = couponInput.value.trim();

      if (couponCode) {
        alert("Coupon applied successfully!");
        couponInput.value = "";
      } else {
        alert("Please enter a valid coupon code");
      }
    });
  }

  // Function to update total amount
  function updateTotalAmount() {
    const activeServices = document.querySelectorAll(".btn-add.active");
    let total = 0;

    activeServices.forEach((service) => {
      const price = service
        .closest(".repair-checkout-card")
        .querySelector(".current-price")
        .textContent.replace("₹", "")
        .replace(",", "");
      total += parseFloat(price);
    });

    document.querySelector(
      ".total-amount span:last-child"
    ).textContent = `₹${total.toFixed(2)}`;
  }

  // Book Repair button
  const bookRepairBtn = document.querySelector(".btn-book-repair");
  if (bookRepairBtn) {
    bookRepairBtn.addEventListener("click", function () {
      const total = document.querySelector(
        ".total-amount span:last-child"
      ).textContent;
      if (total === "₹0.00") {
        alert("Please select at least one repair service");
      } else {
        alert("Thank you for booking! Our team will contact you shortly.");
      }
    });
  }
});

// Login With otp
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload

      let mobileNumber = document.getElementById("mobileNumber").value;

      if (mobileNumber.length === 10) {
        // Switch to OTP screen
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("otpSection").style.display = "block";
        alert("OTP sent to " + mobileNumber);
      } else {
        alert("Please enter a valid 10-digit mobile number.");
      }
    });

  document
    .getElementById("otpForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload

      let otp = document.getElementById("otpInput").value;

      if (otp.length === 6) {
        alert("OTP Verified! Logging in...");
        // Add redirection logic here if needed
      } else {
        alert("Invalid OTP. Please try again.");
      }
    });
});

// Sticky Nav
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("ftco-navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });
});
