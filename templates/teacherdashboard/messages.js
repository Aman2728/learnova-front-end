const chatTitle = document.getElementById("chatTitle");
const chatMessages = document.getElementById("chatMessages");

function openChat(subject){
    const subjects = {
        math: "Mathematics - Mr. Verma",
        science: "Science - Mrs. Kapoor",
        english: "English - Mr. Thomas",
        history: "History - Ms. Roy"
    };

    chatTitle.innerText = subjects[subject];
    chatMessages.innerHTML = `
        <div class="message teacher">
            Welcome to ${subjects[subject]} class discussion.
        </div>
    `;

    document.querySelectorAll(".subject-list ul li").forEach(li=>{
        li.classList.remove("active-subject");
    });

    event.target.classList.add("active-subject");
}

function sendMessage(){
    const input = document.getElementById("messageInput");
    const text = input.value.trim();

    if(text !== ""){
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message","student");
        messageDiv.innerText = text;
        chatMessages.appendChild(messageDiv);
        input.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}