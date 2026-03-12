
const addlist=document.getElementById('addlist');
const removelist=document.getElementById('removelist');
update();
function changebtn(){
    console.log("Changing......");
    const img=this.querySelector("img");
    if(img.src.endsWith("notclicked.svg")){
        img.src="../images/clicked.svg";
        console.log(this.parentNode.childNodes[1].textContent);
        this.parentNode.childNodes[1].style.textDecoration='line-through';
    }
    else if(img.src.endsWith("clicked.svg")){
        img.src="../images/notclicked.svg";
        this.parentNode.childNodes[1].style.textDecoration='none';
    }
};
async function update(){
    console.log("Loading");
    const response=await fetch("/api/posts/");
    const data=await response.json();
    console.log(data);
    data.forEach(post=>insertOne(post));
};

function insertOne(post){
        console.log("Insert One is Running.......");
        console.log(post.title);
        const list=document.getElementsByClassName("list")[0];
        let div = document.createElement("div");
        div.className="content";
        let li=document.createElement("li");
        li.textContent=post.title;
        list.appendChild(div);
        let img=document.createElement("img");
        img.src="../images/notclicked.svg";
        let btn2=document.createElement("button");
        btn2.type="button";
        btn2.className="btn";
        div.appendChild(btn2);
        btn2.appendChild(img);
        div.appendChild(li);
        btn2.addEventListener("click", changebtn);
};

async function addList(){
    const item=document.getElementById("item");
    const data=item.value;
    if(data===""){
        return null;
    }
    async function main(){
        const response = await fetch ("/api/posts/",{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({"title":data}),  
    });
    const data2=await response.json();
    console.log(data2);
    };
    main().catch(console.error);
    insertOne({"title":data});    
    item.value="";    
};


async function removeList(){
    const item=document.querySelectorAll("img");
    for(let i=0;i<item.length;i++){
        if(item[i].src.endsWith("notclicked.svg")){;;}
        else if(item[i].src.endsWith("clicked.svg")){
            let list=item[i].parentNode.parentNode.childNodes[1].textContent;
            const response=await fetch(`/api/posts/${list}`,{
                method:"DELETE"    
            });
            const data=await response.json();
            console.log(data);
            if(response.ok){
                item[i].parentNode.parentNode.remove();
            }
        }
    }
};

removelist.addEventListener('click',removeList);
addlist.addEventListener('click',addList);

document.querySelectorAll(".btn").forEach(btn => {
    console.log("CLICKED"); 
    btn.addEventListener("click", changebtn);
});




