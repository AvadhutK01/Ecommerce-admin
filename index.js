let submit = document.getElementById("submit");
let amount = document.querySelector("#amount");
let Pname = document.getElementById("p_name");
let tabel = document.getElementById("table");
let tabelbody = document.getElementById("tablebody");
let totaldiv = document.getElementById("tamount");
let sum = parseInt(localStorage.getItem("Tamount") != null ? localStorage.getItem("Tamount") : 0);
submit.addEventListener("click", async (e) => {
    e.preventDefault();
    if (amount.value == "" || Pname.value == "") {
        alert('Please fill all the fields');
    } else {
        let data = {
            "amount": amount.value,
            "Product-name": Pname.value,
        };

        try {
            const response = await axios.post(
                "https://crudcrud.com/api/b6f823f990be48e08bb342ec9d0cfe51/EcommerceData",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            showUser(response.data);
            findTotalAmount(parseInt(data["amount"]), "add");
        } catch (err) {
            console.log(err);
        }
    }
});

function showUser(data) {
    let tr = document.createElement("tr");
    tr.setAttribute("userid", data._id);
    let td1 = document.createElement("td");
    td1.id = "td1";
    td1.appendChild(document.createTextNode(data["amount"]));
    td1.setAttribute("amount", data["amount"]);
    tr.appendChild(td1);
    let td2 = document.createElement("td");
    td2.className = "td2";
    td2.appendChild(document.createTextNode(data["Product-name"]));
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

async function del(e) {
    if (e.target.classList.contains('delete')) {
        let Parelement = e.target.parentElement.parentElement;
        let userId = Parelement.getAttribute("userid");

        try {
            await axios.delete(
                `https://crudcrud.com/api/b6f823f990be48e08bb342ec9d0cfe51/EcommerceData/${userId}`
            );

            let td = Parelement.parentElement.querySelector("#td1");
            let amount = parseInt(td.getAttribute("amount"));
            findTotalAmount(amount, "sub");
            tabelbody.removeChild(Parelement);
        } catch (err) {
            console.log(err);
        }
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get(
            "https://crudcrud.com/api/b6f823f990be48e08bb342ec9d0cfe51/EcommerceData"
        );

        for (let i = 0; i < response.data.length; i++) {
            showUser(response.data[i]);
        }
        findTotalAmount();
    } catch (err) {
        console.log(err);
    }
});

function findTotalAmount(totalAmount, type) {
    if (type === "add") {
        sum = sum + totalAmount;
    } else if (type === "sub") {
        if (sum !== 0) {
            sum = sum - totalAmount;
        }
    }
    localStorage.setItem("Tamount", sum);
    let Tsum = localStorage.getItem("Tamount");
    totaldiv.textContent = "Total amount of Products is: " + Tsum + " Rs";
}
