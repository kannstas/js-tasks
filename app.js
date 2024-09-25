if (!Modernizr.localstorage) {
    alert('Ваш браузер не поддерживает Web Storage. Функциональность телефонной книги не будет работать.');
}
"use strict";
var form = document.getElementById('phoneBookForm');
var contactList = document.getElementById('contactList');

if (form && contactList) {
    window.onload = function () {
        displayContacts();
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        if (name && phone) {
            addContact(name, phone);
            form.reset();
        }
    });


    function addContact(name, phone) {
        var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push({ name, phone });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        displayContacts();
    }

    function displayContacts() {
        var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contactList.innerHTML = '';

        contacts.forEach((contact, index) => {
            const contactItem = document.createElement('div');
            contactItem.classList.add('contact-item');

            contactItem.innerHTML = `
                    <span>${contact.name} - ${contact.phone}</span>
                    <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
                `;

            contactList.appendChild(contactItem);
        });
    }

    function deleteContact(index) {
        var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        displayContacts();
    }
}