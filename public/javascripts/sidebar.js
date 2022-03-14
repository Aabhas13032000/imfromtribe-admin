
// if(document.cookie.length != 0){
//     document.getElementById('loaded_page').setAttribute('src',`${document.cookie.split('=')[1]}`);
//     console.log(document.cookie.split('=')[1].split('/')[1]);
//     document.querySelectorAll('.list').forEach(item => {
//         if(item.getElementsByClassName('sidebar_text')[0].innerHTML.toLowerCase() === document.cookie.split('=')[1].split('/')[1]) {
//             item.classList.add('selected');
//             document.getElementById('selected_card').style.top = `${item.getBoundingClientRect().top}px`;
//             document.getElementById('selected_card').style.left = `${item.getBoundingClientRect().left}px`;
//         }
//     });
//     // window.history.pushState("object or string", "Title", `${document.cookie.split('=')[1]}`);

// } else {
    document.getElementById('loaded_page').setAttribute('src',`/user`);
    // First time bringing the box
    document.getElementsByClassName('list')[0].classList.add('selected');
    // var selected_list = document.getElementsByClassName('selected')[0];
    // document.getElementById('selected_card').style.top = `${selected_list.getBoundingClientRect().top}px`;
    // document.getElementById('selected_card').style.left = `${selected_list.getBoundingClientRect().left}px`;
    // window.history.pushState("object or string", "Title", `/user`);
// }

//Onclick moving box
document.querySelectorAll('.list').forEach(item => {
    item.addEventListener('click', event => {
        var inside_selected_list = document.getElementsByClassName('selected')[0];
        inside_selected_list.classList.remove('selected');
        item.classList.add('selected');
        // document.getElementById('selected_card').style.top = `${item.getBoundingClientRect().top}px`;
        // document.getElementById('selected_card').style.left = `${item.getBoundingClientRect().left}px`;
        var urlValue = item.getElementsByClassName('sidebar_text')[0].innerHTML.toLowerCase();
        document.getElementById('loaded_page').setAttribute('src',`/${urlValue}`);
        changeInitialPath(urlValue);
        toggleSideBar();
        // document.cookie = `url=/${urlValue}`;
        // console.log(document.cookie);
        // window.history.pushState("object or string", "Title", `/${urlValue}`);
    });
});

//Change initial path
function changeInitialPath(path) {
    $.ajax({
        url : '/changeInitialPath',
        dataType: "json",
        type: "POST",
        data: {
            path:path
        },
        success: function(response){
            // alert('Deleted Successfullyt!!');
            // location.reload();
        },
        error: function(err){
            console.log(err);
            alert('Some error occured !!');
        }
    });
}

//toggle Sidebar
function toggleSideBar() {
    if(document.getElementsByClassName('blurbackground')[0].classList.contains('activeblurbackground')) {
        document.getElementsByClassName('blurbackground')[0].classList.remove('activeblurbackground')
    } else {
        document.getElementsByClassName('blurbackground')[0].classList.add('activeblurbackground')
    }
    if(document.getElementsByClassName('side_bar')[0].classList.contains('active_side_bar')) {
        document.getElementsByClassName('side_bar')[0].classList.remove('active_side_bar')
    } else {
        document.getElementsByClassName('side_bar')[0].classList.add('active_side_bar')
    }
}

//toggle admin box
function toggleadminBox() {
    if(document.getElementsByClassName('bluradminbackground')[0].classList.contains('activebluradminbackground')) {
        document.getElementsByClassName('bluradminbackground')[0].classList.remove('activebluradminbackground')
    } else {
        document.getElementsByClassName('bluradminbackground')[0].classList.add('activebluradminbackground')
    }
    if(document.getElementsByClassName('adminBox')[0].classList.contains('active_adminBox')) {
        document.getElementsByClassName('adminBox')[0].classList.remove('active_adminBox')
    } else {
        document.getElementsByClassName('adminBox')[0].classList.add('active_adminBox')
    }
}