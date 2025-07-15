document.addEventListener("DOMContentLoaded", () => {
  restoreState();
  checkLocks();
});

function toggle(subject) {
  if (subject.classList.contains("approved")) {
    subject.classList.remove("approved");
  } else {
    subject.classList.add("approved");
  }
  saveState();
  checkLocks();
}

function checkLocks() {
  document.querySelectorAll(".subject").forEach(subject => {
    const prereqs = subject.dataset.prereq;
    if (!prereqs) return;

    const required = JSON.parse(prereqs);
    const allMet = required.every(id =>
      document.querySelector(`[data-id='${id}']`)?.classList.contains("approved")
    );

    if (allMet) {
      subject.classList.remove("locked");
      subject.onclick = () => toggle(subject);
    } else {
      subject.classList.add("locked");
      subject.onclick = null;
    }
  });
}

function saveState() {
  const states = {};
  document.querySelectorAll(".subject").forEach(subj => {
    states[subj.dataset.id] = subj.classList.contains("approved");
  });
  localStorage.setItem("mallaEstado", JSON.stringify(states));
}

function restoreState() {
  const saved = JSON.parse(localStorage.getItem("mallaEstado")) || {};
  document.querySelectorAll(".subject").forEach(subj => {
    if (saved[subj.dataset.id]) {
      subj.classList.add("approved");
    }
  });
}
