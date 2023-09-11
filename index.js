let submit = document.getElementById("submit");
let amount = document.querySelector("#amount");
let Pname = document.getElementById("p_name");
let tabel = document.getElementById("table");
let tabelbody = document.getElementById("tablebody");
let totaldiv = document.getElementById("tamount");
let sum = 0;
submit.addEventListener("click", (e => {
    e.preventDefault();
    if (amount.value == "" || Pname.value == "") {
        alert('Please fill all the fields');
    }
    else {
        let data = ({
            "amount": amount.value, "Product-name": Pname.value
        })
        axios.post("https://crudcrud.com/api/9a92d07b72634935968a419db4a1eb8d/EcommerceData", data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res => {
            showUser(res.data)
            findTotalAmount(parseInt(data["amount"]), "add");
        })).catch(err => console.log(err));

    }
}));
function showUser(data) {
    let inforparsed = data;
    let tr = document.createElement("tr");
    tr.setAttribute("userid", inforparsed._id);
    let td1 = document.createElement("td");
    td1.id = "td1";
    td1.appendChild(document.createTextNode(inforparsed["amount"] + " "));
    tr.appendChild(td1);
    let td2 = document.createElement("td");
    td2.className = "td2";
    td2.appendChild(document.createTextNode(inforparsed["Product-name"] + " "));
    tr.appendChild(td2);
    let td3 = document.createElement("td");
    var delbutton = document.createElement('button');
    delbutton.className = "btn btn-danger btn-sm float-right m-0 delete w-25";
    delbutton.appendChild(document.createTextNode("X"));
    td3.appendChild(delbutton);
    tr.appendChild(td3);
    tabelbody.appendChild(tr);
    amount.value = "";
    Pname.value = "";
}
tabelbody.addEventListener("click", del);
function del(e) {
    if (e.target.classList.contains('delete')) {
        let Parelement = e.target.parentElement.parentElement;
        let userId = Parelement.getAttribute("userid");
        axios.delete(`https://crudcrud.com/api/9a92d07b72634935968a419db4a1eb8d/EcommerceData/${userId}`).then(() => {
            let textContent = Parelement.textContent.split(" ");
            findTotalAmount(parseInt(textContent[0]), "sub");
            tabelbody.removeChild(Parelement)
        }).catch((err) => {
            console.log(err);
        })
    }
}
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/9a92d07b72634935968a419db4a1eb8d/EcommerceData").then(res => {
        for (let i = 0; i < res.data.length; i++) {
            showUser(res.data[i]);
        }
    }).catch(err => {
        console.log(err);
    })
})
function findTotalAmount(totalAmount, type) {
    if (type === "add") {
        sum = sum + totalAmount;
    }
    else {
        if (sum !== 0) {
            sum = sum - totalAmount;
        }
    }
    totaldiv.textContent = "Total amount of Products is: " + sum + " Rs";
}