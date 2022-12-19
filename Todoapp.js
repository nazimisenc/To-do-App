// UI VARS

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;
let value,value1,value2,value3;

value = document.querySelector(".card").style.backgroundColor="rgb(197, 118, 118)";
value1 = document.querySelector("#card-mt-3").style.backgroundColor="rgb(197, 118, 118)";
value2 = document.querySelector(".btn-primary").style.backgroundColor="rgb(125 118 231)";
value3 = document.querySelector("body").style.backgroundColor="rgb(106, 105, 109)"

//Call load items
loadItems();

//Call event listeners
eventListeners();

function eventListeners()
{
    //Submit event
    form.addEventListener("submit",addNewItem);

    //Delete an item
    taskList.addEventListener("click",deleteItem);

    //Delete all items
    btnDeleteAll.addEventListener("click",deleteAllItem)
}

function loadItems()
{
    items = getItemsFromLS();

    items.forEach(function(item)
    {
        createItem(item);
    }
    );   
}

function getItemsFromLS()
{
    if (localStorage.getItem("items") === null)
    {
        items = [];
    }
    else
    {
        items = JSON.parse(localStorage.getItem("items"));
    }
    
    return items;
}

function setItemToLS(text)
{
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem("items",JSON.stringify(items));

}

function deleteItemFromLS(text)
{
    items = getItemsFromLS();
    items.forEach(function(item,index)
    {
        if (item === text)
        {
            items.splice(index,1);
        }
    }
    );
    localStorage.setItem("items",JSON.stringify(items));
}

function createItem(text)
{
    //Create li
    const li = document.createElement("li");
    li.className="list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));
    //Create a
    const a = document.createElement("a");
    a.classList="delete-item float-right";
    a.setAttribute("href","#");
    a.innerHTML='<i class="fas fa-times"></i>';

    //Add a to li
    li.appendChild(a);

    //Add li to ul
    taskList.appendChild(li);
}

function addNewItem(e)
{
    if (input.value ==="")
    {
        alert("Add new item!");
    }
    else
    {
        //Create item
        createItem(input.value);

        //Save to LocalStorage
        setItemToLS(input.value);

        //Clear input
        input.value="";
    }
    

    e.preventDefault(); // Tıklama yapıldığında sayfanın en tepesine çıkmasını engellemek için yazılır.
}

function deleteItem(e)
{
    if (e.target.className === "fas fa-times")
    {
        e.target.parentElement.parentElement.remove();

        //Delete item from LocalStorage
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }

    e.preventDefault();
}

function deleteAllItem(e)
{
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();

    e.preventDefault();
}


