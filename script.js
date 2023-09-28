const inputSlider=document.getElementById("slider");
const passLength=document.getElementById("length");
const indicator=document.getElementById("indicator");
const copyBtn=document.getElementById("bt");
const copyTxt=document.getElementById("pass")
const span=document.getElementById("spanTxt");
const uppercaseCheck=document.getElementById("uppercase");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const generateBtn=document.getElementById("generateButton");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength=10;
let checkCount=1;



handleSlider();
inputSlider.value=passwordLength;


function handleSlider()
{
    inputSlider.value=passwordLength;
    passLength.innerText=passwordLength;
}

function setIndicator(color)
{
    indicator.style.backgroundColor=color;
}


inputSlider.addEventListener("input",function()
{
    passwordLength=inputSlider.value;
    handleSlider();
});


function getRndInteger(min,max)
{
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber()
{
    return getRndInteger(0,9);
}


function generateRandomLowercase()
{
    return String.fromCharCode(getRndInteger(97,122));
}

function generateRandomUppercase()
{
    return String.fromCharCode(getRndInteger(65,90));
}

function generateRandomSymbol()
{
    let x=getRndInteger(0,symbols.length);
    return symbols[x];
}


function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (allCheckBox[1].checked) hasLower = true;
    if (allCheckBox[2].checked) hasNum = true;
    if (allCheckBox[3].checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}



copyBtn.addEventListener("click",async function()
{
    if(copyTxt.value!="")
    {
        await navigator.clipboard.writeText(copyTxt.value);
        span.innerText="Copied";
        setTimeout(() => {
            span.innerText="";
        }, 3000);

    }
    else
    {
        span.innerText="Empty";
        setTimeout(() => {
            span.innerText="";
        }, 3000);
    }
})

function handleCheckboxChange()
{
    checkCount=0;
    allCheckBox.forEach((checkbox)=>
    {
        if(checkbox.checked)
        {
            checkCount++;
        }
    })
    if(checkCount>passwordLength)
    {
        passwordLength=checkCount;
        handleSlider();


    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("change",handleCheckboxChange);
})

function shufflePassword(t)
{
    let array=t.split("");
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function generate()
{
    calcStrength();
    handleCheckboxChange();
    var t="";
    if(checkCount!=0)
    {
        
        if(allCheckBox[0].checked)
        {
            t+=generateRandomUppercase();
        }
        if(allCheckBox[1].checked)
        {
            t+=generateRandomLowercase();
        }
        if(allCheckBox[2].checked)
        {
            t+=generateRandomNumber();
        }
        if(allCheckBox[3].checked)
        {
            t+=generateRandomSymbol();
        }
            
        let funcArr = [];

        if(allCheckBox[0].checked)
            funcArr.push(generateRandomUppercase);
    
        if(allCheckBox[1].checked)
            funcArr.push(generateRandomLowercase);
    
        if(allCheckBox[2].checked)
            funcArr.push(generateRandomNumber);
    
        if(allCheckBox[3].checked)
            funcArr.push(generateRandomSymbol);
        
        for(let i=t.length;i<=passwordLength;i++)
        {
            console.log(t);
            t+=(funcArr[getRndInteger(0,funcArr.length-1)]());
        }
        t=shufflePassword(t);
            console.log(t);
        copyTxt.value=t;
        
    }

}


generateBtn.addEventListener("click",generate);
