var arrayis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var array1 = [],
  array2 = [];
$(document).ready(function () {
  $("#demo").html(arrayis.join(","));

  // var d = $("#text1").val();
  // function sort(a, b)
  // {
  //     if (d % 2 == 0)
  //     {
  //         return a - b;
  //     }
  //     else
  //     {

  //     }
  // }
  // array2.sort1();
  // array1.sort();

  // $("#result").html(array2 + "," + array1);
  helo();
});
function helo() {
  for (let i = 0; i < arrayis.length; i++) {
    if (arrayis[i] % 2 == 0) {
      array1.push(arrayis[i]);
      console.log("condition");
      console.log(array1);
    } else {
      array2.push(arrayis[i]);
      console.log(array2);
    }
  }
  //   dis();
}

function sort(a, b) {
  return a - b;
}
function numsort(a, b) {
  return b - a;
}
// function sort(a, b) {
//   return a - b;
// }

$("#sort").click(function () {
//   array1.sort();
  array2.sort();

  $("#result").html(array2 + "," + array1);
});
