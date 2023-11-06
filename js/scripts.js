// Create local storage for fish names and opinions
let names = [];
let opinions = [];
localStorage.setItem('names', names);
localStorage.setItem('opinions', opinions);

document.getElementById('fishForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var opinion = document.getElementById('opinion').value;
    var tbody = document.getElementById('fishTable').getElementsByTagName('tbody')[0];
    var newRow = tbody.insertRow();
    var fishCell = newRow.insertCell();
    var opinionCell = newRow.insertCell();
    fishCell.textContent = name;
    opinionCell.textContent = opinion;

    // Testing local data storage
    localStorage.setItem('name', name);
    localStorage.setItem('opinion', opinion);
    console.log(localStorage.getItem('name'));
    console.log(localStorage.getItem('opinion'));
    // Create an array of all that has been added to the table so we can fetch
    let names = [];
    let opinions = [];
    names.push(localStorage.getItem('name'));
    opinions.push(localStorage.getItem('opinion'));

    document.getElementById('name').value = '';
    document.getElementById('opinion').value = '';
});

document.getElementById('fishTable').addEventListener('load', function(e) {
    e.preventDefault();
    console.log("Table loaded");
    console.log(localStorage.getItem('names'));
    console.log(opinions);
})

