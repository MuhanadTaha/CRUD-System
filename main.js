var courseName = document.getElementById("courseName")
var courseCategory = document.getElementById("courseCategory")
var coursePrice = document.getElementById("coursePrice")
var courseDescription = document.getElementById("courseDescription")
var courseCapacity = document.getElementById("courseCapacity")
var addbtn = document.getElementById("click")
var data = document.getElementById("data")
var deleteBtn  = document.getElementById("deleteBtn");
var search  = document.getElementById("search");


var currentIndex =1;
if(JSON.parse(localStorage.getItem('courses')) == null){ // في حال كان ما في كورسيس باللوكال ستوريج خلي جيسون الكورسيس فاضية
    courses=[];
}
else{
    var courses = JSON.parse(localStorage.getItem('courses'));// بحول من سترينج لجيسون
    displayData(); // عشان لما يجيبهم من الستوريح يعرضهم بالجدول

}



addbtn.onclick = function(event){
    event.preventDefault();
    if(addbtn.value=="Add Course"){
        addCourse();
    }
    else{
        updateCourse();
    }   
    displayData();
    clear();

   // console.log(courses);
  // عشان أشيل كلاس الفاليد بعد ما أضيف الداتا للكرود

  course.classList.remove('is-valid')
  course.courseCategory.remove('is-valid')
  course.coursePrice.remove('is-valid')
  course.courseDescription.remove('is-valid')
  course.courseCapacity.remove('is-valid')

}


//add Course

function addCourse(){
    var course = {
        courseName: courseName.value,
        courseCategory: courseCategory.value,
        coursePrice:coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value
    }
    courses.push(course);


    localStorage.setItem("courses",JSON.stringify(courses)) //عشان أخزنه باللوكال ستوريج وبحول الأريه أوف أوبجيكت (جيسون) لسترينج لأنه اللوكال ستوريج بقبلش كي الا سترينج

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course added successfully',
        showConfirmButton: false,
        timer: 1500
      })
     
}

//clear inputs
function clear(){
    courseName.value = '',
    courseCategory.value = '',
    coursePrice.value = '',
    courseDescription.value ='',
    courseCapacity.value =''
}


//read
function displayData(){
    var result='';
    for(var i = 0 ; i<courses.length;i++){
        result+=`
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCategory}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDescription}</td>
        <td>${courses[i].courseCapacity}</td>
        <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>
        <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>

        </tr>
        `

    }

    data.innerHTML = result;

}

//delete course
function deleteCourse(index){
    
    

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            //بعد ما أكبس على بوتون أوكيه بروح بعمل حذف 
            courses.splice(index,1);
            localStorage.setItem("courses",JSON.stringify(courses)) //عشان أخزنه باللوكال ستوريج وبحول الأريه أوف أوبجيكت (جيسون) لسترينج لأنه اللوكال ستوريج بقبلش كي الا سترينج
            displayData();


            Swal.fire(
                'Deleted!',
                'Course has been deleted.',
                'success'
                )
            }
        })
    }

//delete all
deleteBtn.onclick = function(){

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            // بعد ما أكبس على بوتون أوكيه بروح بعمل حذف لكل الريكورد 
            courses =[];
            localStorage.setItem("courses",JSON.stringify(courses)) //عشان أخزنه باللوكال ستوريج وبحول الأريه أوف أوبجيكت (جيسون) لسترينج لأنه اللوكال ستوريج بقبلش كي الا سترينج
            data.innerHTML='';

            Swal.fire(
                'Deleted!',
                'All data has been deleted .',
                'success'
                )
            }
    })

}


/**
 * keyup
 * keypress
 * keydown
 */

search.onkeyup = function(){
    var result='';
    for(var i = 0 ; i < courses.length ; i++){
        if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())){
            result+=`
            <tr>
            <td>${i+1}</td>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
            <td><button class="btn btn-info">update</button></td>
            </tr>
            `
        }
       

    }

    data.innerHTML = result;

}

function getCourse(index){
    var course = courses[index];
    courseName.value = course.courseName,
    courseCategory.value = course.courseCategory,
    coursePrice.value = course.courseCategory,
    courseDescription.value =course.courseDescription,
    courseCapacity.value =course.courseCapacity
    addbtn.value = "Update Course"
    currentIndex = index;
}


// update

function updateCourse(){
    var course = {
        courseName: courseName.value,
        courseCategory: courseCategory.value,
        coursePrice:coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value
    }

    var name = courses[currentIndex].courseName;

    courses[currentIndex].courseName = course.courseName;
    courses[currentIndex].courseCategory = course.courseCategory;
    courses[currentIndex].coursePrice = course.coursePrice;
    courses[currentIndex].courseDescription = course.courseDescription;
    courses[currentIndex].courseCapacity = course.courseCapacity;
    localStorage.setItem("courses",JSON.stringify(courses)) //عشان أخزنه باللوكال ستوريج وبحول الأريه أوف أوبجيكت (جيسون) لسترينج لأنه اللوكال ستوريج بقبلش كي الا سترينج
    addbtn.value="Add Course";

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${name} Updated successfully`,
        showConfirmButton: false,
        timer: 1500
      })
    

}



/*
validation
*/ 

//name
/**
 * first latter capital
 * name 3-10
 * no numbers
 * regex /^[A-Z][a-z]{2-10}$/
 */
courseName.onkeyup = function(){
    var pattern=/^[A-Z][a-z]{2,10}$/
    if(pattern.test(courseName.value)){
        if(courseName.classList.contains('is-invalid')
         && document.getElementById('nameAlert').classList.contains('d-block')){ // عشان ما يضل يدخلي بكلاسات مع كل حرف بكتبه  فبس يبدل 
            courseName.classList.replace('is-invalid','is-valid')
            document.getElementById('nameAlert').classList.replace('d-block','d-none')

        }
        else{
            courseName.classList.add('is-valid')
        }
        addbtn.removeAttribute('disabled')  
    }
    else{
        if(courseName.classList.contains('is-invalid') 
        && document.getElementById('nameAlert').classList.contains('d-none')){
            document.getElementById('nameAlert').classList.replace('d-none','d-block')
            courseName.classList.replace('is-valid','is-invalid')

        }else{
            courseName.classList.add('is-invalid')
            document.getElementById('nameAlert').classList.replace('d-none','d-block')
l
        }
      addbtn.setAttribute('disabled', 'disabled')
    }
}


//category

/**
 * first latter capital
 * name 3-20
 * no numbers
 * regex /^[A-Z][a-z]{2-20}$/
 */
courseCategory.onkeyup = function(){
    var pattern=/^[A-Z][a-z]{2,20}$/
    if(pattern.test(courseCategory.value)){
        if(courseCategory.classList.contains('is-invalid')){ // عشان ما يضل يدخلي بكلاسات مع كل حرف بكتبه بالعك بس يبدل 
            courseCategory.classList.replace('is-invalid','is-valid')
        }
        else{
            courseCategory.classList.add('is-valid')
        }
        addbtn.removeAttribute('disabled')  
    }
    else{
        if(courseCategory.classList.contains('is-invalid')){
            courseCategory.classList.replace('is-valid','is-invalid')
        }
        courseCategory.classList.add('is-invalid')
        addbtn.setAttribute('disabled', 'disabled')
    }
}



//price

/**
 * numbers
 * 4 digits
 * regex /^[0-9]{3,4}$/
 */
coursePrice.onkeyup = function(){
    var pattern=/^[0-9]{3,4}$/
    if(pattern.test(coursePrice.value)){
        if(coursePrice.classList.contains('is-invalid')){ // عشان ما يضل يدخلي بكلاسات مع كل حرف بكتبه بالعك بس يبدل 
            coursePrice.classList.replace('is-invalid','is-valid')
        }
        else{
            coursePrice.classList.add('is-valid')
        }
        addbtn.removeAttribute('disabled')  
    }
    else{
        if(coursePrice.classList.contains('is-invalid')){
            coursePrice.classList.replace('is-valid','is-invalid')
        }
        coursePrice.classList.add('is-invalid')
        addbtn.setAttribute('disabled', 'disabled')
    }
}



//description

/**
 * numbers
 * 4 digits
 * regex /^[A-Z][A-Za-z0-9\s]{2,120]$/
 */
courseDescription.onkeyup = function(){
    var pattern=/^[A-Z][A-Za-z0-9\s]{2,120}$/
    if(pattern.test(courseDescription.value)){
        if(courseDescription.classList.contains('is-invalid')){ // عشان ما يضل يدخلي بكلاسات مع كل حرف بكتبه بالعك بس يبدل 
            courseDescription.classList.replace('is-invalid','is-valid')
        }
        else{
            courseDescription.classList.add('is-valid')
        }
        addbtn.removeAttribute('disabled')  
    }
    else{
        if(courseDescription.classList.contains('is-invalid')){
            courseDescription.classList.replace('is-valid','is-invalid')
        }
        courseDescription.classList.add('is-invalid')
        adcourseDescriptionbtn.setAttribute('disabled', 'disabled')
    }
}





//price

/**
 * numbers
 * 4 digits
 * regex /^[0-9]{2,3}$/
 */
courseCapacity.onkeyup = function(){
    var pattern=/^[0-9]{2,3}$/
    if(pattern.test(courseCapacity.value)){
        if(courseCapacity.classList.contains('is-invalid')){ // عشان ما يضل يدخلي بكلاسات مع كل حرف بكتبه بالعك بس يبدل 
            courseCapacity.classList.replace('is-invalid','is-valid')
        }
        else{
            courseCapacity.classList.add('is-valid')
        }
        addbtn.removeAttribute('disabled')  
    }
    else{
        if(courseCapacity.classList.contains('is-invalid')){
            courseCapacity.classList.replace('is-valid','is-invalid')
        }
        courseCapacity.classList.add('is-invalid')
        addbtn.setAttribute('disabled', 'disabled')
    }
}