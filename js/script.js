var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submit = document.getElementById("submit");

submit.onclick = addUrl;
var bookMarkList;
var currentIndex;
var search = document.getElementById("search");

if (localStorage.getItem("URL") !== null) {
  bookMarkList = JSON.parse(localStorage.getItem("URL"));
  display(bookMarkList);
} else {
  bookMarkList = [];
}

function addUrl() {
  var URL = {
    name: siteName.value,
    url: siteUrl.value,
  };

  if (isValidUrl(siteUrl.value) == true && lenghtOfName() == true) {
    if (document.getElementById("submit").innerHTML === "Submit") {
      bookMarkList.push(URL);
    } else {
      bookMarkList.splice(currentIndex, 1, URL);
      document.getElementById("submit").innerHTML = "Submit";
    }
    localStorage.setItem("URL", JSON.stringify(bookMarkList));
    display(bookMarkList);
    reset();
  } else {
    warning();
  }
  console.log(bookMarkList);
}
function lenghtOfName(){
  var nameUrl = siteName.value;
  if (nameUrl.length>=3) {
    return true;
  }else {
    return false;
  }
}

function warning() {
  window.alert(
    "Site Name or Url is not valid, Please follow the rules below :\n\nSite name must contain at least 3 characters.\n\nsite URL must be a valid one.\nFor Ex: https://www.siteName.com/"
  );
}

function display(arr) {
  var card = ``;
  for (var i = 0; i < arr.length; i++) {
    card += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="card text-center mb-3">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${arr[i].name}</h5>
                <a href="#" class="my-2 text-muted" onclick="updateUrl(${i})">Rename</a>
                <a href="${arr[i].url}" class="btn visit my-2" target="_blank"><i class="fa-solid fa-eye pe-1"></i> Visit</a>
                <a href="#" class="btn delete" onclick="deleteUrl(${i})"><i class="fa-solid fa-trash pe-1"></i> Delete</a>
            </div>
        </div>
    </div>
        `;
  }
  document.getElementById("cardbody").innerHTML = card;
}

function reset() {
  siteName.value = null;
  siteUrl.value = null;
}

function searchUrl() {
  var searchValue = search.value;
  var urlSearch = [];
  for (var i = 0; i < bookMarkList.length; i++) {
    if (
      bookMarkList[i].name.toLowerCase().includes(searchValue.toLowerCase()) ==
      true
    ) {
      urlSearch.push(bookMarkList[i]);
    }
  }
  display(urlSearch);
}

function updateUrl(index) {
  currentIndex = index;
  siteName.value = bookMarkList[index].name;
  document.getElementById("submit").innerHTML = "Update";
}

function deleteUrl(index) {
  bookMarkList.splice(index, 1);
  display(bookMarkList);
  localStorage.setItem("URL", JSON.stringify(bookMarkList));
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
