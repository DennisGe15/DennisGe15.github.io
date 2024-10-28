document.addEventListener("DOMContentLoaded", function () {
    const timelineContainer = document.getElementById("timeline-1");
    const timelineItems =
      timelineContainer.querySelectorAll(".timeline-item");
    const activeClass = "timeline-item--active";
    const firstImage = timelineItems[0].querySelector(".timeline__img").src;
    const bottomBtn = document.getElementById("bottom-btn");
    let currentIndex = 0; // Track the current active index

    // Set initial background and active class
    timelineItems[0].classList.add(activeClass);
    timelineContainer.style.backgroundImage = `url(${firstImage})`;

    // Scroll behavior to change background image based on scroll position
    window.addEventListener("scroll", function () {
      const pos = window.scrollY;

      // Iterate through each timeline item to determine the active one
      timelineItems.forEach((item, index) => {
        const min = item.offsetTop;
        const max = min + item.offsetHeight;

        if (pos >= min && pos < max) {
          const imgSrc = item.querySelector(".timeline__img").src;
          timelineContainer.style.backgroundImage = `url(${imgSrc})`;

          // Update the active class for the current timeline item
          timelineItems.forEach((i) => i.classList.remove(activeClass));
          item.classList.add(activeClass);
          currentIndex = index; // Update the current active index
        }

        // Handle case when scrolled past the last timeline item
        if (index === timelineItems.length - 1 && pos >= min) {
          const imgSrc = item.querySelector(".timeline__img").src;
          timelineContainer.style.backgroundImage = `url(${imgSrc})`;
          timelineItems.forEach((i) => i.classList.remove(activeClass));
          item.classList.add(activeClass);
          currentIndex = index; // Update the current active index
        }
      });

      console.log("currentIndex:", currentIndex);
    });

    // Scroll to the next timeline item when bottom button is clicked
    bottomBtn.addEventListener("click", function () {
      if (currentIndex < timelineItems.length - 1) {
        const nextItem = timelineItems[currentIndex + 1];
        window.scrollTo({
          top: nextItem.offsetTop + 160,
          behavior: "smooth",
        });
      }
    });
  });