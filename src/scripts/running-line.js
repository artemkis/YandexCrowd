document.fonts.load('1em "Merriweather"').then(function () {

  const runningLineContainers = document.querySelectorAll('.running-line__container');

  runningLineContainers.forEach((container) => {
    const clonedContainer = container.cloneNode(true);
    const parentSection = container.parentElement;
    parentSection.appendChild(clonedContainer);
  })

  document.querySelectorAll('.running-line__container').forEach(container => {
    container.classList.add('running-line__animated');
  });
});