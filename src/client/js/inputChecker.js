function checkInput(input1, input2) {
  const inputValue1 = input1.trim();
  const inputValue2 = input2.trim();
  if (inputValue1 === "" || inputValue2 === "") {
    document.getElementById("error").innerHTML =
      "Please enter all input field before submitting!";
    return false;
  } else {
    document.getElementById("error").innerHTML = "";
    return true;
  }
}

function checkValidDate(inputDate) {
  const currentDate = new Date().toISOString().split("T")[0];
  const inputDateObject = new Date(inputDate);
  const currentDateObject = new Date(currentDate);
  const dayDifference = Math.ceil(
    (inputDateObject - currentDateObject) / (1000 * 60 * 60 * 24)
  );
  if (dayDifference > 13) {
    document.getElementById("error").innerHTML =
      "The date input limit is 14 days later, excluding the current time.";
    return false;
  } else if (dayDifference < 0) {
    document.getElementById("error").innerHTML =
      "The travel date input must be a time after the current date.";

    return false;
  } else {
    document.getElementById("error").innerHTML = "";
    return true;
  }
}

export { checkInput, checkValidDate };
