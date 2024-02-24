var form = document.getElementById("myForm");
function handleForm(event) {
  event.preventDefault();
}

form.addEventListener("submit", handleForm);

function limitText(limitField, limitNum) {
  if (limitField.value.length > limitNum) {
    limitField.value = limitField.value.substring(0, limitNum);
  }
}
function isValidYear(yr) {
  const today = new Date();
  var currentYear = document.getElementById("cc-year");
  if (currentYear.value > today.getFullYear())
    yrValidation.innerHTML = "Year cannot be greater than current year";
}
function CalculateAge() {
  var day = document.getElementById("cc-day").value;
  var month = document.getElementById("cc-month").value;
  var year = document.getElementById("cc-year").value;
  var isValidDate = false;
  const today = new Date();

  day = day.length < 2 ? "0" + day : day;
  month = month.length < 2 ? "0" + month : month;

  isValidDate = !(year.length == 4 && year < today.getFullYear() && year > 1910)
    ? false
    : true;
  var isLeapYr =
    year % 4 == 0 || (year % 100 == 0 && year % 400 == 0) ? true : false;
  if (isValidDate) {
    switch (month) {
      case "01":
      case "03":
      case "05":
      case "07":
      case "08":
      case "10":
      case "12":
        {
          isValidDate = true;
        }
        break;

      case "02":
        {
          if (isLeapYr && day <= 29) isValidDate = true;
          else if (!isLeapYr && day <= 28) isValidDate = true;
          else isValidDate = false;
        }
        break;
      case "04":
      case "06":
      case "09":
      case "11":
        {
          if (day <= 30) isValidDate = true;
        }
        break;
      default: {
        isValidDate = false;
      }
    }
  }

  isValidDate == true
    ? computeAge(day, month, year, today)
    : (document.getElementById("AgeInfo").innerHTML = "Invalid Date!");
}
function computeAge(day, month, year, today) {
  debugger;
  var date = new Date(month + "/" + day + "/" + year);
  console.log(date);
  /*    
    var diff = Math.floor(today.getTime() - date.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff/day);
    var months = Math.floor(days/31);
    var years = Math.floor(months/12);

    var message = date.toDateString();
    message += " was "
    message += days + " days " 
    message += months + " months "
    message += years + " years ago \n"

    document.getElementById("AgeInfo").innerHTML= message;
    console.log(message);
 */

  //convert to UTC
  var date2_UTC = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );
  var date1_UTC = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );

  var yAppendix, mAppendix, dAppendix;

  //--------------------------------------------------------------
  var days = date2_UTC.getDate() - date1_UTC.getDate();
  if (days < 0) {
    date2_UTC.setMonth(date2_UTC.getMonth() - 1);
    days += DaysInMonth(date2_UTC);
  }
  //--------------------------------------------------------------
  var months = date2_UTC.getMonth() - date1_UTC.getMonth();
  if (months < 0) {
    date2_UTC.setFullYear(date2_UTC.getFullYear() - 1);
    months += 12;
  }
  //--------------------------------------------------------------
  var years = date2_UTC.getFullYear() - date1_UTC.getFullYear();

  if (years > 1) yAppendix = " years";
  else yAppendix = " year";
  if (months > 1) mAppendix = " months";
  else mAppendix = " month";
  if (days > 1) dAppendix = " days";
  else dAppendix = " day";

  document.getElementById("year").innerHTML = years;
  document.getElementById("mnth").innerHTML = months;
  document.getElementById("days").innerHTML = days;
}

function DaysInMonth(date2_UTC) {
  var monthStart = new Date(date2_UTC.getFullYear(), date2_UTC.getMonth(), 1);
  var monthEnd = new Date(date2_UTC.getFullYear(), date2_UTC.getMonth() + 1, 1);
  var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
  return monthLength;
}
