var elCounter = 0;
var selectedEl = "none";
var elemType = "";
const ident = "_";
var editor;
var codeGenerator;

const aceOptions = {
  maxLines: Infinity
};

$(document).ready(function () {
  editor = ace.edit("elemHtmlEditor");
  editor.setTheme("ace/theme/chrome");
  editor.getSession().setMode("ace/mode/html");
  editor.setOptions(aceOptions);
  codeGenerator = ace.edit("codeGeneretorModalEditor");
  codeGenerator.setTheme("ace/theme/chrome");
  codeGenerator.getSession().setMode("ace/mode/html");
  codeGenerator.setOptions(aceOptions);
});

function updateElemList() {
  const elems = $("[id^='" + ident + "']");
  if (elems) {
    $("#elemListCollectionContainer").html("");
    for (let index = 0; index < elems.length; index++) {
      $("<a>", {
        class: "collection-item",
        href: "#!",
        text: elems[index].id.substring(1),
        onclick: "selectEl(this.text)"
      }).appendTo("#elemListCollectionContainer");
    }
  }
}

function applyHtml() {
  $("#" + selectedEl)[0].outerHTML = editor.getValue();
}

function editHtml() {
  if (selectedEl == "none") {
    toast("Select element first!");
    return;
  }
  editor.setValue($("#" + selectedEl)[0].outerHTML);
  $("#htmlEditModal").modal("open");
}

function move(dir) {
  if (selectedEl == "none") {
    toast("Select Element!");
    return;
  } else {
    const id = "#" + selectedEl;
    if (dir) {
      log("move up " + id);
      $(id).moveUp();
    } else {
      $(id).moveDown();
      log("move down " + id);
    }
  }
}

function openProjectConf() {
  $("#containerCheckbox").prop("cheked", $("#containerDiv").hasClass("container"));
  $("#containerCheckbox").prop("cheked", $("#containerDiv").hasClass("center"));
  $("#projectConfModal").modal("open");
}

function generateCode() {
  codeGenerator.setValue($("#developContainer")[0].outerHTML);
  $("#codeGeneretorModal").modal("open");
}

function applyProjectConfig() {

  if ($("#containerCheckbox").is(':checked')) {
    $("#enableContainerDiv").addClass("container");
  } else {
    $("#enableContainerDiv").removeClass("container");
  }

  if ($("#centerAllCheckbox").is(':checked')) {
    $("#enableContainerDiv").addClass("center");
  } else {
    $("#enableContainerDiv").removeClass("center");
  }
}

function selectEl(id) {
  const localId = ident + id;
  const br = "border";
  if (!$("#" + localId).attr("selected")) {
    log("selectEl: " + localId);
    $("#" + localId).css(br, "1px dashed red");
    $("#" + selectedEl).css(br, "");
    $("#" + selectedEl).removeAttr("selected");
    selectedEl = localId;
    $("#" + localId).attr("selected", true);
  } else {
    $("#" + localId).css(br, "");
    selectedEl = "none";
    $("#" + localId).removeAttr("selected");
    log("unselectEl: " + localId);
  }
  $("#selectedEl").text("Selected: " + (selectedEl == "none" ? selectedEl : selectedEl.substr(1)));
}

function removeElement() {
  $("#" + selectedEl).remove();
  log("removing " + selectedEl);
  selectedEl = "none";
  updateElemList();
}

function modalAddInput(type, id, classs, dist, val) {
  if (val) {
    $("<input>", {
      type: type,
      id: id,
      class: classs,
      style: "color: white",
      val: val
    }).appendTo(dist);
  } else {
    $("<input>", {
      type: type,
      id: id,
      class: classs,
      style: "color: white"
    }).appendTo(dist);
  }
}

function modalAddText(text, classs, dist, id) {
  if (id) {
    $("<p>", {
      text: text,
      class: classs,
      id: id
    }).appendTo(dist);
  } else {
    $("<p>", {
      text: text,
      class: classs
    }).appendTo(dist);
  }
}

function modalAddHelp(text, dist, href) {
  $("#helpBtn").remove();
  $("<a>", {
    id: "helpBtn",
    href: href,
    text: text,
    class: "waves-effect waves-green btn-flat left",
    target: "_blank"
  }).appendTo(dist);
}

function elemSetupBuilder(type) {
  const dist = "#addElemModalContainer";
  const help = "#addElemModalHelp";
  const s6 = "col s6";
  const text = "text";
  const idText = "Set ID:";
  const classText = "Set class:";
  elemType = type;
  $(dist).html("");
  $("<h4>", {
    text: "Element setup",
    class: "col s12"
  }).appendTo(dist);
  switch (type) {
    case "div":
      modalAddText("Set text:", s6, dist);
      modalAddInput(text, "addElemText", s6, dist);
      modalAddText(idText, s6, dist);
      modalAddInput(text, "addElemId", s6, dist, type + elCounter);
      modalAddText(classText, s6, dist);
      modalAddInput(text, "addElemClass", s6, dist, s6);
      break;
    case "Text":
      modalAddText("Set text:", s6, dist);
      modalAddInput(text, "addElemText", s6, dist, type + elCounter);
      modalAddText(idText, s6, dist);
      modalAddInput(text, "addElemId", s6, dist, type + elCounter);
      modalAddText(classText, s6, dist);
      modalAddInput(text, "addElemClass", s6, dist, s6);
      break;
    case "TextInput":
      modalAddHelp(type + " reference", help, "https://materializecss.com/text-inputs.html");
      modalAddText(type + " text:", s6, dist);
      modalAddInput(text, "addTextInputText", s6, dist, type + elCounter);
      modalAddText(idText, s6, dist);
      modalAddInput(text, "addElemId", s6, dist, type + elCounter);
      modalAddText(classText, s6, dist);
      modalAddInput(text, "addElemClass", s6, dist, s6);
      break;
    case "Button":
      modalAddHelp(type + " reference", help, "https://materializecss.com/buttons.html");
      modalAddText(type + " text:", s6, dist);
      modalAddInput(text, "addBtnText", s6, dist, type + elCounter);
      modalAddText(idText, s6, dist);
      modalAddInput(text, "addElemId", s6, dist, type + elCounter);
      modalAddText(classText, s6, dist);
      modalAddInput(text, "addElemClass", s6, dist, s6 + " waves-effect waves-light btn");
      break;
    case "Checkbox":
      modalAddHelp(type + " reference", help, "https://materializecss.com/checkboxes.html");
      modalAddText(type + " text:", s6, dist);
      modalAddInput(text, "addCheckboxText", s6, dist, type + elCounter);
      modalAddText(idText, s6, dist);
      modalAddInput(text, "addElemId", s6, dist, type + elCounter);
      modalAddText(classText, s6, dist);
      modalAddInput(text, "addElemClass", s6, dist, s6);
      break;

    default:
      break;
  }
  $("#addElemModal").modal("open");
}

function addElement() {
  var id = $("#addElemId").val();
  var classs = $("#addElemClass").val();
  const dist = "#insideDevelopContainer";
  switch (elemType) {
    case "div":
      $("<div>", {
        id: ident + id,
        text: $("#addElemText").val(),
        class: classs,
        "css": {
          "height": "24px"
        }
      }).appendTo(dist);
      elCounter++;
      break;
    case "Text":

      $("<p>", {
        id: ident + id,
        text: $("#addElemText").val(),
        class: classs

      }).appendTo(dist);
      elCounter++;
      break;
    case "TextInput":
      $("<input>", {
        id: ident + id,
        type: "text",
        val: $("#addTextInputText").val(),
        class: classs,
        style: "color: white"

      }).appendTo(dist);
      elCounter++;
      break;
    case "Button":
      $("<a>", {
        id: ident + id,
        text: $("#addBtnText").val(),
        class: classs
      }).appendTo(dist);
      elCounter++;
      break;
    case "Checkbox":
      $("<p>", {
        id: ident + id,
        class: classs,
        append: $("<label>").append($("<input>", {
          type: "checkbox"
        }),
          $("<span>", {
            text: $("#addCheckboxText").val()
          })
        )
      }).appendTo(dist);
      elCounter++;
      break;

    case "Switch":

      break;

    default:
      break;
  }
  $("#addElemModalContainer").html("");
  updateElemList();
}

