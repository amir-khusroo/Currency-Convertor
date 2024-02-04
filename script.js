const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const from=document.querySelector(".from select");
const to=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlage(evt.target);
    })
}

let updateFlage=(option)=>{
    let currCode=option.value;
    let counCode=countryList[currCode];
    let img=option.parentElement.querySelector("img");
    img.src=`https://flagsapi.com/${counCode}/flat/64.png`;
}

let exchangeRate=async()=>{
    let amt=document.querySelector(".amount input");
    let amount=amt.value;
    if(amount==="" || amount<1){
        amt.value="1";
    }
    const URL=`${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[to.value.toLowerCase()];
    let finalAmount=parseFloat(amount*rate).toFixed(2);

    msg.innerText=`${amount} ${from.value} = ${finalAmount} ${to.value}`;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    exchangeRate();
});
window.addEventListener("load",()=>{
    exchangeRate();
});
