function animateValue(id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = 1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);

    let timer = setInterval(function () {
        current += increment;
        obj.innerHTML = current;
        if (current >= end) {
            clearInterval(timer);
        }
    }, stepTime);
}

animateValue("totalStudents", 0, 120, 1000);