const username = document.getElementById("username");
const password = document.getElementById("password");
const alertMessage = document.getElementsByClassName("alert-message");
const alertElement = document.getElementsByClassName("alert");
const loginButton = document.getElementById("submit");
const alertClose = document.getElementById("alert-close");

const timerContainer = document.getElementById("timer-container");
const timerSecond = document.getElementById("timer-second");
const timerMinute = document.getElementById("timer-minute");
const timerHour = document.getElementById("timer-hour");
const timerDay = document.getElementById("timer-day");

let invalidPasswordCount = 0;

function validateUsername(username) {
  if (username.length < 5 || username.length > 20) {
    return {
      verdict: false,
      message:
        "Username should be atleast 5 characters and atmost 20 characters",
    };
  } else if (username[0] >= "0" && username[0] <= "9") {
    return {
      verdict: false,
      message: "Username should not start with a number",
    };
  } else {
    return {
      verdict: true,
      message: "Valid username",
    };
  }
}

function validatePassword(password) {
  if (password.length < 8) {
    return {
      verdict: false,
      message: "Password must be of atleast 8 characters",
    };
  } else if (!/\d/.test(password)) {
    return {
      verdict: false,
      message: "Password must contain numeric values",
    };
  } else if (!/[A-Z]/.test(password)) {
    return {
      verdict: "false",
      message: "Password must contain atleast 1 uppercase letter",
    };
  } else {
    return {
      verdict: true,
      message: "Valid password",
    };
  }
}

const user = {
  username: "manishsencha",
  password: "Testingapplication@123",
};

function login(event) {
  event.preventDefault();

  const usernameStatus = validateUsername(username.value);

  if (!usernameStatus.verdict) {
    if (alertElement[0].classList.contains("d-none")) {
      alertElement[0].classList.remove("d-none");
    }

    if (!alertElement[0].classList.contains("alert-danger")) {
      alertElement[0].classList.add("alert-danger");
    }

    if (alertElement[0].classList.contains("alert-success")) {
      alertElement[0].classList.remove("alert-success");
    }

    alertMessage[0].innerHTML = usernameStatus.message;

    return;
  }

  const passwordStatus = validatePassword(password.value);

  if (!passwordStatus.verdict) {
    if (alertElement[0].classList.contains("d-none")) {
      alertElement[0].classList.remove("d-none");
    }

    if (!alertElement[0].classList.contains("alert-danger")) {
      alertElement[0].classList.add("alert-danger");
    }

    if (alertElement[0].classList.contains("alert-success")) {
      alertElement[0].classList.remove("alert-success");
    }

    alertMessage[0].innerHTML = passwordStatus.message;

    return;
  }

  if (username.value == user.username) {
    if (password.value == user.password) {
      if (alertElement[0].classList.contains("d-none")) {
        alertElement[0].classList.remove("d-none");
      }

      if (alertElement[0].classList.contains("alert-danger")) {
        alertElement[0].classList.remove("alert-danger");
      }

      if (!alertElement[0].classList.contains("alert-success")) {
        alertElement[0].classList.add("alert-success");
      }
      alertMessage[0].innerHTML = "Login Success!!";
      return;
    } else {
      invalidPasswordCount++;

      if (alertElement[0].classList.contains("d-none")) {
        alertElement[0].classList.remove("d-none");
      }

      if (!alertElement[0].classList.contains("alert-danger")) {
        alertElement[0].classList.add("alert-danger");
      }

      if (alertElement[0].classList.contains("alert-success")) {
        alertElement[0].classList.remove("alert-success");
      }

      alertMessage[0].innerHTML = "Please enter valid password";

      if (invalidPasswordCount == 3) {
        invalidPasswordCount = 0;
        startTimer(new Date().getTime() + 300000);
      }

      return;
    }
  } else {
    if (alertElement[0].classList.contains("d-none")) {
      alertElement[0].classList.remove("d-none");
    }

    if (!alertElement[0].classList.contains("alert-danger")) {
      alertElement[0].classList.add("alert-danger");
    }

    if (alertElement[0].classList.contains("alert-success")) {
      alertElement[0].classList.remove("alert-success");
    }

    alertMessage[0].innerHTML = "Please enter valid username";

    return;
  }
}

var timer;

function startTimer(endTime) {
  localStorage.setItem("timer-webt", endTime);

  loginButton.toggleAttribute("disabled");

  timerContainer.classList.remove("d-none");

  timer = setInterval(() => {
    let timeleft = endTime - new Date().getTime();

    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    timerDay.innerHTML = days + " days";
    timerHour.innerHTML = hours + " hours";
    timerMinute.innerHTML = minutes + " minutes";
    timerSecond.innerHTML = seconds + " seconds";

    if (timeleft <= 0) {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  loginButton.toggleAttribute("disabled");

  timerContainer.classList.add("d-none");

  clearInterval(timer);
}

function initTimer() {
  let endTime = new Date().getTime() + 300000;
  let prevTimer = localStorage.getItem("timer-webt");
  if (prevTimer) {
    if (new Date().getTime() > prevTimer) {
      return;
    } else {
      endTime = prevTimer;
    }
    startTimer(endTime);
  }
}

initTimer();

alertClose.addEventListener("click", (e) => {
  alertElement[0].classList.add("d-none");
});
