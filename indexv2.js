/* Project specific Javascript goes here. */
$(document).ready(function(){

    $(".publish").click(function () {
        $("input[name='status']").val("P");
        $("#article-form").submit();
    });

    $(".update").click(function () {
        $("input[name='status']").val("P");
        $("input[name='edited']").val("True");
        $("#article-form").submit();
    });

    $("#comment_submit").click(function(){
        $("#comment-form").submit();
    });

    $(".draft").click(function () {
        $("input[name='status']").val("D");
        $("#article-form").submit();
    });

    $('input[name = "honeypot"]').hide();

    $('.reply').on('click',function(event){
        let c_id=$(this).attr('value');
        $('#'+c_id).toggle('hide');
    });

    $("#std-general-container").each(function () {

        if($(this).hasClass("home-page")){
             $(".location1").addClass("std-here");
        }else if($(this).hasClass("question-page")){
             $(".location2").addClass("std-here");
        }else if($(this).hasClass("tag-page")){
             $(".location3").addClass("std-here");
        }else if($(this).hasClass("users-page")){
             $(".location4").addClass("std-here");
        }
    })



    $(".close").on("click", function(event){
        $(".alert-success").hide()
    })

    $('.fa-clock-o').tooltip({
        items: 'a.target',
        content: ' ',
        show: null, // show immediately
        open: function(event, ui)
        {
            if (typeof(event.originalEvent) === 'undefined')
            {
                return false;
            }

            var $id = $(ui.tooltip).attr('id');

            // close any lingering tooltips
            $('div.ui-tooltip').not('#' + $id).remove();

            // ajax function to pull in data and add it to the tooltip goes here
        },
        close: function(event, ui)
        {
            ui.tooltip.hover(function()
            {
                $(this).stop(true).fadeTo(400, 1);
            },
            function()
            {
                $(this).fadeOut('400', function()
                {
                    $(this).remove();
                });
            });
        }
    });

    // $('.toc').find('a').each(function(){
    //     var target = $(this).attr('href');
    //     // console.log($(target))
    //     $(this).on("click",function(){
    //         $(window).stop(true).scrollTo($(target),1000,{axis:'y'});
    //     });
    //
    // });
    $('.to-close').on('click',function(){
        $('.board').hide()
    })


    const $tagContainer = $(".tag-container");
    const $inputBox = $(".tag-container input");
    const $originInput = $("#id_tags");

    $inputBox.focus(function(){
        $(this).parent().css({
                'background-color': 'transparent',
                'border-color': '#6cbbf7',
                'outline':'none',
                'box-shadow': '0 0 0 4px rgba(0,149,255,0.25)',
                'border-radius': '3px'
        })
    });
    $inputBox.focusout(function(){
        $(this).parent().css({
              border:'1px solid #c4c4c4',
            'box-shadow': 'none',
        })
    })



    let tags = [];
    function createTag(label) {
        var $div = $('<div class="tag"></div>');
        $div.append($("<span>" + label + "</span>"));

        $div.append(
            $("<i/>", {
                class: "fa fa-times",
                "aria-hidden": "true",
                "data-item": label
            })
        );
        return $div;
    }
    function initTags() {
        if ($originInput.val()) {
            preTags = $originInput.val().split(",");
            tags = preTags;
            addTags();
        }
    }
    initTags();

    function reset() {
        $(".tag").each(function () {
            $(this).remove();
        });
    }

    function addTags() {
        reset();
        var len = tags.length;
        var new_tags = $.map(tags, function (v, i) {
            return tags[len - 1 - i];
        });
        for (var i = 0; i < new_tags.length; i++) {
            const addthis = createTag(new_tags[i]);
            $tagContainer.prepend(addthis);
        }
        $originInput.val(new_tags);
    }


    $inputBox.on("input keyup", function (e) {
        var inputValue = $(this).val();
        // if (inputValue.length > 2) {
        //     $.ajax({
        //         url: '/search/tag/',
        //         data: {'q': inputValue,},
        //         type: 'get',
        //         cache: false,
        //         success: function (data) {
        //             var tagFilter = $('#tag-filter');
        //             tagFilter.css({"display": "grid"});
        //             tagFilter.empty();
        //             if (data.length > 0) {
        //                 $.each(JSON.parse(data), function (key, value) {
        //                     tagFilter.append("<a class='suggest-tag'><span class='std-badge'>" + value.fields.name + "</span></a>");
        //                 })
        //             }
        //             $(".suggest-tag").on('click', function () {
        //                 tags.push($(this).text());
        //                 addTags();
        //                 $inputBox.val("");
        //                 tagFilter.empty();
        //                 tagFilter.css({"display": "none"});
        //             })
        //         },
        //     })
        //
        // }
        if (e.key === "Enter" && $(this).val().length > 0) {
            tags.push($(this).val());
            addTags();
            $(this).val("");
        }
    });

    $(document).on("click", function (e) {
        if (e.target.tagName === "I") {
            const value = e.target.getAttribute("data-item");
            const index = tags.indexOf(value);
            tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
            // console.log(tags);
            addTags();
        }
    });
    // modify the default tooltip
    //
    // $(function () {
    //   $(document).tooltip({
    //     position: {
    //       my: "center bottom-15",
    //       at: "center top",
    //       using: function (position, feedback) {
    //         $(this).css(position);
    //         $("<div>")
    //           .addClass("arrow")
    //           .addClass(feedback.vertical)
    //           .addClass(feedback.horizontal)
    //           .appendTo(this);
    //       }
    //     }
    //   });
    // });


// ----end of global---- //
});


function showLogin() {
  $('#loginItems').toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



// ----------------------------------- //
class MyUploadAdapter {
    constructor(loader) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                this._initRequest();
                this._initListeners(resolve, reject, file);
                this._sendRequest(file);
            }));
    }

    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // Initializes the XMLHttpRequest object using the URL passed to the constructor.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        // Note that your request may look different. It is up to you and your editor
        // integration to choose the right communication channel. This example uses
        // a POST request with JSON as a data structure but your configuration
        // could be different.
        xhr.open('POST', '/upload/editor-image-upload/', true);
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            // This example assumes the XHR server's "response" object will come with
            // an "error" which has its own "message" that can be passed to reject()
            // in the upload promise.
            //
            // Your integration may handle upload errors in a different way so make sure
            // it is done properly. The reject() function must be called when the upload fails.
            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            // This URL will be used to display the image in the content. Learn more in the
            // UploadAdapter#upload documentation.
            resolve({
                default: response.url
            });
        });

        // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
        // properties which are used e.g. to display the upload progress bar in the editor
        // user interface.
        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    _sendRequest(file) {
        // Prepare the form data.
        const data = new FormData();

        if (file.size/1000/1000 < 2) {
            data.append('image', file);

        // Important note: This is the right place to implement security mechanisms
        // like authentication and CSRF protection. For instance, you can use
        // XMLHttpRequest.setRequestHeader() to set the request headers containing
        // the CSRF token generated earlier by your application.

            // Send the request.
            this.xhr.send(data);
        } else {
            this.abort();
            alert("File too big, please select a file less than 2Mb");
        }

    }
}
