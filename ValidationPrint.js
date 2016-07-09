(function () {
    var print = document.querySelector('#print'),
        result = document.querySelector('#result'),
        input = document.querySelectorAll('[type = text]'),
        error_msg = document.querySelectorAll('[id $= -err]'),
        success_msg,
        count = 0;
    console.log(typeof(result));
    print.addEventListener('click',function () {
        count = 0;
        success_msg = "";
        for(var i = 0; i<input.length; i++) {
            var validator = check(input[i]),
                flag,
                indicator;
            flag = validator();
            indicator = error(flag);
            count = indicator(input[i],error_msg[i],count);
        }
        console.log(count);
        if(count === 3) {
            for(var i = 0; i<input.length; i++) {
                success_msg += success(input[i]);
            }
            count = 0;
        }
    });
    
    function check(input) {
        var name = document.querySelector('#name'),
            age = document.querySelector('#age'),
            city = document.querySelector('#city');
        
        
        function checkName() {
            name = name.value;
            if(!(name.length === 0)) {
                name = parseInt(name);
                if(isNaN(name)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        function checkAge() {
            age = age.value;
            if(age.length === 2) {
                if(!(isNaN(age))) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        function checkCity() {
            city = city.value;
            if(!(city.length === 0)) {
                if(isNaN(city)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        if(input.getAttribute('id') === 'name') {
            return checkName;
        } else if(input.getAttribute('id') === 'age') {
            return checkAge;
        } else if(input.getAttribute('id') === 'city'){
            return checkCity;
        }
    }
       
    function error(flag) {
        function errorHighlight(input,error,count) {
            input.classList.add('invalid');
            error.classList.remove('hidden');
            count = 0;
            return count;
        }
        function errorUnhighlight(input,error,count) {
            input.classList.remove('invalid');
            error.classList.add('hidden');
            count++;
            return count;
        }
        
        if(flag) {
            return errorUnhighlight;
        } else {
            return errorHighlight;
        }
    }
    
    function success(input){
        var id = input.getAttribute('id');
        var para = document.createElement('p');
        para.textContent = id.toUpperCase() + '  :  ' + input.value;
        result.appendChild(para);
    }
    
})();

