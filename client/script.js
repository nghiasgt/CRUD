document.getElementById('dataForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    const response = await fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
    });

    if (response.ok) {
        alert('Data submitted successfully');
        loadData();
    } else {
        alert('Failed to submit data');
    }
});

async function loadData() {
    const response = await fetch('http://localhost:3000/api/data');
    const data = await response.json();

    const dataList = document.getElementById('dataList');
    dataList.innerHTML = '';

    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `Name: ${item.name}, Age: ${item.age}`;
        dataList.appendChild(div);
    });
}

loadData();
