document.addEventListener("DOMContentLoaded", async function(){get_file_data();});

async function get_file_data(){
        try{
            // let request = await fetch("./data.txt");
            let request =  await fetch(`https://fun165-98f8a-default-rtdb.firebaseio.com/submittedMsg.json  `);
            console.log(request.status);
            let result = await request.text();
            console.log(result);     
            //json data 
            let json_request = await fetch("./data.json");
            console.log(json_request.status);
            let response = await json_request.json();
            console.log(response);     
        }
        catch(error){
            console.log(error)
        }
    }



