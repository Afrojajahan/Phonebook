class Contact {
    constructor(name, email, phone, birthday) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.birthday = birthday;
    }
}


class Storage {

    static getContact = () => {
        let storeData;
        if (localStorage.getItem("contacts") === null) {
            storeData = []
        } else {
            storeData = JSON.parse(localStorage.getItem("contacts"))
        }
        return storeData;
    }

    static displayContact = () => {
        const contactAllData = Storage.getContact();
        contactAllData.forEach(ele => {
            const ui = new UI();
            ui.addContactList(ele);
        })

    }
    static addContact = (contact) => {

        const contactData = Storage.getContact();
        contactData.push(contact);
        localStorage.setItem("contacts", JSON.stringify(contactData));

    }
    static removeContact = (phone) => {
        // console.log(removeElement.parentElement);
        const allData = Storage.getContact();
        allData.forEach((all, index) => {

            if (all.phone === phone) {

                allData.splice(index, 1);
            }
        });
        localStorage.setItem("contacts", JSON.stringify(allData));
    }

}

class UI {

    // Add data
    addContactList = (contact) => {
        console.log(contact);
        const list = document.getElementById('contact-list');
        const row = document.createElement('tr');

        row.innerHTML = `<td>${contact.name}</td>
    <td>${contact.email}</td>
    <td>${contact.phone}</td>
    <td>${contact.birthday}</td>
    <td><a class="btn  delete">delete</a></td>
   `;
        list.append(row);
    }

    // delete
    deleteContact = (target) => {


        if (target.classList.contains("delete")) {
            target.parentElement.parentElement.remove();
            Storage.removeContact((target.parentElement.parentElement.children[2].textContent));
            //console.log(target.parentElement.parentElement.children[2].textContent);


        }


    }

    //search
    searchContact = (value) => {
        const rows = document.querySelectorAll('#contact-list tr');
        rows.forEach(ele => {
            if (ele.children[0].textContent.indexOf(value) != -1) {
                ele.style.display = "table-row";
            } else {
                ele.style.display = "none";
            }

        });

    }

    //clear
    clearField = () => {

        document.getElementById('name').value = "";
        document.getElementById('email').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('birthday').value = "";

    }
}






//Submit event
document.getElementById('contact-from').addEventListener('submit', (e) => {

    e.preventDefault();
    const name = document.getElementById('name').value.toLowerCase();
    const email = document.getElementById('email').value.toLowerCase();
    const phone = document.getElementById('phone').value.toLowerCase();
    const birthday = document.getElementById('birthday').value.toLowerCase();

    console.log(name);
    //instantiate Contact

    const contact = new Contact(name, email, phone, birthday);
    //instantiate UI
    const ui = new UI();

    if (name === "" || email === "" || phone === "" || birthday === "") {
        //error
       let alert=document.getElementById('alert');

       let paragraph=document.createElement("p");
       paragraph.textContent = "You don't fill up";
       alert.append(paragraph);

        console.log("error");
    } else {

        ui.addContactList(contact);
        Storage.addContact(contact);
        ui.clearField();
    }

});

// Delete data
document.getElementById('contact-list').addEventListener('click', (e) => {
    const ui = new UI();
    ui.deleteContact(e.target);

})

// Search data
document.getElementById('search').addEventListener('keyup', (e) => {
    const ui = new UI();
    ui.searchContact(e.target.value);
    console.log(e.target.value);

});

//DOM 
document.addEventListener('DOMContentLoaded', Storage.displayContact());