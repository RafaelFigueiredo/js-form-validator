const UI = (function () {
    return {
        formValidator: function (rules) {

            // A collection of validate functions
            // All information needed to a validate function is present in a rule object that
            // is passed as argument
            const functions = {
                notEmpty: function (rule) {

                    let value = document.querySelector(rule.selector).value;
                    if (value === '') {
                        return {
                            valid: false,
                            msg: 'That field is required'
                        };
                    }
                    return {
                        valid: true,
                        msg: ''
                    };
                },
            }

            // Check is called for each rule and run all validate functions
            const check = function (rule) {
                let constrains = rule.constrains
                for (let i = 0; i < constrains.length; i++) {
                    constrain = constrains[i]
                    //if string
                    let f = functions[constrain]
                    let r
                    if (typeof f === 'function') {
                        r = f(rule)
                    }

                    //TODO: show error
                    if (r.valid === true) {
                        console.log("success handling", r);
                        
                        //remove error
                        document.querySelector(rule.selector)
                        .classList.remove('on-error');
                        document.querySelector(`${rule.selector}-error`)
                        .innerHTML=r.msg;
                    }else{
                        console.log("error handling", r);
                        //anything other than true is a error to handle
                        document.querySelector(rule.selector)
                        .classList.add('on-error');
                        
                        document.querySelector(`${rule.selector}-error`)
                        .innerHTML=r.msg;
                        return false;
                    }
                }
                return true;
            }


            //init
            rules.forEach(rule => {
                let element = document.querySelector(rule.selector);
                if (element === null || element === undefined) {
                    console.log(`Invalid selector ${rule.selector} on rule: ${rule}`);
                    return
                }
                element.addEventListener('blur', (function () {
                    return function (e) {
                        check(rule);
                    }
                })());
            });

            //TODO: submit
        },
    }
})();




//////////////// USAGE ////////////////////
const rules = [{
        selector: '#txtName',
        event: 'blur',
        constrains: ['notEmpty']
    },
    {
        selector: '#datetimeFieldA',
        event: 'blur',
        constrains: [{
            function: 'dateConsistency',
            past: '#datetimeFildA',
            future: '#datetimeFildB'
        }]
    }
]

UI.formValidator(rules)