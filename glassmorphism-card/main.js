let card = document.querySelector('.box');

card.addEventListener('mouseenter', function (e) {
    card.style.transition = 'none';
});

card.addEventListener('mousemove', function (e) {
    let centerXofCard = card.offsetLeft + card.offsetWidth / 2;
    let centerYofCard = card.offsetTop + card.offsetHeight / 2;

    let xAxis = (centerXofCard - e.pageX) / 20;
    let yAxis = (centerYofCard - e.pageY) / 20;
    card.style.transform = `rotateX(${-yAxis}deg) rotateY(${xAxis}deg)`;
});

card.addEventListener('mouseleave', function (e) {
    card.style.transition = 'transform 300ms ease';
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
});


