document.addEventListener('DOMContentLoaded', function() {
  let pageTable = {};
  console.log("Comment js loaded")


  document.querySelectorAll('.comment-form').forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      var formData = new FormData(this);
      var jsonData = {};

      formData.forEach(function(value, key) {
        jsonData[key] = value;
      });

      console.log(jsonData);

      fetch("/home/post/comment", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var commentContainerID = "comments-container-" + data['post_id'];
        var commentBoxID = "comment-box-" + data['post_id'];

        var commentsContainer = document.getElementById(commentContainerID);
        var commentBox = document.getElementById(commentBoxID);

        commentBox.value = '';

        var commentDiv = document.createElement('div');
        commentDiv.className = 'd-flex align-items-center my-1';

        var avatarImg = document.createElement('img');
        avatarImg.src = "/static/images/profile_pics/" + data.image;
        avatarImg.alt = 'Profile';
        avatarImg.className = 'rounded-circle me-2';
        avatarImg.style.cssText = 'width: 38px; height: 38px; object-fit: cover';

        var commentTextDiv = document.createElement('div');
        commentTextDiv.className = 'p-3 rounded comment__input w-100';

        var commentMenuDiv = document.createElement('div');
        commentMenuDiv.className = 'd-flex justify-content-end';

        var ellipsisIcon = document.createElement('i');
        ellipsisIcon.className = 'fas fa-ellipsis-h text-blue pointer';
        ellipsisIcon.id = 'post1CommentMenuButton';
        ellipsisIcon.setAttribute('data-bs-toggle', 'dropdown');
        ellipsisIcon.setAttribute('aria-expanded', 'false');

        var menuUl = document.createElement('ul');
        menuUl.className = 'dropdown-menu border-0 shadow';
        menuUl.setAttribute('aria-labelledby', 'post1CommentMenuButton');

        var li1 = document.createElement('li');
        li1.className = 'd-flex align-items-center';

        var anchor1 = document.createElement('a');
        anchor1.className = 'dropdown-item d-flex justify-content-around align-items-center fs-7';
        anchor1.href = '#';
        anchor1.textContent = 'Edit Comment';

        var li2 = document.createElement('li');
        li2.className = 'd-flex align-items-center';

        var anchor2 = document.createElement('a');
        anchor2.className = 'dropdown-item d-flex justify-content-around align-items-center fs-7';
        anchor2.href = '#';
        anchor2.textContent = 'Delete Comment';

        var firstnameP = document.createElement('p');
        firstnameP.className = 'fw-bold m-0';
        firstnameP.textContent = data.user;

        var commentP = document.createElement('p');
        commentP.className = 'm-0 fs-7 bg-gray p-2 rounded';
        commentP.textContent = data.comment;

        li1.appendChild(anchor1);
        li2.appendChild(anchor2);

        menuUl.appendChild(li1);
        menuUl.appendChild(li2);

        commentMenuDiv.appendChild(ellipsisIcon);
        commentMenuDiv.appendChild(menuUl);

        commentTextDiv.appendChild(commentMenuDiv);
        commentTextDiv.appendChild(firstnameP);
        commentTextDiv.appendChild(commentP);

        commentDiv.appendChild(avatarImg);
        commentDiv.appendChild(commentTextDiv);

        if (commentsContainer.firstChild) {
          commentsContainer.insertBefore(commentDiv, commentsContainer.firstChild);
        } else {
          commentsContainer.appendChild(commentDiv);
        }
      })
      .catch(function(error) {
        console.error("There is an error while posting", error);
      });
    });
  });

  document.querySelectorAll('.load-comments').forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      var submitData = new FormData(this);
      var submitDataJSON = {};

      submitData.forEach(function(value, key) {
        submitDataJSON[key] = value;
      });

      var post_id = submitDataJSON['post_id'];

      var page;
      if (post_id in pageTable) {
        page = pageTable[post_id] + 1;
        pageTable[post_id] += 1;
      } else {
        page = 1;
        pageTable[post_id] = 1;
      }

      fetch("/home/get/comments/" +  post_id + "/" + page, {
        method: "GET",
      
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log("Trying to load comments")
        var commentContainerID = "comments-container-" + post_id;
        var commentsContainer = document.getElementById(commentContainerID);
        
        if (page == 1) {
          commentsContainer.innerHTML = '';
        }

        data.forEach(function(comment) {
          var commentDiv = document.createElement('div');
          commentDiv.className = 'd-flex align-items-center my-1';

          var avatarImg = document.createElement('img');
          avatarImg.src = 'static/images/profile_pics/' + comment.image;
          avatarImg.alt = 'profile';
          avatarImg.className = 'rounded-circle me-2';
          avatarImg.style.cssText = 'width: 38px; height: 38px; object-fit: cover';

          var commentTextDiv = document.createElement('div');
          commentTextDiv.className = 'p-3 rounded comment__input w-100';

          var commentMenuDiv = document.createElement('div');
          commentMenuDiv.className = 'd-flex justify-content-end';

          var ellipsisIcon = document.createElement('i');
          ellipsisIcon.className = 'fas fa-ellipsis-h text-blue pointer';
          ellipsisIcon.id = 'post1CommentMenuButton';
          ellipsisIcon.setAttribute('data-bs-toggle', 'dropdown');
          ellipsisIcon.setAttribute('aria-expanded', 'false');

          var menuUl = document.createElement('ul');
          menuUl.className = 'dropdown-menu border-0 shadow';
          menuUl.setAttribute('aria-labelledby', 'post1CommentMenuButton');

          var li1 = document.createElement('li');
          li1.className = 'd-flex align-items-center';

          var anchor1 = document.createElement('a');
          anchor1.className = 'dropdown-item d-flex justify-content-around align-items-center fs-7';
          anchor1.href = '#';
          anchor1.textContent = 'Edit Comment';

          var li2 = document.createElement('li');
          li2.className = 'd-flex align-items-center';

          var anchor2 = document.createElement('a');
          anchor2.className = 'dropdown-item d-flex justify-content-around align-items-center fs-7';
          anchor2.href = '#';
          anchor2.textContent = 'Delete Comment';

          var firstnameP = document.createElement('p');
          firstnameP.className = 'fw-bold m-0';
          firstnameP.textContent = comment.user;

          var commentP = document.createElement('p');
          commentP.className = 'm-0 fs-7 bg-gray p-2 rounded';
          commentP.textContent = comment.comment;

          li1.appendChild(anchor1);
          li2.appendChild(anchor2);

          menuUl.appendChild(li1);
          menuUl.appendChild(li2);

          commentMenuDiv.appendChild(ellipsisIcon);
          commentMenuDiv.appendChild(menuUl);

          commentTextDiv.appendChild(commentMenuDiv);
          commentTextDiv.appendChild(firstnameP);
          commentTextDiv.appendChild(commentP);

          commentDiv.appendChild(avatarImg);
          commentDiv.appendChild(commentTextDiv);

          commentsContainer.appendChild(commentDiv);
        });
      })
      .catch(function(error) {
        console.error("No comments to load");
        var buttonID = "load-div-" + post_id;
        var alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-warning alert-dismissible fade show';
        var strongElement = document.createElement('strong');
        strongElement.textContent = 'No Comments Left';
        alertDiv.appendChild(strongElement);
        document.getElementById(buttonID).innerHTML = '';
        document.getElementById(buttonID).appendChild(alertDiv);
      });
    });
  });

  
});


