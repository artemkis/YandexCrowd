function debounce(callee, timeout) {
  let lastCallTimer;

  return function perform(...args) {
    const context = this;
    if (lastCallTimer) {
      clearTimeout(lastCallTimer);
    }

    lastCallTimer = setTimeout(() => {
      callee.apply(context, args);
    }, timeout);
  } 
}