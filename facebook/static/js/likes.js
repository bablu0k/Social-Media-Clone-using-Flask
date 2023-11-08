document.addEventListener("DOMContentLoaded", function() {

  console.log("likes js file loaded")
  

  document.getElementById('post-container').addEventListener('click', function (event) {

    console.log("Post -container event click triggered")

    if (event.target.classList.contains("like-post")) {

      console.log("Event class if statemet triggered")

      event.preventDefault();
      const likebuttonid = event.target.id;
      var post_id = likebuttonid.split('-')[1];

      console.log("post id gathered" + post_id)

      fetch("/home/post/like/" + post_id, {
        method: "POST",
      })
      .then(response => {
        if (response.ok) {
          console.log("Response gathered")
          return response.json(); // Parse the response as JSON
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        console.log("altering inner html")
        if (data.result === "True") {
          event.target.innerHTML = '<i class="fa-solid fa-heart" style="color: #fa0000;"></i>';
        } else {
          event.target.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    

     };
    });
});
