$(document).ready(function(){
  $(".sales-detail-btn").click(function(){
    $(".table-sales-transactions").hide();
    $(".page-search").hide();
  });

  $(".table-sales-back-btn").click(function(){
    $(".table-sales-transactions").show();
    $(".page-search").show();
  });
});
