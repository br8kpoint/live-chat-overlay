
var useFullName = false;  //global variable for using the full name of user or just first name.
var replaceAnonymous = true; //global variable to replace anonymous users.
var anonymousUsers = "EmptyUsername" //global variable of comma seprated usernames that will be replaced
var replaceAnonymousWith = "" //global variable of what any anonymous users will be replaced with
var highlightWords = [];
/**
 * binding for youtube chat message click
 */




$("body").unbind("click").on("click", "yt-live-chat-text-message-renderer,yt-live-chat-paid-message-renderer,yt-live-chat-membership-item-renderer,yt-live-chat-paid-sticker-renderer", function () {

  // Don't show deleted messages
  if($(this)[0].hasAttribute("is-deleted")) {
    console.log("Not showing deleted message");
    return;
  }

  $(".hl-c-cont").remove();
  var chatname = $(this).find("#author-name").text();

  // Show just the first name. Comment this out to show the full name.
  if(!useFullName) chatname = chatname.replace(/ .*/,'');

  var chatmessage = $(this).find("#message").html();
  var chatimg = $(this).find("#img").attr('src');
  chatimg = chatimg.replace("32", "128");
  var chatdonation = $(this).find("#purchase-amount").html();
  var chatmembership = $(this).find(".yt-live-chat-membership-item-renderer #header-subtext").html();
  var chatsticker = $(this).find(".yt-live-chat-paid-sticker-renderer #img").attr("src");

  // Donation amounts for stickers use a differnet id than regular superchats
  if(chatsticker) {
    chatdonation = $(this).find("#purchase-amount-chip").html();
  }

  var chatbadges = "";
  if($(this).find("#chat-badges .yt-live-chat-author-badge-renderer img").length > 0) {
    chatbadges = $(this).find("#chat-badges .yt-live-chat-author-badge-renderer img").parent().html();
  }

  // Mark this comment as shown
  $(this).addClass("shown-comment");

  var hasDonation = '';
  if(chatdonation) {
    hasDonation = '<div class="donation">' + chatdonation + '</div>';
  }

  var hasMembership = '';
  if(chatmembership) {
    hasMembership = '<div class="donation membership">NEW MEMBER!</div>';
    chatmessage = chatmembership;
  }

  if(chatsticker) {
    chatmessage = '<img src="'+chatsticker+'">';
  }

  var backgroundColor = "";
  var textColor = "";
  if(this.style.getPropertyValue('--yt-live-chat-paid-message-primary-color')) {
    backgroundColor = "background-color: "+this.style.getPropertyValue('--yt-live-chat-paid-message-primary-color')+";";
    textColor = "color: #111;";
  }

  // This doesn't work yet
  if(this.style.getPropertyValue('--yt-live-chat-sponsor-color')) {
    backgroundColor = "background-color: "+this.style.getPropertyValue('--yt-live-chat-sponsor-color')+";";
    textColor = "color: #111;";
  }


  $( "highlight-chat" ).removeClass("preview").append('<div class="hl-c-cont fadeout">'
     + '<div class="hl-name">' + chatname
       + '<div class="hl-badges">' + chatbadges + '</div>'
     + '</div>'
     + '<div class="hl-message" style="'+backgroundColor+' '+textColor+'">' + chatmessage + '</div>'
     + '<div class="hl-img"><img src="' + chatimg + '"></div>'
     +hasDonation+hasMembership
   +'</div>')
  .delay(10).queue(function(next){
    $( ".hl-c-cont" ).removeClass("fadeout");
    next();
  });

});

/**
 * castr chat message integration
 */
$("body").unbind("click").on("click", ".chat__message", function () {

  // Don't show deleted messages
  if($(this)[0].hasAttribute("is-deleted")) {
    console.log("Not showing deleted message");
    return;
  }

  $(".hl-c-cont").remove();
  var chatname = $(this).find(".chat__message__username").text();
  var anonUsers = anonymousUsers.split(",");
  anonUsers.forEach(function(anon){
    chatname = chatname.replace(new RegExp(anon,"i"), replaceAnonymousWith);
  });
  if(!useFullName) chatname = chatname.replace(/ .*/,'');
  // Show just the first name. Comment this out to show the full name.
  //chatname = chatname.replace(/ .*/,'');

  var chatmessage = $(this).clone()    //clone the element
  .children() //select all the children
  .remove()   //remove all the children
  .end()  //again go back to selected element
  .text();    //get the text of element
  /*var chatimg = $(this).find("#img").attr('src');
  chatimg = chatimg.replace("32", "128");
  var chatdonation = $(this).find("#purchase-amount").html();
  var chatmembership = $(this).find(".yt-live-chat-membership-item-renderer #header-subtext").html();
  
  var chatbadges = "";
  if($(this).find("#chat-badges .yt-live-chat-author-badge-renderer img").length > 0) {
    chatbadges = $(this).find("#chat-badges .yt-live-chat-author-badge-renderer img").parent().html();
  }
  */
  $(this).addClass("show-comment");

  /*
  var hasDonation;
  if(chatdonation) {
    hasDonation = '<div class="donation">' + chatdonation + '</div>';
  } else {
    hasDonation = '';
  }

  var hasMembership;
  if(chatmembership) {
    hasMembership = '<div class="donation membership">NEW MEMBER!</div>';
    chatmessage = chatmembership;
  } else {
    hasMembership = '';
  }
  */
  var backgroundColor = "";
  var textColor = "";
  /*if(this.style.getPropertyValue('--yt-live-chat-paid-message-primary-color')) {
    backgroundColor = "background-color: "+this.style.getPropertyValue('--yt-live-chat-paid-message-primary-color')+";";
    textColor = "color: #111;";
  }

  // This doesn't work yet
  if(this.style.getPropertyValue('--yt-live-chat-sponsor-color')) {
    backgroundColor = "background-color: "+this.style.getPropertyValue('--yt-live-chat-sponsor-color')+";";
    textColor = "color: #111;";
  }
  */
  if($(this).hasClass("chat__message--youtube")) chatimg = "https://chat.castr.io/assets/youtube.png";
  if($(this).hasClass("chat__message--twitch")){
     chatimg="https://chat.castr.io/assets/twitch.svg";
     chatname = $(this).find(".chat__message__username").text();
     chatmessage = $(this).find(".chat__message__message").text();
  }
  if($(this).hasClass("chat__message--facebook")) chatimg="https://chat.castr.io/assets/facebook.png";
  $( "highlight-chat" ).append('<div class="hl-c-cont fadeout"><div class="hl-name">' + chatname + '</div><div class="hl-message" style="'+backgroundColor+' '+textColor+'">' + chatmessage + '</div><div class="hl-img"><img src="' + chatimg + '"></div>')
  .delay(10).queue(function(next){
    $( ".hl-c-cont" ).removeClass("fadeout");
    next();
  });

});

$("body").on("click", ".btn-clear", function () {
  $(".hl-c-cont").addClass("fadeout").delay(300).queue(function(){
    $(".hl-c-cont").remove().dequeue();
  });
});



$( "yt-live-chat-app, div.chat" ).before( '<highlight-chat></highlight-chat><button class="btn-clear">CLEAR</button><a href="'+ chrome.runtime.getURL('settings/options.html')+'" data-featherlight="iframe" data-featherlight-iframe-height="640" data-featherlight-iframe-width="480" id="go-to-options">options</a>' );

// Show a placeholder message so you can position the window before the chat is live
$(function(){
  var chatmessage = "this livestream is the best!";
  var chatimg = "https://pin13.net/youtube-live-chat-sample-avatar.png";
  $( "highlight-chat" ).addClass("preview").append('<div class="hl-c-cont fadeout"><div class="hl-name">Sample User<div class="hl-badges"></div></div><div class="hl-message">' + chatmessage + '</div><div class="hl-img"><img src="' + chatimg + '"></div></div>')
  .delay(10).queue(function(next){
    $( ".hl-c-cont" ).removeClass("fadeout");
    next();
  });
});

// Restore settings
function restoreSettings(){


var properties = ["color","authorBackgroundColor","authorColor","commentBackgroundColor","commentColor","fontFamily","fullName","replaceAnonymous","anonymousUsers","replaceAnonymousWith","highlightWords"];
chrome.storage.sync.get(properties, function(item){
  var color = "#000000";
  if(item.color) {
    color = item.color;
  }

  let root = document.documentElement;
  root.style.setProperty("--keyer-bg-color", color);

  if(item.authorBackgroundColor) {
    root.style.setProperty("--author-bg-color", item.authorBackgroundColor);
    root.style.setProperty("--author-avatar-border-color", item.authorBackgroundColor);
  }
  if(item.authorAvatarBorderColor) {
    root.style.setProperty("--author-avatar-border-color", item.authorAvatarBorderColor);
  }
  if(item.commentBackgroundColor) {
    root.style.setProperty("--comment-bg-color", item.commentBackgroundColor);
  }
  if(item.authorColor) {
    root.style.setProperty("--author-color", item.authorColor);
  }
  if(item.commentColor) {
    root.style.setProperty("--comment-color", item.commentColor);
  }
  if(item.fontFamily) {
    root.style.setProperty("--font-family", item.fontFamily);
  }
  useFullName = item.fullName;
  replaceAnonymous = item.replaceAnonymous;
  anonymousUsers = item.anonymousUsers || "EmptyUsername"; // default to EmtyUsername for Castr.io but - 2021-01-12
  replaceAnonymousWith = item.replaceAnonymousWith;
  if(item.scale) {
    root.style.setProperty("--comment-scale", item.scale);
  }
  if(item.commentBottom) {
    root.style.setProperty("--comment-area-bottom", item.commentBottom);
  }
  if(item.commentHeight) {
    root.style.setProperty("--comment-area-height", item.commentHeight);
  }
  if(item.sizeOffset) {
    root.style.setProperty("--comment-area-size-offset", item.sizeOffset);
  }
  highlightWords = item.highlightWords;

});
}
restoreSettings();

$("#primary-content").append('<span style="font-size: 0.7em">Aspect Ratio: <span id="aspect-ratio"></span></span>');

function displayAspectRatio() {
  var ratio = Math.round(window.innerWidth / window.innerHeight * 100) / 100;
  ratio += " (target 1.77)";
  $("#aspect-ratio").text(ratio);
}
displayAspectRatio();
window.onresize = displayAspectRatio;

$(function(){
  $.featherlight.defaults.afterClose = function(){
    restoreSettings();
  }
})
