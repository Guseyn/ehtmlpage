document.addEventListener("click", (e) => {
  // Detect click on pre::before
  const pre = e.target.closest("pre")
  if (!pre) {
    return
  }

  // Check if click is near right corner (i.e., on the pseudo-element)
  const rect = pre.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const clickY = e.clientY - rect.top

  // Match the pseudo-element dimensions (top-right corner)
  if (clickX < rect.width - 70 || clickY > 40) {
    return
  }

  // Get the code text
  const code =
    pre.querySelector("code")?.innerText ||
    pre.innerText

  navigator.clipboard.writeText(code).then(() => {
    // Temporary feedback
    const original = getComputedStyle(pre, "::before").content
    pre.style.setProperty("--copy-label", '"Copied!"')
    pre.classList.add("copied")

    setTimeout(() => {
      pre.style.removeProperty("--copy-label")
      pre.classList.remove("copied")
    }, 1000)
  });
});
