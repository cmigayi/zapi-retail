$(document).ready(function(){
  //Table search
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  // Businesses page, scroll to create-business form
  $(".create-page-item-link a[href^='#']").on('click', function(e){
    e.preventDefault()

    var position = $($(this).attr('href')).offset().top;

    $('html, body').animate({
        scrollTop: position
      },
      500,
      'linear'
    )
  });

  // Businesses page, scroll to top
  $(".back-to-top-link a[href^='#']").on('click', function(e){
    e.preventDefault()

    var position = $($(this).attr('href')).offset().top;

    $('html, body').animate({
        scrollTop: position
      },
      500,
      'linear'
    )
  });

  // Managing the mobile menu-button (Index page)
  $('.main-menu .mobile-menu-btn').click(function(){
    $('.main-menu .mobile-cancel-menu-btn').css("display","block");
    $(this).css("display","none");

    // Display menu
    $('.mobile-main-menu-content').css("display","block");

    // Display background navy
    $('.navy-background').css("display","block");

    $('header').css("position","fixed");
    $('.mobile-main-menu-content').css("position","fixed");
  });

  $('.main-menu .mobile-cancel-menu-btn').click(function(){
    $('.main-menu .mobile-menu-btn').css("display","block");
    $(this).css("display","none");

     // Hide menu
     $('.mobile-main-menu-content').css("display","none");

     // Hide background dark
     $('.navy-background').css("display","");

     $('header').css("position","static");
     $('.mobile-main-menu-content').css("position","static");
  });

  // Managing the mobile menu-button (User pages)
  $('.menu-top .mobile-menu-btn').click(function(){
    $('.menu-top .mobile-cancel-menu-btn').css("display","block");
    $(this).css("display","none");

    // Display user menu
    $('.user-content-menu').css("display","block");

    // Display background navy
    $('.navy-background').css("display","block");

    $('header').css("position","fixed");
  });

  $('.menu-top .mobile-cancel-menu-btn').click(function(){
    $('.menu-top .mobile-menu-btn').css("display","block");
    $(this).css("display","none");

     // Hide user menu
     $('.user-content-menu').css("display","none");

     // Hide background dark
     $('.navy-background').css("display","");

     $('header').css("position","static");
  });

  // Managing the Transactions and Sales table in Sales page
  $(".sales-detail-btn").click(function(){
    $(".table-sales-transactions").hide();
    $(".page-search").hide();
  });

  $(".table-sales-back-btn").click(function(){
    $(".table-sales-transactions").show();
    $(".page-search").show();
  });

  // Edit business info
  $('.business-edit-btn').click(function(e){
    e.preventDefault();
    var data = $(this).attr('href');
    $(".edit-form input:text").val(data.business_name);
    $('.edit-form').css("display", "block");

    // Hide background dark
    $('.navy-background').css("display","block");
  });

  // Close edit-business-info form popup
  $('.close-btn a').click(function(e){
    e.preventDefault();

    $('.edit-form').css("display", "none");

    // Hide background dark
    $('.navy-background').css("display","none");
  });

});
