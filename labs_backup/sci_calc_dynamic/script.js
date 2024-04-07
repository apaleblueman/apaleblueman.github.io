document.addEventListener('DOMContentLoaded',function(){
    function get_value(button){
        let button_val = button.textContent;document.addEventListener('DOMContentLoaded',function(){
            function get_value(button){
                let button_val = button.textContent;
                document.getElementById("outputhere").value += button_val;
            }
            function delete_val(){
                let value_to_slice = document.getElementById("outputhere").value;
                document.getElementById("outputhere").value = value_to_slice.slice(0, -1);
            }
        
            function clear_val(){
                document.getElementById("show_exp").innerHTML = "";
                document.getElementById("show_ans").innerHTML = "";
                document.getElementById("outputhere").value = "";
            }
        
            function evaluate_exp(){
                try
                {
                    let current_exp = document.getElementById("outputhere").value;
                    document.getElementById("outputhere").value = eval(current_exp);
                    document.getElementById("show_exp").innerHTML = current_exp;
                    document.getElementById("show_ans").innerHTML = eval(current_exp);
                }
                catch(error)
                {
                    document.getElementById("show_exp").innerHTML = "";
                    document.getElementById("show_ans").innerHTML = "Invalid or empty expression";
                }
            }
        
            function handleButtonClicks(triggering_event){
                    let clickedButton = triggering_event.target
                    if (clickedButton === "clear"){
                        clear_val();
                    }
                    else if(clickedButton === "delete"){
                        delete_val();
                    }
                    else if(clickedButton === "equals"){
                        evaluate_exp()
                    }
                    else{
                        get_value(clickedButton);
                    }
            }
        
            all_buttons = document.querySelectorAll("button");
        
            all_buttons.forEach(function(button){
                button.addEventListner('click', handleButtonClicks);
            });
        });
        
        document.getElementById("outputhere").value += button_val;
    }
    function delete_val(){
        let value_to_slice = document.getElementById("outputhere").value;
        document.getElementById("outputhere").value = value_to_slice.slice(0, -1);
    }

    function clear_val(){
        document.getElementById("show_exp").innerHTML = "";
        document.getElementById("show_ans").innerHTML = "";
        document.getElementById("outputhere").value = "";
    }

    function evaluate_exp(){
        try
        {
            let current_exp = document.getElementById("outputhere").value;
            document.getElementById("outputhere").value = eval(current_exp);
            document.getElementById("show_exp").innerHTML = `your expression was : ${current_exp}`;
            document.getElementById("show_ans").innerHTML = `your answer is : ${eval(current_exp).toFixed(2)}`;
        }
        catch(error)
        {
            document.getElementById("show_exp").innerHTML = "";
            document.getElementById("show_ans").innerHTML = "Invalid or empty expression";
        }
        
    }

    function handleButtonClicks(triggering_event){
            let clickedButton = triggering_event.target
            if (clickedButton.id === "clear"){
                clear_val();
            }
            else if(clickedButton.id === "delete"){
                delete_val();
            }
            else if(clickedButton.id === "equals"){
                evaluate_exp()
            }
            else{
                get_value(clickedButton);
            }
    }

    all_buttons = document.querySelectorAll("button");

    all_buttons.forEach(function(button){
        button.addEventListener('click', handleButtonClicks);
    });
});
