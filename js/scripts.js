
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
    document.getElementById('name').value = '';
    document.getElementById('opinion').value = '';
});

