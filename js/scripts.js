var st = ""
$("#submit").on( "click", function( event ) {
    $('#resultados').html("");
    event.preventDefault();
    st = $('#search').val()
    request(st, " ")
    $("#resultados").append("<input type='button' value='previousPageT'/><input type='button' value='nextPageT'/>");
});



function request(term, token){
  $.ajax({
         cache: false,
         data: $.extend({
             key: 'AIzaSyAifE6nU64hFCxzMI1Fh61yGg211p1qHoI',
             q: term,
             part: 'snippet',
             order: 'viewCount',
             pageToken: token
         }, {
             maxResults: 10,            
         }),
         dataType: 'json',
         type: 'GET',
         url: 'https://www.googleapis.com/youtube/v3/search',
         success: function(respuesta) {
          console.log(respuesta);
          nextPageT = respuesta.nextPageToken;
          previousPageT = respuesta.prevPageToken;
          for(var i=0; i<10; i++){
            var item = respuesta.items[i];
            var title = item.snippet.title;
            var desc = item.snippet.description;
            var url = "https://www.youtube.com/watch?v="+item.id.videoId;
            var thumbnl = item.snippet.thumbnails.default.url;        
            var imgTh = document.createElement('img');
            imgTh.setAttribute("src",thumbnl);            
            var li = document.createElement("li");
            var divLi = document.createElement("div");
            divLi.className ="divLi";
            divLi.setAttribute("onclick", "window.open('"+url+"', '_blank');");
            var pTitle = document.createElement("p");
            pTitle.className ="pTitle";
            var pDesc = document.createElement("p");
            pDesc.className ="pDesc";
            pTitle.textContent = title;
            pDesc.textContent = desc;
            divLi.appendChild(imgTh);
            divLi.appendChild(pTitle);
            divLi.appendChild(pDesc);
            li.appendChild(divLi);
            $("#resultados").append(li)
          }          
        },
        error: function(err) {
          console.log(err);
        }
     })
}









