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
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/data/${item.id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            loadData(); 
          } else {
            console.error('Error deleting data:', response.status);
          }
        } catch (err) {
          console.error('Error deleting data:', err);
        }
      };
      div.appendChild(deleteButton);
      dataList.appendChild(div);
    });
  }
  async function fetchDataById(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/data/${id}`);
        if (response.ok) {
            const data = await response.json();
            alert(`Fetched Data - Name: ${data.name}, Age: ${data.age}`);
        } else {
            alert('Data not found');
        }
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}
async function updateData(id) {
    const name = prompt('Enter new name:');
    const age = prompt('Enter new age:');
    try {
        const response = await fetch(`http://localhost:3000/api/data/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age }),
        });
        if (response.ok) {
            const updatedData = await response.json();
            alert(`Updated Data - Name: ${updatedData.name}, Age: ${updatedData.age}`);
            loadData();
        } else {
            alert('Failed to update data');
        }
    } catch (err) {
        console.error('Error updating data:', err);
    }
}

loadData();
