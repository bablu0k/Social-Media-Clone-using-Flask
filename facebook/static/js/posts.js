document.addEventListener("DOMContentLoaded", function() {
  let page = 1;




  function createPost(data) {

    const postContainer = document.getElementById('post-container');

    const mainDiv = document.createElement('div');
    mainDiv.className = 'bg-white p-4 rounded shadow mt-3';
    mainDiv.id = 'post-' + data.post_id;

    const profileDiv = document.createElement('div');
    profileDiv.className = 'd-flex justify-content-between';

    const profileDetailsDiv = document.createElement('div');
    profileDetailsDiv.className = 'd-flex';

    const imageTag = document.createElement('img');
    imageTag.src = 'static/images/profile_pics/' + data.profile;
    imageTag.alt = 'POST IMAGE';
    imageTag.className = 'rounded-circle me-2';
    imageTag.style.cssText = 'width: 38px; height: 38px; object-fit: cover';

    const nameDiv = document.createElement('div');
  

    const firstnameP = document.createElement('p');
    firstnameP.className = 'm-0 fw-bold';
    firstnameP.textContent = data.firstname;

    const dateP = document.createElement('span');
    dateP.className = 'text-muted fs-7';
    dateP.textContent = data.date_posted;

    nameDiv.appendChild(firstnameP);
    nameDiv.appendChild(dateP);

    profileDetailsDiv.appendChild(imageTag);
    profileDetailsDiv.appendChild(nameDiv);

    profileDiv.appendChild(profileDetailsDiv);
    mainDiv.appendChild(profileDiv);

    // ======================================== POST CONTENT =========================================

    const outerDiv = document.createElement('div')
    outerDiv.className = "mt-3"

    const titleDiv = document.createElement('div')
    titleDiv.className = "fw-bold fs-5"

    const contentDiv = document.createElement('div')
    contentDiv.className = "fs-6"

    const contentP = document.createElement('div')
    contentP.innerHTML = data.post_content

    contentDiv.appendChild(contentP);

    if (data.post_image != null) {

      const postImageDiv = document.createElement('div');
      postImageDiv.className = "text-center"

      const postImageTag = document.createElement('img');
      postImageTag.src = "static/images/" + data.post_folder + "/" + data.post_image
      postImageTag.alt = "POST IMAGE"
      postImageTag.className = "img-fluid rounded"

      postImageDiv.appendChild(postImageTag);
      contentDiv.appendChild(postImageDiv);

    }

    outerDiv.appendChild(titleDiv);
    outerDiv.appendChild(contentDiv);

    mainDiv.appendChild(outerDiv)


    // ============================================ COMMENTS ==============================================

    const likeAndCommentCount = document.createElement('div')
    likeAndCommentCount.className = 'post__comment mt-3 position-relative';


    //  Likes Count 
    
    const likeCountDiv = document.createElement('div')
    likeCountDiv.className = "d-flex align-items-center top-0 start-0 position-absolute"
    likeCountDiv.style.cssText = "height: 50px; z-index: 5";

    const likeSymbolDiv = document.createElement('div')
    likeSymbolDiv.className = "me-2";

    const likeSymbolTag = document.createElement('i')
    likeSymbolTag.className = "text-primary fas fa-thumbs-up"

    likeSymbolDiv.appendChild(likeSymbolTag);

    likeCountDiv.appendChild(likeSymbolDiv);

    const likeCountP = document.createElement('p');
    likeCountP.textContent = data.like_count + " Likes";
    likeCountP.className = "m-0 text-muted fs-7";

    likeCountDiv.appendChild(likeCountP);
    


    const commentCountOuterDiv = document.createElement('div')
    commentCountOuterDiv.id = "comment-accordion-" + data.post_id;
    commentCountOuterDiv.className = "accordion"

    const commentAccordionDiv = document.createElement('div')
    commentAccordionDiv.className = "accordion-item border-0"



    //  h2 , hr 
    
    const commentAccordionHeaderDiv = document.createElement('h2')
    commentAccordionHeaderDiv.className = "accordion-header"
    commentAccordionHeaderDiv.id = "headingTwo";

    const commentCountInnerDiv = document.createElement('div')
    commentCountInnerDiv.className = "accordion-button collapsed pointer d-flex justify-content-end"
    commentCountInnerDiv.setAttribute("data-bs-toggle", "collapse")
    commentCountInnerDiv.setAttribute("data-bs-target", "#collapse" + data.post_id)
    commentCountInnerDiv.setAttribute("aria-expanded", "false")
    commentCountInnerDiv.setAttribute("aria-controls", "collapse" + data.post_id)

    const commentCountInnerP = document.createElement('p')
    commentCountInnerP.className = "m-0"
    commentCountInnerP.textContent = data.comment_count + "comments"

    commentCountInnerDiv.appendChild(commentCountInnerP)
    commentAccordionHeaderDiv.appendChild(commentCountInnerDiv)
  

    commentAccordionDiv.appendChild(commentAccordionHeaderDiv)
    
    const horizontalLine = document.createElement('hr')
    commentAccordionDiv.appendChild(horizontalLine)

    



 
    
    
 


    // ============================== Comment BOX =======================================================================


    const likeAndComment = document.createElement('div')
    likeAndComment.className = "d-flex justify-content-around";

    //  like button and comment button 
    
    const likeButtonDiv = document.createElement('div')
    likeButtonDiv.className = "dropdown-item rounded d-flex justify-content-center align-items-center pointer text-muted p-1"
    
    const likeButton = document.createElement("button")
    likeButton.classList.add("m-0")
    likeButton.classList.add("btn")
    likeButton.classList.add("btn-light")
    likeButton.classList.add("like-post")
    likeButton.id = "like-" + data.post_id

   

    
    const likeButtonI = document.createElement('i')
    

    if (data.is_liked == "True") {
      likeButtonI.style.cssText = "color: #fa0000;"
      likeButtonI.className = "fa-solid fa-heart"
    }
    else{
      likeButtonI.className = "fa-regular fa-heart"
    }

    likeButton.appendChild(likeButtonI)
    likeButtonDiv.appendChild(likeButton)
    likeAndComment.appendChild(likeButtonDiv)
    
    
    const commentButtonDiv = document.createElement('div')
    commentButtonDiv.className = "dropdown-item rounded d-flex justify-content-center align-items-center pointer text-muted p-1"
    commentButtonDiv.setAttribute("data-bs-toggle", "collapse")
    commentButtonDiv.setAttribute("data-bs-target", "#collapse" + data.post_id)
    commentButtonDiv.setAttribute("aria-expanded", "false")
    commentButtonDiv.setAttribute("aria-controls", "collapse" + data.post_id)


    const commentButton = document.createElement("button")
    commentButton.className = "m-0 btn btn-light"
  

    const commentButtonI = document.createElement('i')
    commentButtonI.className = "fas fa-comment-alt text-muted"

    commentButton.appendChild(commentButtonI)
    commentButtonDiv.appendChild(commentButton)
    likeAndComment.appendChild(commentButtonDiv)

    

    commentAccordionDiv.append(likeAndComment)

    // ============================================== COMMENT EXPAND ==================================================

    const commentExpandOuterDiv = document.createElement('div')
    commentExpandOuterDiv.className = "accordion-collapse collapse"
    commentExpandOuterDiv.id = "collapse" + data.post_id
    commentExpandOuterDiv.setAttribute("aria-labelledby", "headingTwo")
    commentExpandOuterDiv.setAttribute("data-bs-parent", "comment-accordion-" + data.post_id);

    

    const commentHR = document.createElement('hr')
    commentExpandOuterDiv.appendChild(commentHR)

    const accordionBodyDiv = document.createElement('div');
    accordionBodyDiv.className = "accordion-body"

    const commentContainerDiv = document.createElement('div')
    commentContainerDiv.id = "comments-container-" + data.post_id
    commentContainerDiv.style.cssText = "max-height: 300px; overflow-y: auto;"

    accordionBodyDiv.appendChild(commentContainerDiv);


    const likeFormDiv = document.createElement("div")
    likeFormDiv.className = "text-center my-4"
    likeFormDiv.id = "load-div-" + data.post_id

    const likeForm = document.createElement('form')
    likeForm.className = "load_comments"
    likeForm.id = "load-comments-" + data.post_id
    
    const likeFormInput1 = document.createElement('input')
    likeFormInput1.type = "hidden"
    likeFormInput1.value = data.post_id
    likeFormInput1.name = "post_id"

    const likeFormInput2 = document.createElement('input')
    likeFormInput2.type = "submit"
    likeFormInput2.value = "Load Comments"
    likeFormInput2.className = "btn btn-primary"

    likeForm.appendChild(likeFormInput1);
    likeForm.appendChild(likeFormInput2);
    likeFormDiv.appendChild(likeForm)

    accordionBodyDiv.appendChild(likeFormDiv);


    const commentForm = document.createElement("form")
    commentForm.className = "d-flex comment-form"

    const commentFormAvatar = document.createElement('div')
    commentFormAvatar.className = "mx-1"

    const commentAvatar = document.createElement('img');
    commentAvatar.src = 'static/images/profile_pics/' + data.current_user_profile;
    commentAvatar.alt = 'Profile';
    commentAvatar.className = 'rounded-circle me-2';
    commentAvatar.style.cssText = 'width: 38px; height: 38px; object-fit: cover';

    commentFormAvatar.appendChild(commentAvatar)

    const commentFormInput1 = document.createElement('input')
    commentFormInput1.type = "hidden"
    commentFormInput1.value = data.post_id
    commentFormInput1.name = "post_id" 

    const commentFormInnerDiv = document.createElement('div')
    commentFormInnerDiv.className = "d-flex mx-1"

    const commentFormInput2 = document.createElement('input')
    commentFormInput2.type = "text"
    commentFormInput2.placeholder = "comment here ..."
    commentFormInput2.className = "form-control border-0 rounded-pill bg-gray"
    commentFormInput2.name = "comment"
    commentFormInput2.style.cssText = "width: 40rem"
    commentFormInput2.id = "comment-box-" + data.post_id

    const commentFormInput3 = document.createElement('input')
    commentFormInput3.type = "submit"
    commentFormInput3.className = "d-none"

    commentFormInnerDiv.appendChild(commentFormInput2);
    commentFormInnerDiv.appendChild(commentFormInput3);

    commentForm.appendChild(commentFormAvatar)
    commentForm.appendChild(commentFormInput1)
    commentForm.appendChild(commentFormInnerDiv)
    
    accordionBodyDiv.appendChild(commentForm)

    


    commentExpandOuterDiv.appendChild(accordionBodyDiv)
    commentAccordionDiv.appendChild(commentExpandOuterDiv)


    commentCountOuterDiv.appendChild(commentAccordionDiv)
    likeAndCommentCount.appendChild(likeCountDiv)
    likeAndCommentCount.append(commentCountOuterDiv)
    mainDiv.appendChild(likeAndCommentCount)
    
    postContainer.appendChild(mainDiv);

  }
  

  fetch("/home/posts/" + page, {
    method: "GET",
  }).then(function(response){
    return response.json();
  }).then(function(data){
    console.log(data)
    console.log('-----------------------------------------------------');
    console.log(data[0])
      data.forEach(function(post) {
      createPost(post);
    })
  });


  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      // send request
      page += 1
      console.log("scroll triggered")
      fetch("/home/posts/" + page, {
        method: "GET",
      }).then(function(response){
        return response.json();
      }).then(function(data){
        console.log(data)
        console.log('-----------------------------------------------------');
        console.log(data[0])
          data.forEach(function(post) {
          createPost(post);
        })
      }).catch(function(error){
        console.log("No Posts Left to load");
        page -= 1
      })
    }
  })
});