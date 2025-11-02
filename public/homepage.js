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






async function fetchCompletions() {
  
    // 👇 Update your backend URL and email if needed
    const res = await fetch('/any');
    const data = await res.json();

    const list = document.getElementById("completionList");
    list.innerHTML = ""; // clear old data

    
  

    // Display total completions
    const total = document.createElement("h3");
    total.textContent = `Total completions: ${data.completions.count}`;
    list.appendChild(total);

    // Loop through each completion
    data.info.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      const habit = document.createElement("div");
      habit.className = "habit";
      habit.textContent = `Habit: ${item.habit.habit}`;

      const freq = document.createElement("div");
      freq.textContent = `Frequency: ${item.habit.frequency}`;

      const user = document.createElement("div");
      user.textContent = `User: ${item.user.username}`;

      const date = document.createElement("div");
      date.className = "date";
      date.textContent = `Completed at: ${new Date(item.completedAt).toLocaleString()}`;

      const brake=document.createElement("hr")


      card.appendChild(habit);
      card.appendChild(freq);
      card.appendChild(user);
      card.appendChild(date);
      list.appendChild(card);
      list.appendChild(brake);



    });

  } 


// Call function on page load
document.addEventListener('DOMContentLoaded', fetchCompletions());
