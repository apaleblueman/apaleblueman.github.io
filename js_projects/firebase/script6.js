document.addEventListener('DOMContentLoaded', async function(){
    let submit_button = this.getElementById('submission');
    submit_button.addEventListener('click', post_data);
    let show_msg = this.getElementById('show_msgs');
    show_msg.addEventListener('click', show_messages);
});

async function post_data(){
    let username = document.getElementById("user_name").value.trim();
    let usermessage = document.getElementById("user_message").value.trim();
    if(username && usermessage)
    {   
        const data_packet = {
            name: username,
            message: usermessage
        }
        try{
            const response = await fetch('https://lab6db-f9c67-default-rtdb.firebaseio.com/messages_log.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                    },
                body: JSON.stringify(data_packet)
            });
            if(!response.ok){ throw new Error('Error saving data');}
            show_messages();
        }

    catch(error){
        console.error('Error saving data :' , error.message);
    }
}
    else{
        alert("Please fill in both feilds!");    
    }
}

async function show_messages(){
    
    let sub_form = document.getElementById("sub-form");
    sub_form.style.display = "none"; 
    try{
        const response = await fetch('https://lab6db-f9c67-default-rtdb.firebaseio.com/messages_log.json');
        const response_data = await response.json();
        let div_to_modify = document.getElementById("message_log");
        div_to_modify.style.display = "block";
        for(json_block_num in response_data)
        {
            json_block = response_data[json_block_num];
            console.log(json_block);
            div_to_modify.innerHTML += `<tr><td>Name:</td><td>${json_block.name}</td></tr><tr><td>Message:</td><td>${json_block.message}</td></tr>`;
            
        }
    }
    catch(error){
        console.error();
    }
}