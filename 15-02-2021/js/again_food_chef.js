var ingredient = [],
  qty = [],
  allrecord = [],
  cp = 0;
$(document).ready(function () {
  allrecord = JSON.parse(localStorage.getItem("food"));
  fileload();
  console.log("Form Ready ");

  //--------------------------------INGREDIENTS-ADDING-------------------------//
  $("#addingredients").click(function () {
    var Ingredient = $("#ingre").val(),
      Ingredientqty = $("#ingreqty").val();

    var obj = {
      gredient: Ingredient,
      gredientqty: Ingredientqty,
    };
    ingredient.push(obj);
    console.log(ingredient);

    $("#ingre").val("");
    $("#ingreqty").val("");
  });
  var x = "";
  //----------------------IMAGE-SELECT--------------------------------//

  $("#selectimage").change(function (event) {
    x = URL.createObjectURL(event.target.files[0]);
    console.log("path is iii" + x);
    // $('#doreimage1').attr("src",x);
    console.log(event);
  });
  //--------------------------SUBMIT-(ALL-RECORD-ADDING)------------------------//
  $("#submit").click(function () {
    var Dish = $("#dish").val(),
      Recipe = $("#recipe").val(),
      ImagePath = x;

    var alldata = {
      dish: Dish,
      recipe: Recipe,
      imagePath: ImagePath,
      ingredients: ingredient,
    };
    if (
      Dish != "" &&
      Recipe != "" &&
      ImagePath != "" &&
      ingredient.length != ""
    ) {
      var data = $("#dish").val();
      var patteren = /^[A-Za-z0-9-]+$/;
      var valid = patteren.test(data);
      if (valid) {
        allrecord.push(alldata);
        console.log(allrecord);
        localStorage.setItem("food", JSON.stringify(allrecord));

        $("#ingre").val("");
        $("#ingreqty").val("");
        $("#dish").val("");
        $("#recipe").val("");
        $("#selectimage").val("");
        ingredient = [];
        console.log("Now Array is : " + ingredient);
        fileload();
      } else {
        alert("special characters not allowed");
      }
    } else {
      alert("All Fields Required");
    }
  });

  var p = 1;
  //----------------------NEXT-DISH----------------------//
  $("#next").click(function () {
    cp = p;
    var tyu = "";
    var getdata = JSON.parse(localStorage.getItem("food"));
    if (p == getdata.length) {
      $("#next").prop("disabled", true);
    } else {
      $("#previous").prop("disabled", false);
      $("#namedish").html(getdata[p].dish);
      $("#path").html(getdata[p].imagePath);
      $("#dishrecipe").html(getdata[p].recipe);
      for (let i = 0; i < getdata[p].ingredients.length; i++) {
        tyu += `<li>${getdata[p].ingredients[i].gredient}&nbsp&nbsp&nbsp&nbsp${getdata[p].ingredients[i].gredientqty}&nbspgram</li>`;
      }
      $("#result").html(tyu);
      p++;
      console.log("PPPPPPPPPPPPPPPPPPPPPPPPP : " + p);
    }
  });

  //----------------PREVIOUS-PAGE--------------------------//
  $("#previous").click(function () {
    q = p - 1;
    var tyu = "";
    console.log(p);
    var getdata = JSON.parse(localStorage.getItem("food"));
    console.log("q is : " + q);
    cp = q;

    if (q == -1) {
      $("#previous").prop("disabled", true);
    } else {
      $("#next").prop("disabled", false);
      $("#namedish").html(getdata[q].dish);
      $("#path").html(getdata[q].imagePath);
      $("#dishrecipe").html(getdata[q].recipe);
      for (let i = 0; i < getdata[q].ingredients.length; i++) {
        tyu += `<li>${getdata[q].ingredients[i].gredient}&nbsp&nbsp&nbsp&nbsp${getdata[q].ingredients[i].gredientqty}&nbspgram</li>`;
      }
      $("#result").html(tyu);
      p--;
    }
  });

  //------------------------DELETING-DATA--------------------------//
  $("#delete").click(function () {
    var gettemp = JSON.parse(localStorage.getItem("food"));
    if (confirm("Are you sure to Delete this Detail ?")) {
      gettemp.splice(cp, 1);
      console.log("cp is : " + cp);
      localStorage.setItem("food", JSON.stringify(gettemp));
      if (gettemp.length == "") {
        // $("#tabldiv").hide();
      }
    }
    showal();
    fileload();
  });

  var temparr = [];

  // $('#addingre').click(function()
  // {
  // 	var temp = JSON.parse(localStorage.getItem("food"));
  // 	temparr = temp[cp].ingredients;
  // 	console.log(temparr);
  // })
  //--------------------------------UPDATING-DATA-------------------------//
  $("#update").click(function () {
    var temp = JSON.parse(localStorage.getItem("food"));
    var Ingredient = $("#ingre").val(),
      Ingredientqty = $("#ingreqty").val();

    var obj = {
      gredient: Ingredient,
      gredientqty: Ingredientqty,
    };
    temparr.push(obj);
    temp[cp].dish = $("#dish").val();
    temp[cp].ingredients.push(obj);
    localStorage.setItem("food", JSON.stringify(temp));
    showal();
    $("#ingre").val("");
    $("#ingreqty").val("");
    $("#dish").val("");
    $("#recipe").val("");
    $("#selectimage").val("");
    fileload();
    $("#edit1").show();
    $("#update").hide();
    $("#cancel").hide();
    $("#submit").show();
  });
});
$("#allrecord").click(function () {
  $("#tabldiv").toggle();
});
//--------------------------------ALL-DATA-------------------------//
function showal() {
  //   $("#tabldiv").show();
  var tyu = "";
  var getdata = JSON.parse(localStorage.getItem("food"));

  if (getdata.length == "") {
    alert("No Dish Found");
    $("#namedish").html("");
    $("#dishrecipe").html("");
    $("#displayimage").html("");
    $("#result").html("");
  } else {
    // $("#tabldiv").toggle();

    $("#namedish").html(getdata[0].dish);
    $("#path").html(getdata[0].imagePath);
    $("#dishrecipe").html(getdata[0].recipe);
    for (let i = 0; i < getdata[0].ingredients.length; i++) {
      tyu += `<li>${getdata[0].ingredients[i].gredient}&nbsp&nbsp&nbsp&nbsp${getdata[0].ingredients[i].gredientqty}&nbspgram</li>`;
    }
    $("#result").html(tyu);
  }
}

//------------------Today's Menu---------------------//

function fileload() {
  var loc = JSON.parse(localStorage.getItem("food"));
  var data = $("#availabledishs");
  var trow = "";
  for (let i = 0; i < loc.length; i++) {
    trow += `<li>${loc[i].dish}</li>`;
  }
  data.html(trow);
}
//-------------------SEARCH-----------------------//
$("#search").click(function () {
  var srdata = JSON.parse(localStorage.getItem("food"));
  var valo = $("#btn1").val(),
    tyu = "";
  if (valo == "") {
    alert("Name is Required ");
  } else {
    for (let x in srdata) {
      if (srdata[x].dish == valo) {
        cp = x;
        $("#namedish").html(srdata[x].dish);
        $("#path").html(srdata[x].imagePath);
        $("#dishrecipe").html(srdata[x].recipe);
        for (let i = 0; i < srdata[x].ingredients.length; i++) {
          tyu += `<li>${srdata[x].ingredients[i].gredient}&nbsp&nbsp&nbsp&nbsp${srdata[x].ingredients[i].gredientqty}&nbspgram</li>`;
        }
        $("#result").html(tyu);
      }
    }
  }
});
//-----------------------Edit-------------------------//
$("#edit1").click(function () {
  var temp = JSON.parse(localStorage.getItem("food"));
  var l = temp[cp].ingredients.length;
  console.log(
    "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj : " + l
  );
  $("#addingredients").hide();
  $("#submit").hide();
  $("#edit1").hide();
  $("#update").show();
  $("#cancel").show();

  $("#dish").val(temp[cp].dish);
  $("#ingre").val(temp[cp].ingredients[l - 1].gredient);
  $("#ingreqty").val(temp[cp].ingredients[l - 1].gredientqty);
  $("#recipe").val(temp[cp].recipe);
  // $("#selectimage").val(temp[cp].imagePath);
});
$("#cancel").click(function () {
  $("#edit1").show();
  $("#update").hide();
  $("#cancel").hide();
  $("#addingredients").show();
  $("#submit").show();
});
//-------------------ON-SEARCH-BAR-FUNCTIONALITY----------------------------//
function serchbar() {
  var srdata = JSON.parse(localStorage.getItem("food"));
  var valo = $("#btn1").val(),
    tyu = "";
  for (let x in srdata) {
    if (srdata[x].dish == valo) {
      cp = x;
      $("#namedish").html(srdata[x].dish);
      $("#path").html(srdata[x].imagePath);
      $("#dishrecipe").html(srdata[x].recipe);
      for (let i = 0; i < srdata[x].ingredients.length; i++) {
        tyu += `<li>${srdata[x].ingredients[i].gredient}&nbsp&nbsp&nbsp&nbsp${srdata[x].ingredients[i].gredientqty}&nbspgram</li>`;
      }
      $("#result").html(tyu);
    }
  }
}
