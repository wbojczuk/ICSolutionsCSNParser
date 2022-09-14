"use strict";
const submitButton = document.getElementById("subButton");
const submitButton2 = document.getElementById("subButton2");
const submitButton3 = document.getElementById("subButton3");
const submitButton4 = document.getElementById("subButton4");
const outputDiv = document.getElementById("output");
const endDate = document.getElementById("endDate");
const autoDateElem = document.getElementById("autoDate");
const dateSelection = document.getElementById("dateSelection");
const facilityInput = document.getElementById("facilityInput");
const facilitySubmit = document.getElementById("facilitySubmit");

const dateRegEx = /\d{2}-\d{2}-\d{4}/gi;


endDate.valueAsDate = new Date();
const startDate = document.getElementById("startDate");
startDate.valueAsDate = new Date(new Date().setDate(new Date().getDate() - 7));

getFacility();


submitButton.addEventListener("click", ()=>{
    outputDiv.innerHTML = "";
    const stringVar = document.getElementById("inputStr").value;
    const csnRegEx = /[0-9]{8,}/gi;
    if(stringVar.match(csnRegEx)){
    const csnMatches = stringVar.match(csnRegEx);
    csnMatches.forEach((csn)=>{
        outputDiv.insertAdjacentHTML("beforeend", `${csn} \n`);
        
    });
}else{
    window.alert("Enter Valid Text");
}
});
submitButton4.addEventListener("click", ()=>{
    outputDiv.innerHTML = "";
    const stringVar = document.getElementById("inputStr").value;
    const csnRegEx = /[0-9]{8,}/gi;
    const fileNameRegEx = stringVar.split(/(?<=[0-9]{1,})[\n]{1,}/gi);
    if(stringVar.match(csnRegEx)){
    const csnMatches = stringVar.match(csnRegEx);
    for(let i = 0; i < csnMatches.length; i++){
        outputDiv.insertAdjacentHTML("beforeend", `${fileNameRegEx[i]} &nbsp;&nbsp; ${csnMatches[i]} \n`);
    }
}else{
    window.alert("Enter Valid Text");
}
});

submitButton2.addEventListener("click", ()=>{
    const stringVar = document.getElementById("inputStr").value;
    const typeVideo = /__\d{4,}/gi.test(stringVar);
    
    const csnRegEx = /[0-9]{8,}/gi;
    const csnMatches = stringVar.match(csnRegEx);
    const facility = (document.getElementById("facilityInput").value).toLowerCase();
    if(stringVar.match(csnRegEx)){
        const csnLength = csnMatches.length;
        let allCSN = '';
        let date1;
        let date2;
        if(autoDateElem.checked){
            const tempDates = autoDate();
            date1 = `${tempDates[0]}`;
            date2 = `${tempDates[1]}`;
        } else{
        date1 = `${document.getElementById("startDate").valueAsNumber}`;
        date2 = `${document.getElementById("endDate").valueAsNumber}`;
        }
        
        date1 = date1.slice(0,10);
        date2 = date2.slice(0,10);
        for(let i = 0; i < csnLength; i++){
            (i == 0) ? csnMatches[i] = `"${csnMatches[i]}"`: csnMatches[i] = `%2C"${csnMatches[i]}"`;
        }
        csnMatches.forEach((csn)=>{
            allCSN += csn;
        });
        typeVideo == true ? window.open(`https://${facility}.icsenforcer.com/video_call_search.php#search=${allCSN}&start_date=${date1}&end_date=${date2}&all_any=any`) : window.open(`https://${facility}.icsenforcer.com/call_search.php#search=${allCSN}&start_date=${date1}&end_date=${date2}&all_any=any`);
        
        
    } else{
        window.alert("Enter Valid Text");
    }
    
});

// AUTO DATE OPTION LISTENERS
autoDateElem.addEventListener("change", ()=>{
    autoDateElem.checked ? dateSelection.style.display = "none" : dateSelection.style.display = "block" ;
});

function autoDate(){
    const dateMatches = (document.getElementById("inputStr").value).match(dateRegEx);
    for(let i = 0; i < dateMatches.length; i++){
        const tempDate = new Date(dateMatches[i]);
        dateMatches[i] = tempDate.getTime();
    }
    const maxDate = new Date(Math.max(...dateMatches));
    const minDate = new Date(Math.min(...dateMatches));
    return [minDate.setDate(minDate.getDate() - 1), maxDate.setDate(maxDate.getDate() + 1)];
}

// FACILITY SELECTION
function getFacility(){
    if(localStorage.getItem('facilityid')){
        facilityInput.value = localStorage.getItem('facilityid');
    } else{
        facilityInput.placeholder = "Enter Facility ID";
    }
}
// FACILITY SELECTION SET AND CHANGE LISTENERS
facilityInput.addEventListener("input", ()=>{
    facilitySubmit.style.display = "inline-block";
});
facilitySubmit.addEventListener("click", ()=>{
    facilitySubmit.style.display = "none";
    localStorage.setItem("facilityid", facilityInput.value);
    getFacility();
});