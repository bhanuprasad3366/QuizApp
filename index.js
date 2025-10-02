
let quizData= [
    {
        question: "What is the synonym of 'Happy'?",
        a: "Sad",
        b: "Joyful",
        c: "Angry",
        d: "Tired",
        correct: "b"
    },
    {
        question: "What is the antonym of 'Strong'?",
        a: "Weak",
        b: "Powerful",
        c: "Tough",
        d: "Mighty",
        correct: "a"
    },
    {
        question: "Choose the correct meaning of 'Rapid'.",
        a: "Slow",
        b: "Fast",
        c: "Calm",
        d: "Lazy",
        correct: "b"
    },
    {
        question: "Which word is a noun?",
        a: "Run",
        b: "Beautiful",
        c: "Happiness",
        d: "Quickly",
        correct: "c"
    },
    {
        question: "What is the opposite of 'Generous'?",
        a: "Selfish",
        b: "Kind",
        c: "Helpful",
        d: "Friendly",
        correct: "a"
    }
];



const container=document.getElementById("container")
const res=document.getElementsByClassName("result-container")

const answerEls=document.querySelectorAll(".answer")
const labelEls=document.querySelectorAll(".op_label")
const questionEle=document.getElementById("question")
const a_text=document.getElementById("a_text")
const b_text=document.getElementById("b_text")
const c_text=document.getElementById("c_text")
const d_text=document.getElementById("d_text")
const prevBtn=document.getElementById("prev")
const nextBtn=document.getElementById("next")
const submitBtn=document.getElementById("submit")
const score=document.getElementById("score")
const scoreEle=document.getElementById("showAns")
const reloadBtn=document.getElementById("reload")

let currentQtn=0
let answered=0
let submitted=false
let userSelected={
    
}

function loadAnswers()
{

currentQtn=0;
container.style.display="block"
res[0].style.display="none"

 answerEls.forEach(
    (answerEls)=>
    {
      answerEls.disabled=true
    }
   )
   submitBtn.style.display="none"
   nextBtn.style.display="block"

loadQuiz()

}

function loadQuiz()
{
   
    questionEle.innerText=quizData[currentQtn].question
    a_text.innerText=quizData[currentQtn].a
    b_text.innerText=quizData[currentQtn].b
    c_text.innerText=quizData[currentQtn].c
    d_text.innerText=quizData[currentQtn].d
    deSelectAnswer()
    if(userSelected[currentQtn])
    {
        let selected=userSelected[currentQtn];
        document.getElementById(selected).checked=true
    }
    if(currentQtn==quizData.length-1)
    {
         nextBtn.style.display="none"
         if(submitted)
         {
            submitBtn.style.display="none"
            reloadBtn.style.display="block"
         }
        else
        {
             submitBtn.style.display="block"
              reloadBtn.style.display="none"

        }
    }
    if(submitted)
    {

        let actualAns=quizData[currentQtn].correct
        let userSelectd=userSelected[currentQtn]
        labelEls.forEach(
            (ele)=>
            {
               ele.classList.remove('correct')
                ele.classList.remove('wrong')
            }
        )
        if(actualAns==userSelectd)
        {
          let option=actualAns+"_text"
         document.getElementById(option).classList.add('correct')
         
        }
        else
        {
        
         let wrong_selected=userSelectd+"_text"
         document.getElementById(wrong_selected).classList.add('wrong')

         let correct_option=actualAns+"_text"
         document.getElementById(correct_option).classList.add('correct')
        }
    }

} 
function deSelectAnswer()
{
    answerEls.forEach((answerEls)=>
    {
        answerEls.checked=false
    })
}

submitBtn.addEventListener(
    'click',()=>
    {
        if(getSelected())
        {
           submitted=true
           container.style.display="none"
           res[0].style.display="block"
           score.innerText=`you have score ${answered}/${quizData.length}`

        }
    }
)

nextBtn.addEventListener(
    'click',()=>
    {
        let answer=getSelected()
       
        if(!submitted)
        {
              if(answer)
        {
            if(answer==quizData[currentQtn].correct)
            {
            answered++
            }
           currentQtn++
           if(currentQtn<quizData.length)
           {
            loadQuiz()
           }
        }
        }
        else{
            currentQtn++
            loadQuiz()
        }
    }
        
      
    
)

prevBtn.addEventListener(
    'click',()=>
    {
        
        if(currentQtn>0)
        {
            currentQtn--
            loadQuiz()
        }
    }
)


function getSelected()
{
   let answer;
   answerEls.forEach(
    (answerEls)=>
    {
        if(answerEls.checked)
        {
            answer=answerEls.id
            userSelected[currentQtn]=answer
        }
    }
   )
   return answer
}

loadQuiz()
