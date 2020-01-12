const socket = io(window.location.hostname + ':' + 3000);

const sliders = document.getElementsByClassName('slider');

[...sliders].forEach(slider => {
  slider.addEventListener('change', () => {
    const value = slider.value;
    socket.emit(`${slider.id} led brightness value`, value);
  });
});
