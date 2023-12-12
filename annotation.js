const annotationListener = (e) => {
  e.preventDefault();
  const highlightColor = document.querySelector(
    '[name="annotation-color"]:checked',
  ).value;
  if (e.target.tagName === "SPAN") {
    e.target.classList.toggle(`highlighted-${highlightColor}`);
  }
};
