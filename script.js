const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const shareButtons = document.querySelectorAll(".share-button");

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

shareButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const url = button.dataset.shareUrl || window.location.href;
    const title = button.dataset.shareTitle || document.title;
    const originalText = button.textContent;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await copyToClipboard(url);
      }
      button.textContent = "已复制链接";
    } catch (error) {
      await copyToClipboard(url);
      button.textContent = "已复制链接";
    }

    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1800);
  });
});
