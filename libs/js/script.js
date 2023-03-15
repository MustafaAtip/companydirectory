$(window).on('load', function() {

    //preloader
    if ($('#preloader').length) {
      $('#preloader').delay(1000).fadeOut('slow', function () {
          $(this).remove();
      });
    }
  
    functionality();
        
  });
  
  //rotation
  
  if(window.innerHeight > window.innerWidth){ //portrait
    functionality();
  }
  if(window.innerWidth > window.innerHeight){ //landscape
    functionality();
  }
  
  function functionality() {
    //department modal
    $('#btnradioAddDep').click(function() {
      //divisions
      $(".aadDep").removeClass("d-none");
      $(".aadDep").addClass("d-block");
      $(".editDep").addClass("d-none");
      $(".delDep").addClass("d-none");
  
      //buttons
      $('#addDepBtn').removeClass("d-none");
      $("#addDepBtn").addClass("d-block");
      $("#editDepBtn").addClass("d-none");
      $("#delDepBtn").addClass("d-none");
    });
    
    $('#btnradioEditDep').click(function() {
      //divisions
      $(".editDep").removeClass("d-none");
      $(".editDep").addClass("d-block");
      $(".delDep").addClass("d-none");
      $(".aadDep").addClass("d-none");
  
      //buttons
      $('#editDepBtn').removeClass("d-none");
      $("#editDepBtn").addClass("d-block");
      $("#addDepBtn").addClass("d-none");
      $("#delDepBtn").addClass("d-none");
    });
    
    $('#btnradioDeleteDep').click(function() {
      //divisions
      $(".delDep").removeClass("d-none");
      $(".delDep").addClass("d-block");
      $(".editDep").addClass("d-none");
      $(".aadDep").addClass("d-none");
  
      //buttons
      $('#delDepBtn').removeClass("d-none");
      $("#delDepBtn").addClass("d-block");
      $("#editDepBtn").addClass("d-none");
      $("#addDepBtn").addClass("d-none");
    });
    
    
    //location modal
    $('#btnradioAddLoc').click(function() {
      //divisions
      $(".aadLoc").removeClass("d-none");
      $(".aadLoc").addClass("d-block");
      $(".editLoc").addClass("d-none");
      $(".delLoc").addClass("d-none");
  
      //buttons
      $('#aadLocBtn').removeClass("d-none");
      $("#aadLocBtn").addClass("d-block");
      $("#editLocBtn").addClass("d-none");
      $("#delLocBtn").addClass("d-none");
    });
    
    $('#btnradioEditLoc').click(function() {
      //divisions
      $(".editLoc").removeClass("d-none");
      $(".editLoc").addClass("d-block");
      $(".delLoc").addClass("d-none");
      $(".aadLoc").addClass("d-none");
  
      //buttons
      $('#editLocBtn').removeClass("d-none");
      $("#editLocBtn").addClass("d-block");
      $("#aadLocBtn").addClass("d-none");
      $("#delLocBtn").addClass("d-none");
    });
    
    $('#btnradioDeleteLoc').click(function() {
      //divisions
      $(".delLoc").removeClass("d-none");
      $(".delLoc").addClass("d-block");
      $(".editLoc").addClass("d-none");
      $(".aadLoc").addClass("d-none");
  
      //buttons
      $('#delLocBtn').removeClass("d-none");
      $("#delLocBtn").addClass("d-block");
      $("#aadLocBtn").addClass("d-none");
      $("#editLocBtn").addClass("d-none");
    });
  
  
    //table size
  
    if (window.matchMedia('(max-width: 991px)').matches) {
      $('table').addClass("table-sm");
    } else {
      $('table').removeClass("table-sm");
    }
  
    $(window).resize(function() {
        if (window.matchMedia('(max-width: 991px)').matches) {
          $('table').addClass("table-sm");
        } else {
          $('table').removeClass("table-sm");
        }
    });
  
    //table scroll
  
    var $th = $('#tableDiv').find('thead th')
    $('#tableDiv').on('scroll', function() {
      if ($(this).scrollTop()) {
        $th.css('transform', 'translateY('+ -1 +'px)');
    } else {
        $th.css('transform', 'translateY('+ 0 +'px)');
    }
    });
  
  
    //back to top button
  
    $('#tableDiv').scroll(function() {
      var height = $('#tableDiv').scrollTop();
      if (height > 100) {
          $('#scrollBack').fadeIn();
      } else {
          $('#scrollBack').fadeOut();
      }
    });
  
    $("#scrollBack").click(function(event) {
          $('#tableDiv').animate({ scrollTop: 0 }, "slow");
    });
  
  
   
  }
//global var
var btn;

//onload operations
$(window).on('load', function() {
    
    //load data
    getAllDepartments();
    getAllStaff();
    getAllDep();
    getAllLoc();
    getAllLocations();

});


//global var
// var btn;

//onload operations
// $(window).on('load', function() {
    
//     //load data
//     getAllDepartments();
//     getAllStaff();
//     getAllDep();
//     getAllLocations();

// });


//copy button

$(document).on("click",".copyBtn", function(){

    if (btn) {
        $(btn).removeClass("btn-success");
        $(btn).addClass("btn-outline-info");
    }
    
    var $txt = $('<textarea />');
    $txt.val($(this).siblings("div:hidden").text()).appendTo('body');
    $txt.select();
    document.execCommand("copy");
    $txt.remove();

    btn = $(this);
    $(btn).removeClass("btn-outline-info");
    $(btn).addClass("btn-success");

    
});

//insert Person

$('#addPerson').submit(function (e) {
    
    e.preventDefault();

    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to add a new person?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {

                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/insert/insertPerson.php',
                    data: $('#addPerson').serialize(),
                    success: function (result) {
                        $('#insertNewPerson').modal("toggle");
                        getAllStaff();
                        $('#addPerson')[0].reset();
                    }
                });
            }     
        }
    });

    return false;
    
});

//update and delete person

$(document).on("click",".updatePer", function(){
    // alert('testing');
    
    var perDepId = $(this).next().next().next().val();
    // alert(perDepId);

    globalThis.personIdtoUpdate = $(this).next().next().val();
    globalThis.person = $(this).next().next().next().val();
    
    $('#editPerson select').val(perDepId).trigger('change');

    var fullName = $($(this).closest("tr").find("td")[0]).children("div").text().split(/(?=[A-Z])/);
    
    $('#editPerson input[name="firstName"]').attr("value", fullName[0]);
    $('#editPerson input[name="lastName"]').attr("value", fullName[1]);
    $('#editPerson input[name="email"]').attr("value", $($(this).closest("tr").find("td")[3]).children("div").text());
    
});

$(document).on("click",".updatedep", function(){
    
    var perDepId = $(this).next().next().next().val();

    globalThis.personIdtoUpdate = $(this).next().next().val();
    
    $('#editdep select').val(perDepId).trigger('change');

    var fullName = $($(this).closest("tr").find("td")[0]).children("div").text();
    // var name = fullName;
    // alert(name);
    $('#editdep input[name="name"]').attr("value", fullName);
    // $('#editPerson input[name="lastName"]').attr("value", fullName[1]);
    // $('#editPerson input[name="email"]').attr("value", $($(this).closest("tr").find("td")[3]).children("div").text());
    
});

$(document).on("click",".updateloc", function(){
    
    var perDepId = $(this).next().next().next().val();

    globalThis.personIdtoUpdate = $(this).next().next().val();
    
    $('#editloc select').val(perDepId).trigger('change');

    var fullName = $($(this).closest("tr").find("td")[1]).children("div").text();
    // var name = fullName;
    // alert(name);
    $('#editloc input[name="name"]').attr("value", fullName);
    // $('#editPerson input[name="lastName"]').attr("value", fullName[1]);
    // $('#editPerson input[name="email"]').attr("value", $($(this).closest("tr").find("td")[3]).children("div").text());
    
});


$(document).on("click",".deletePerson", function (e) {   

    e.preventDefault();

    var personIdtoDelete = $(this).next().val();
    var uname = $(this).next().next().val();
    // alert(uname);

    bootbox.confirm({
        title: "Action Required",
        message: "Do you want to delete <strong>"+ uname +"</strong> details?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {
        
                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/delete/deletePerson.php',
                    data: {id: personIdtoDelete},
                    success: function (result) {
                        getAllStaff();
                    }
                });
            }            
        }
    });

    return false;

});

$(document).on("click",".deletedep", function (e) {

// alert('test1'); return false; 
var dep = $(this).next().next().val();
    // alert(personIdtoDelete);  

    e.preventDefault();

    var personIdtoDelete = $(this).next().val();
// alert(personIdtoDelete);


            $.ajax({
                    type: 'post',
                    url: 'libs/php/delete/deleteDepartmentByID.php',
                    data: {id: personIdtoDelete},
                    success: function (result) {
                        var res = result.status.code;
                        var total = result.status.count;
                        // alert(res);
                        if (res == '400') {

                             e.preventDefault();
    
    bootbox.confirm({
        title: "Action Required",
        message: "You cannot remove the entry for <strong>"+dep+"</strong> because it has <strong>"+total+"</strong> employees assigned to it.",
        buttons: {
            
    },
        callback: function (result) {
            
            if (result) {
    
                // e.preventDefault();
            
                getAllDep();
            }    
        }
    });
                            // alert('Error! Cannot delete department with dependants.');
        }else{ 
            // alert("test");

                            bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to delete this Department\'s details?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {
        
                $.ajax({
                    type: 'post',
                    url: 'libs/php/delete/deleteDepartmentByIDv.php',
                    data: {id: personIdtoDelete},
                    success: function (result) {
                        var res = result.status.code;
                        // alert(res);
                        if (res == '400') {

                             e.preventDefault();
    
   
                            // alert('Error! Cannot delete department with dependants.');
                        }
                        
                       getAllDep();
                    }
                });
            }            
        }
    });

 } //end else
                        
                       getAllDep();
   } //end success
                });
 

    return false;

});

$(document).on("click",".deleteloc", function (e) {


    // alert('test1'); return false; 
var loc = $(this).next().next().val();
    // alert(loc);  

    e.preventDefault();

    var personIdtoDelete = $(this).next().val();
// alert(personIdtoDelete);


            $.ajax({
                    type: 'post',
                    url: 'libs/php/delete/deleteLocationbyID.php',
                    data: {id: personIdtoDelete},
                    success: function (result) {
                        var res = result.status.code;
                        var total = result.status.count;
                        // alert(total);
                        // alert(total);
                        if (res == '400') {

                             e.preventDefault();
    
    bootbox.confirm({
        title: "Action Required",
        message: "You cannot remove the entry for <strong>"+loc+"</strong> because it has <strong>"+total+"</strong> employees assigned to it.",
        buttons: {
            
    },
        callback: function (result) {
            
            if (result) {
    
                // e.preventDefault();
            
                getAllLoc();
            }    
        }
    });
                            // alert('Error! Cannot delete department with dependants.');
        }else{ 
            // alert("test");

                            bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to delete this Location?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {
        
                $.ajax({
                    type: 'post',
                    url: 'libs/php/delete/deleteLocationbyIDv.php',
                    data: {id: personIdtoDelete},
                    success: function (result) {
                        var res = result.status.code;
                        // alert(res);
                        if (res == '400') {

                             e.preventDefault();
    
   
                            // alert('Error! Cannot delete department with dependants.');
                        }
                        
                       getAllLoc();
                    }
                });
            }            
        }
    });

 } //end else
                        
                       getAllLoc();
   } //end success
                });
 

    return false;

// alert('test1'); return false;   

    // e.preventDefault();

    // var personIdtoDelete = $(this).next().val();

    // bootbox.confirm({
    //     title: "Action Required",
    //     message: "<strong>Do you want to delete this Location?</strong>",
    //     buttons: {
    //         confirm: {
    //             label: 'Yes',
    //             className: 'btn-success'
    //         },
    //         cancel: {
    //             label: 'No',
    //             className: 'btn-danger'
    //         }
    // },
    //     callback: function (result) {
            
    //         if (result) {
        
    //             $.ajax({
    //                 type: 'post',
    //                 url: 'libs/php/delete/deleteLocationbyID.php',
    //                 data: {id: personIdtoDelete},
    //                 success: function (result) {
    //                     var res = result.status.code;
    //                     // alert(res);
    //                     if (res == '400') {
    //                          e.preventDefault();
    
    // bootbox.confirm({
    //     title: "Action Required",
    //     message: "<strong>Error! Cannot delete Location with dependants.</strong>",
    //     buttons: {
            
    // },
    //     callback: function (result) {
            
    //         if (result) {
    
    //             // e.preventDefault();
            
    //             getAllLoc();
    //         }    
    //     }
    // });

    // // return false;




    //                         // alert('Error! Cannot delete department with dependants.');
    //                     }
    //                    getAllLoc();
    //                 }
    //             });
    //         }            
    //     }
    // });

    // return false;

});

function nav(id) {

    // alert(id); return false;
    if (id == 'dep') {
        document.getElementById('tableDiv').style.display = 'none';
        document.getElementById('tableDiv1').style.display = 'block';
        // document.getElementById('toolsDiv').style.display = 'block';
        document.getElementById('tableDiv2').style.display = 'none';
        document.getElementById('bt').style.display = 'none';
        document.getElementById('bt1').style.display = 'block';
        document.getElementById('bt2').style.display = 'none';
    }else if (id == 'per') {
         document.getElementById('tableDiv').style.display = 'block';
        document.getElementById('tableDiv1').style.display = 'none';
        // document.getElementById('toolsDiv').style.display = 'block';
        document.getElementById('tableDiv2').style.display = 'none';
         document.getElementById('bt').style.display = 'block';
        document.getElementById('bt1').style.display = 'none';
        document.getElementById('bt2').style.display = 'none';
    }else{
        document.getElementById('tableDiv').style.display = 'none';
        document.getElementById('tableDiv1').style.display = 'none';
        // document.getElementById('toolsDiv').style.display = 'block';
        document.getElementById('tableDiv2').style.display = 'block';
         document.getElementById('bt').style.display = 'none';
        document.getElementById('bt1').style.display = 'none';
        document.getElementById('bt2').style.display = 'block';
    }

}

$('#editPerson').submit(function (e) {

    e.preventDefault();
    
//     var uname = $(this).next().val();
//     alert(person
// );  

    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to update "+ person +" details?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {
    
                e.preventDefault();
            
                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/update/updatePerson.php',
                    data: $('#editPerson').serialize() + "&id=" + personIdtoUpdate,
                    success: function (result) {
                       
                        $('#updatePerson').modal("toggle");
                        $('#editPerson')[0].reset();
                        getAllStaff();
                    }
                });
            }    
        }
    });

    return false;

});




$('#editdep').submit(function (e) {

    // alert('test'); return false;

    e.preventDefault();
    
    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to update the Department details?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {
    
                e.preventDefault();
            
                $.ajax({
                    type: 'post',
                    url: 'libs/php/update/updatedep.php',
                    data: $('#editdep').serialize() + "&id=" + personIdtoUpdate,
                    success: function (result) {
                       
                        $('#updatedep').modal("toggle");
                        $('#editdep')[0].reset();
                        getAllDep();
                    }
                });
            }    
        }
    });

    return false;

});


$('#editloc').submit(function (e) {

    // alert('test'); return false;

    e.preventDefault();
    
    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to update the location details?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {
    
                e.preventDefault();
            
                $.ajax({
                    type: 'post',
                    url: 'libs/php/update/updateLocation.php',
                    data: $('#editloc').serialize() + "&id=" + personIdtoUpdate,
                    success: function (result) {
                       
                        $('#updateloc').modal("toggle");
                        $('#editloc')[0].reset();
                        getAllLoc();
                    }
                });
            }    
        }
    });

    return false;

});





//insert department

$('#insertDepartment').submit(function (e) {

    e.preventDefault();

    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to add a new department?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {
    
                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/insert/insertDepartment.php',
                    data: $('#insertDepartment').serialize(),
                    success: function (result) {
                        $('#departmentModal').modal("toggle");
                        getAllDep();
                        $('#insertDepartment')[0].reset();
                    }
                });
           }    
        }
    });

    return false;

});

//delete department

$('#deleteDepartment select').change(function() {

    $.ajax({
        type: 'post',
        url: window.location.href + 'libs/php/get/getAllbyDepID.php',
        data: {departmentID: $(this).val(), p_code: 2},
        success: function (result) {
            if (result.data.length !== 0) {
                $('#deleteDepartment')[0].reset();

                bootbox.alert({
                    title: "Attention",
                    message: "<strong>Unable to delete department! Department required for active records!<strong>",
                    backdrop: true
                });

                return false;
            }
            
        }
    });

});

$('#deleteDepartment').submit(function (e) {

    e.preventDefault();

    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to delete the selected department?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {

                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/delete/deleteDepartmentByID.php',
                    data: $('#deleteDepartment').serialize(),
                    success: function (result) {
                      
                        getAllDepartments();
                        $('#deleteDepartment')[0].reset();
                    }
                });
            }      
        }
    });

    return false;

});


//update department

$('#editDepartment select.deparments').change(function() {

    $.ajax({
        type: 'post',
        url: window.location.href + 'libs/php/get/getDepartmentByid.php',
        data: {id: $(this).val()},
        success: function (result) {
           var locId = result.data[0].locationID;
           $(`#editDepartment select.locations option[value=${locId}]`).prop('selected', true)
            
        }
    });

    var location = $( "#editDepartment select.deparments option:selected" ).text();
    $('#editDepartment input').attr("value", location);

});


$('#editDepartment').submit(function (e) {

    e.preventDefault();

    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to update the department name?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            
            if (result) {

                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/update/updateDepartment.php',
                    data: $('#editDepartment').serialize(),
                    success: function (result) {
                        
                        $('#departmentModal').modal("toggle");
                        getAllDep();
                        $('#editDepartment')[0].reset();
                    }
                });
            }     
        }
    });

    return false;

});



//insert location

$('#insertLocation').submit(function (e) {

    e.preventDefault();
    
    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to add a new location?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            
            if (result) {

                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/insert/insertLocation.php',
                    data: $('#insertLocation').serialize(),
                    success: function (result) {

                        $('#locationModal').modal("toggle");
                        getAllLoc();
                        $('#insertLocation')[0].reset();
                    }
                });
        
            }
            
        }
    });

    return false;

});

//delete location

$('#deleteLocation select').change(function() {

    $.ajax({
        type: 'post',
        url: window.location.href + 'libs/php/get/getAllByLocID.php',
        data: {locationID: $(this).val(), p_code: 2},
        success: function (result) {
           
            if (result.data.length !== 0) {
                $('#deleteLocation')[0].reset();

                bootbox.alert({
                    title: "Attention",
                    message: "<strong>Unable to delete this location! Location required for active records!</strong>",
                    backdrop: true
                });

                return false;
            }
        }
    });

});

$('#deleteLocation').submit(function (e) {
    
    e.preventDefault();

    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to delete the selected location?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {

            if (result) {

                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/delete/deleteLocationbyID.php',
                    data: $('#deleteLocation').serialize(),
                    success: function (result) {
                        
                        getAllLocations();
                        $('#deleteLocation')[0].reset();
                    }
                });
        
            }       
        }
    });

    return false;

});

//update location

$('#editLocation select').change(function() {
    
    var location = $( "#editLocation select option:selected" ).text();
    $('#editLocation input').attr("value", location);
});

$('#editLocation').submit(function (e) {
    
    e.preventDefault();

    bootbox.confirm({
        title: "Action Required",
        message: "Do you want to change the location name?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
           
            if (result) {

                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/update/updateLocation.php',
                    data: $('#editLocation').serialize(),
                    success: function (result) {
                  
                         $('#locationModal').modal("toggle");
                        getAllLoc();
                        $('#editLocation')[0].reset();
                    }
                });
            }
            
        }
    });

    return false;

});



//select by department

$('#selectDepartmens').change(function(){ 

    var display_val = $("#tableDiv").css("display");
    var display_val1 = $("#tableDiv1").css("display");
    var display_val2 = $("#tableDiv2").css("display");

    // alert(display_val);
    // alert(display_val1);
    // alert(display_val2);

    if (display_val == 'block') {
// alert('personal');

        $('#tableBody').text("");

    $.post(window.location.href +"libs/php/get/getAllbyDepID.php", 
    {
        departmentID: $(this).val(), 
        locationID: $('#selectLocation option:selected').val(),
        p_code: 1

    }, function(result) {

        // alert(result);
  
        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><i class="my-auto bi bi-person"></i><div class='d-inline-flex filterSearch'>${person.firstName + " " + person.lastName}</div></td>
            <td><i class="my-auto bi bi-person-workspace"></i><div class='d-inline-flex'>${person.department}</div></td>
            <td><i class="my-auto bi bi-building-fill"></i><div class='d-inline-flex'>${person.location}</div></td>
            <td><i class="d-none d-md-inline ms-auto my-auto bi bi-envelope-at"></i><div class='d-none d-md-inline-flex filterSearch'>${person.email}</div><button type="button" class="btn btn-outline-info btn-sm d-sm-block d-md-none mx-auto copyBtn">Copy</button></td>
            <td><div class="d-flex"><button type="button" class="btn btn-outline-info updatePer  mx-auto" data-bs-toggle="modal" data-bs-target="#updatePerson"><i class="bi bi-pencil"></i></button>
            <button type="button" class="btn btn-outline-danger deletePerson mx-auto"><i class="bi bi-x-circle"></i></button>
            <input class="d-none perIdVal" type="number" value=${person.id} /><input class="d-none perIdDep" type="number" value=${person.departmentId} /></div></td></tr>`);
        });

        $('#tableBody').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

        if (result.data.length == 0 ) {
            $('#tableBody .hideDataRow').removeClass("d-none");
        } else {
            $('#tableBody .hideDataRow').addClass("d-none");
        }
          
    });

    }

    if (display_val1 == 'block') {
// alert('departghghg');
        $('#tableBodydep').text("");

    $.post(window.location.href +"libs/php/get/getDepartmentByidid.php", 
    {
        departmentID: $(this).val(), 
        locationID: $('#selectLocation option:selected').val(),
        p_code: 1

    }, function(result) {

        // alert(result);
  
        result.data.forEach(dep => {
            $('#tableBodydep').append(`<tr> 
            <td><i class="my-auto bi bi-person-workspace"></i><div class='d-inline-flex w-75 overflow-hidden'>${dep.department}</div></td>
            <td><i class="my-auto bi bi-building-fill"></i><div class='d-inline-flex w-75'>${dep.location}</div></td>
             
            <td><div class="d-flex"><button type="button" class="btn btn-outline-info updatedep  mx-auto" data-bs-toggle="modal" data-bs-target="#updatedep"><i class="bi bi-pencil"></i></button>
            <button type="button" class="btn btn-outline-danger deletedep mx-auto"><i class="bi bi-x-circle"></i></button>
            <input class="d-none perIdVal" type="number" value=${dep.departmentId} /><input class="d-none perIdDep" type="number" value=${dep.locationID} /></div></td></tr>`);
        });

        $('#tableBodydep').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

        if (result.data.length == 0 ) {
            $('#tableBodydep .hideDataRow').removeClass("d-none");
        } else {
            $('#tableBodydep .hideDataRow').addClass("d-none");
        }
          
    });

    }


//     if (display_val2 == 'block') {
// // alert('locationgg');
//         $('#tableBodyloc').text("");

//     $.post(window.location.href +"libs/php/get/getAllbyDepID.php", 
//     {
//         departmentID: $(this).val(), 
//         locationID: $('#selectLocation option:selected').val(),
//         p_code: 1

//     }, function(result) {

//         // alert(result);
  
//         result.data.forEach(person => {
//             $('#tableBodyloc').append(`<tr><td><i class="my-auto bi bi-person"></i><div class='d-inline-flex filterSearch'>${person.firstName + " " + person.lastName}</div></td>
//             <td><i class="my-auto bi bi-person-workspace"></i><div class='d-inline-flex'>${person.department}</div></td>
//             <td><i class="my-auto bi bi-building-fill"></i><div class='d-inline-flex'>${person.location}</div></td>
//             <td><i class="d-none d-md-inline ms-auto my-auto bi bi-envelope-at"></i><div class='d-none d-md-inline-flex filterSearch'>${person.email}</div><button type="button" class="btn btn-outline-info btn-sm d-sm-block d-md-none mx-auto copyBtn">Copy</button></td>
//             <td><div class="d-flex"><button type="button" class="btn btn-outline-info updatePer  mx-auto" data-bs-toggle="modal" data-bs-target="#updatePerson"><i class="bi bi-pencil"></i></button>
//             <button type="button" class="btn btn-outline-danger deletePerson mx-auto"><i class="bi bi-x-circle"></i></button>
//             <input class="d-none perIdVal" type="number" value=${person.id} /><input class="d-none perIdDep" type="number" value=${person.departmentId} /></div></td></tr>`);
//         });

//         $('#tableBodyloc').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

//         if (result.data.length == 0 ) {
//             $('#tableBodyloc .hideDataRow').removeClass("d-none");
//         } else {
//             $('#tableBodyloc .hideDataRow').addClass("d-none");
//         }
          
//     });

//     }
 
});

//select by location

$('#selectLocation').change(function(){ 

    var display_val = $("#tableDiv").css("display");
    var display_val1 = $("#tableDiv1").css("display");
    var display_val2 = $("#tableDiv2").css("display");

    // alert(display_val);
    // alert(display_val1);
    // alert(display_val2);



    if (display_val == 'block') {
    // alert('personal');

    
    $('#tableBody').text("");
    
    $.post( window.location.href + "libs/php/get/getAllByLocID.php", 
        {
            locationID: $(this).val(), 
            name: $("#selectDepartmens option:selected").text(),
            departmentID: $("#selectDepartmens option:selected").val(),
            p_code: 1
        }, function(result) {

                result.data.forEach(person => {
                    $('#tableBody').append(`<tr><td><i class="my-auto bi bi-person"></i><div class='d-inline-flex filterSearch'>${person.firstName + " " + person.lastName}</div></td>
                    <td><i class="my-auto bi bi-person-workspace"></i><div class='d-inline-flex'>${person.department}</div></td>
                    <td><i class="my-auto bi bi-building-fill"></i><div class='d-inline-flex'>${person.location}</div></td>
                    <td><i class="d-none d-md-inline ms-auto my-auto bi bi-envelope-at"></i><div class='d-none d-md-inline-flex filterSearch'>${person.email}</div><button type="button" class="btn btn-outline-info btn-sm d-sm-block d-md-none mx-auto copyBtn">Copy</button></td>
                    <td><div class="d-flex"><button type="button" class="btn btn-outline-info updatePer  mx-auto" data-bs-toggle="modal" data-bs-target="#updatePerson"><i class="bi bi-pencil"></i></button>
                    <button type="button" class="btn btn-outline-danger deletePerson mx-auto"><i class="bi bi-x-circle"></i></button>
                    <input class="d-none perIdVal" type="number" value=${person.id} /><input class="d-none perIdDep" type="number" value=${person.departmentId} /></div></td></tr>`);
                });

                $('#tableBody').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

                if (result.data.length == 0 ) {
                    $('#tableBody .hideDataRow').removeClass("d-none");
                } else {
                    $('#tableBody .hideDataRow').addClass("d-none");
                }    
    });
 
    }


    if (display_val1 == 'block') {
    // alert('department');

    
    $('#tableBodydep').text("");
    
    $.post( window.location.href + "libs/php/get/getDepartmentByidid.php", 
        {
            locationID: $(this).val(), 
            name: $("#selectDepartmens option:selected").text(),
            departmentID: $("#selectDepartmens option:selected").val(),
            p_code: 1
        }, function(result) {

                result.data.forEach(dep => {
                   $('#tableBodydep').append(`<tr> 
            <td><i class="my-auto bi bi-person-workspace"></i><div class='d-inline-flex w-75 overflow-hidden'>${dep.department}</div></td>
            <td><i class="my-auto bi bi-building-fill"></i><div class='d-inline-flex w-75'>${dep.location}</div></td>
             
            <td><div class="d-flex"><button type="button" class="btn btn-outline-info updatedep  mx-auto" data-bs-toggle="modal" data-bs-target="#updatedep"><i class="bi bi-pencil"></i></button>
            <button type="button" class="btn btn-outline-danger deletedep mx-auto"><i class="bi bi-x-circle"></i></button>
            <input class="d-none perIdVal" type="number" value=${dep.departmentId} /><input class="d-none perIdDep" type="number" value=${dep.locationID} /></div></td></tr>`);
        });

        $('#tableBodydep').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

        if (result.data.length == 0 ) {
            $('#tableBodydep .hideDataRow').removeClass("d-none");
        } else {
            $('#tableBodydep .hideDataRow').addClass("d-none");
        }
    });
 
    }


    if (display_val2 == 'block') {
    // alert('location');

    
    $('#tableBodyloc').text("");
    
    $.post( window.location.href + "libs/php/get/getBylocID.php", 
        {
            locationID: $(this).val(), 
            name: $("#selectDepartmens option:selected").text(),
            departmentID: $("#selectDepartmens option:selected").val(),
            p_code: 1
        }, function(result) {

               result.data.forEach(dep => {
            $('#tableBodyloc').append(`<tr> 
            <td><i class="my-auto bi bi-person-workspace"></i><div class='d-inline-flex w-75 overflow-hidden'>${dep.id}</div></td>
            <td><i class="my-auto bi bi-building-fill"></i><div class='d-inline-flex w-75'>${dep.name}</div></td>
             
            <td><div class="d-flex"><button type="button" class="btn btn-outline-info updateloc  mx-auto" data-bs-toggle="modal" data-bs-target="#updateloc"><i class="bi bi-pencil"></i></button>
            <button type="button" class="btn btn-outline-danger deleteloc mx-auto"><i class="bi bi-x-circle"></i></button>
            <input class="d-none perIdVal" type="number" value=${dep.id} /><input class="d-none perIdDep" type="number" value=${dep.id} /></div></td></tr>`);
        });

        $('#tableBodyloc').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

        if (result.data.length == 0 ) {
            $('#tableBodyloc .hideDataRow').removeClass("d-none");
        } else {
            $('#tableBodyloc .hideDataRow').addClass("d-none");
        }
    });
 
    }
 

});




//reset button

$("#reset").on("click", function() {

    getAllStaff();
    getAllDepartments();
    getAllDep();
    getAllLoc();
    getAllLocations();

});


//sort table by columns

$('.sortTab').wrapInner('<span title="sort this column"/>').click(function(){
    var table = $('table');
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).closest('th').index()));
    this.asc = !this.asc;
    if (!this.asc){rows = rows.reverse()};
    for (var i = 0; i < rows.length; i++){table.append(rows[i])};
})
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
    }
}
function getCellValue(row, index){ return $(row).children('td').eq(index).text() }


//search engine

function searchTable() {

    var table = $('#tableBody');

    table.find('tr').each(function(index, row) {
        var allCells = $(row).find('.filterSearch');
        if(allCells.length > 0) {
            var found = false;
            allCells.each(function(index, td) {
                var regExp = new RegExp($(".searchInput").val(), 'i');
                if(regExp.test($(td).text())) {
                    found = true;
                    return false;
                }
            });

        if(found == true)$(row).show();else $(row).hide();

        };
        
    }); 


    if ($('#tableBody').find('tr:visible').length === 0 && $('.hideDataRow').is(":hidden")) { 
        $('#tableBody .hideDataRow').removeClass("d-none");
    }else if ($('#tableBody').find('tr:visible').length === 1 && $('.hideDataRow').is(":visible")) {
        $('#tableBody .hideDataRow').removeClass("d-none");
    }else{
        $('#tableBody .hideDataRow').addClass("d-none");
    }
}
    


//functions 

//get all staff

function getAllStaff() {

    // console.log('dd');

    $('#tableBody').text("");

    $.get("libs//php/get/getAll.php",   function(result) {
      

        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><i class="my-auto bi bi-person"></i><div class='d-inline-flex w-75 overflow-hidden filterSearch'>${person.firstName + " " + person.lastName}</div></td>
            <td><i class="my-auto bi bi-person-workspace"></i><div class='d-inline-flex w-75 overflow-hidden'>${person.department}</div></td>
            <td><i class="my-auto bi bi-building-fill"></i><div class='d-inline-flex w-75'>${person.location}</div></td>
            <td><i class="d-none d-md-inline ms-auto my-auto bi bi-envelope-at"></i><div class='d-none d-md-inline-flex filterSearch'>${person.email}</div><button type="button" class="btn btn-outline-info btn-sm d-sm-block d-md-none mx-auto copyBtn">Copy</button></td>
            <td><div class="d-flex"><button type="button" class="btn btn-outline-info updatePer  mx-auto" data-id=${person.id} data-bs-toggle="modal" data-bs-target="#updatePerson"><i class="bi bi-pencil"></i></button>
            <button type="button" class="btn btn-outline-danger deletePerson mx-auto"><i class="bi bi-x-circle"></i></button>
            <input class="d-none perIdVal" type="number" value=${person.id} /><input class="d-none perIdVal" type="hidden" name="uname" value="${person.firstName + " " + person.lastName}" /><input class="d-none perIdDep" type="number" value=${person.departmentId} /></div></td></tr>`);
        });

        $('#tableBody').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

        if (result.data.length == 0 ) {
            $('#tableBody .hideDataRow').removeClass("d-none");
        } else {
            $('#tableBody .hideDataRow').addClass("d-none");
        }
        
    });
}


function getAllDep() {
    // console.log('dep');

    $('#tableBodydep').text("");

    $.get("libs//php/get/getAllDep.php",   function(result) {
      

        result.data.forEach(dep => {
            $('#tableBodydep').append(`<tr> 
            <td><i class="my-auto bi bi-person-workspace"></i><div class='d-inline-flex w-75 overflow-hidden'>${dep.department}</div></td>
            <td><i class="my-auto bi bi-building-fill"></i><div class='d-inline-flex w-75'>${dep.location}</div></td>
             
            <td><div class="d-flex"><button type="button" class="btn btn-outline-info updatedep  mx-auto" data-bs-toggle="modal" data-bs-target="#updatedep"><i class="bi bi-pencil"></i></button>
            <button type="button" class="btn btn-outline-danger deletedep mx-auto"><i class="bi bi-x-circle"></i></button>
            <input class="d-none perIdVal" type="number" value=${dep.departmentId} /><input class="d-none perIdVal" type="hidden" name="name" value="${dep.department}" /><input class="d-none perIdDep" type="number" value=${dep.locationID} /></div></td></tr>`);
        });

        $('#tableBodydep').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

        if (result.data.length == 0 ) {
            $('#tableBodydep .hideDataRow').removeClass("d-none");
        } else {
            $('#tableBodydep .hideDataRow').addClass("d-none");
        }
        
    });



}


function getAllLoc() {
    // console.log('dep');

    $('#tableBodyloc').text("");

    $.get("libs//php/get/getAllLocations.php",   function(result) {
      

        result.data.forEach(dep => {
            $('#tableBodyloc').append(`<tr> 
            <td><i class="my-auto bi bi-person-workspace"></i><div class='d-inline-flex w-75 overflow-hidden'>${dep.id}</div></td>
            <td><i class="my-auto bi bi-building-fill"></i><div class='d-inline-flex w-75'>${dep.name}</div></td>
             
            <td><div class="d-flex"><button type="button" class="btn btn-outline-info updateloc  mx-auto" data-bs-toggle="modal" data-bs-target="#updateloc"><i class="bi bi-pencil"></i></button>
            <button type="button" class="btn btn-outline-danger deleteloc mx-auto"><i class="bi bi-x-circle"></i></button>
            <input class="d-none perIdVal" type="number" value=${dep.id} /><input class="d-none perIdVal" type="hidden" value=${dep.name} /><input class="d-none perIdDep" type="number" value=${dep.id} /></div></td></tr>`);
        });

        $('#tableBodyloc').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

        if (result.data.length == 0 ) {
            $('#tableBodyloc .hideDataRow').removeClass("d-none");
        } else {
            $('#tableBodyloc .hideDataRow').addClass("d-none");
        }
        
    });



}

//get all departments 

function getAllDepartments() {

    $('.deparments').text("");
    $('.deparments').append(`<option value="getAll" selected>All Departments</option>`);
    $.get("libs//php/get/getAllDepartments.php",  function(result) {

        result.data.forEach(dep => {
            $('.deparments').append(`<option value=${dep.id}>${dep.name}</option>`);
        });

    });

    $('#insertNewPerson select option[value="getAll"]').attr("value", "");
    $('#departmentModal select option[value="getAll"]').attr("value", "");
    $('#locationModal select option[value="getAll"]').attr("value", "");

}



//get all locations

function getAllLocations() {

    $('.locations').text("");
    $('.locations').append(`<option value="getAll" selected>All Locations</option>`);

    $.get("libs//php/get/getAllLocations.php",  function(result) {

        result.data.forEach(loc => {
            $('.locations').append(`<option value=${loc.id}>${loc.name}</option>`);
        });

    });

    $('#insertNewPerson select option[value="getAll"]').attr("value", "");
    $('#departmentModal select option[value="getAll"]').attr("value", "");
    $('#locationModal select option[value="getAll"]').attr("value", ""); 

}