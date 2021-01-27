function saveOptions(e) {
  e.preventDefault();
  var newSettings = {
    color: document.querySelector("#color").value,
    commentBackgroundColor: document.querySelector("#comment-bg-color").value,
    commentColor: document.querySelector("#comment-color").value,
    authorBackgroundColor: document.querySelector("#author-bg-color").value,
    authorColor: document.querySelector("#author-color").value,
    fontFamily: document.querySelector("#font-family").value,
    fullName: document.querySelector("#full-name").checked,
    replaceAnonymous: document.querySelector("#replace-anonymous").checked,
    anonymousUsers: document.querySelector("#anonymous-users").value,
    replaceAnonymousWith: document.querySelector("#replace-anonymous-with").value,
  };
  console.log("New Settings")
  console.log(newSettings);
  chrome.storage.sync.set(newSettings);
}

function restoreOptions() {

  var properties = ["color","authorBackgroundColor","authorColor","commentBackgroundColor","commentColor","fontFamily","fullName","replaceAnonymous","anonymousUsers","replaceAnonymousWith"];
  chrome.storage.sync.get(properties, function(result){
    console.log(result);
    document.querySelector("#color").value = result.color || "#000000";
    document.querySelector("#author-bg-color").value = result.authorBackgroundColor || "#ffa500";
    document.querySelector("#author-color").value = result.authorColor || "#222222";
    document.querySelector("#comment-bg-color").value = result.commentBackgroundColor || "#222222";
    document.querySelector("#comment-color").value = result.commentColor || "#ffffff";
    document.querySelector("#font-family").value = result.fontFamily || "Avenir Next, Helvetica, Geneva, Verdana, Arial, sans-serif";
    if(result.fullName) document.querySelector("#full-name").checked = result.fullName || true;
    else document.querySelector("#full-name").checked = false;
    if(result.replaceAnonymous) document.querySelector("#replace-anonymous").checked = result.fullName || true;
    else document.querySelector("#replace-anonymous").checked = false;
    document.querySelector("#anonymous-users").value = result.anonymousUsers || "EmptyUsername";
    document.querySelector("#replace-anonymous-with").value = result.replaceAnonymousWith || "";
    
    
  });

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
