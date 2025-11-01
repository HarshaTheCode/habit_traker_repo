// Function to fetch and render habits
async function fetchHabits() {
    console.log("function started")
    // Replace '/api/habits' with your actual endpoint
    const habitsdata = await fetch('/habitsData');
    const habits = await habitsdata.json();
    // console.log(habits[0].habit);
    
    // Get the habits list ul element
    const habitsList = document.querySelector('.habitslist');
    
    // Clear existing list items
    habitsList.innerHTML = '';
    
    // Render each habit
    habits.forEach(habit => {
        const listItem = document.createElement('li');
        listItem.className = 'lists';
        listItem.textContent = habit.habit;// Adjust according to your data structure
        

        const form = document.createElement('form');
        form.setAttribute('action', '/habitcompleted'); 
        form.setAttribute('method', 'POST'); 
        
        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'habitId'); 
        hiddenInput.setAttribute('value', habit._id); 

        const button = document.createElement('button');
        button.setAttribute('type', 'submit'); 
        button.textContent = 'Complete Habit'; 
        button.classList.add('complete-button');
        
        
        habitsList.appendChild(listItem);
        habitsList.appendChild(form)
        form.appendChild(hiddenInput)
        form.appendChild(button)
    });
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', fetchHabits);