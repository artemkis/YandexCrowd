function createCarousel(containerSelector) {
  const container = document.querySelector(containerSelector);
  const participantsList = container.querySelector('.participants__list');
  const prevButton = container.querySelector('.participants__prev-btn');
  const nextButton = container.querySelector('.participants__next-btn');
  const participants = container.querySelectorAll('.participant');
  const participantsLength = participants.length;
  const participant = container.querySelector('.participant');
  const currentParticipants = container.querySelector('.participants__current-items');
  const countParticipants = container.querySelector('.participants__count-items');

  let currentIndex = 0;
  let visibleItems = calculateVisibleParticipants(participantsList.offsetWidth, participant.offsetWidth);
  let autoSlideTimeout;

  // Автоматическая смена слайдов
  function autoSlide(initialDelay = 0) {
    clearTimeout(autoSlideTimeout);
    autoSlideTimeout = setTimeout(() => {
      if (currentIndex + visibleItems < participantsLength) {
        currentIndex += visibleItems;
      } else {
        currentIndex = 0;
      }
      updateUI();
      autoSlide(4000);
    }, initialDelay);
  }

  // Обновление интерфейса
  function updateUI() {
    countParticipants.textContent = participantsLength.toString();
    moveParticipantsList();
    updateButtonState();
    updateIndicator();
  }

  // Смещение списка участников
  function moveParticipantsList() {
    currentIndex = Math.min(currentIndex, participantsLength - visibleItems);
    const offset = currentIndex * (participant.offsetWidth + (window.innerWidth > 1350 ? 20 : 0));
    participantsList.style.transform = `translateX(-${offset}px)`;
  }

  // Упрвление кнопкой вперед
  function handleClickNext() {
    clearTimeout(autoSlideTimeout);
    if (currentIndex + visibleItems < participantsLength) {
      currentIndex += visibleItems;
    }
    updateUI();
    autoSlide(4000);
  }

  // Управление кнопкой назад
  function handleClickPrev() {
    clearTimeout(autoSlideTimeout);
    currentIndex = Math.max(0, currentIndex - visibleItems);
    updateUI();
    autoSlide(4000);
  }

  // Расчет кол-ва элементов видимых в карусели
  function calculateVisibleParticipants(containerWidth, itemWidth) {
    const tolerance = 0.05;
    const exactCount = containerWidth / itemWidth;
    const roundedCount = Math.floor(exactCount);
    const fraction = exactCount - roundedCount;
    return (1 - fraction <= tolerance) ? roundedCount + 1 : roundedCount;
  }

  // Обновление индикатора текущего положения
  function updateIndicator() {
    const endIndex = Math.min(currentIndex + visibleItems, participantsLength);
    currentParticipants.textContent = endIndex.toString();
  }

  // Обновление активности кнопок
  function updateButtonState() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === participantsLength - visibleItems;
  }

  nextButton.addEventListener('click', handleClickNext);
  prevButton.addEventListener('click', handleClickPrev);

  window.addEventListener('resize', debounce(() => {
    visibleItems = calculateVisibleParticipants(participantsList.offsetWidth, participant.offsetWidth);
    if (currentIndex > participantsLength - visibleItems) {
      currentIndex = Math.max(0, participantsLength - visibleItems);
    }
    updateUI();
    autoSlide(4000);
  }, 150));

  updateUI();
  autoSlide(4000);
}

document.addEventListener('DOMContentLoaded', function () {
  createCarousel('.carousel');
});
