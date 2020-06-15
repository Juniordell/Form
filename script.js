const fields = document.querySelectorAll('[required]')
var cont 


function ValidadeField(field) {

    function verifyErrors() {
        let foundError = false

        for (let error in field.validity) {
            if (field.validity[error] && error !== 'valid') {
                foundError = error
            }
        }

        console.log(foundError)

        return foundError
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: 'Por favor, preencha esse campo!'
            },
            email: {
                valueMissing: 'Email é obrigatório!',
                typeMismatch: 'Por favor, preencha um email válido'
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {

        const spanError = field.parentNode.querySelector('span.error')

        if (message) {
            spanError.classList.add('active')
            spanError.innerHTML = message
        } else {
            spanError.classList.remove('active')
            spanError.innerHTML = ''
        }

    }

    return function () {

        const error = verifyErrors()

        if (verifyErrors()) {
            const message = customMessage(error)

            field.style.borderColor = 'red'
            setCustomMessage(message)

        } else {
            field.style.borderColor = 'green'
            setCustomMessage()
        }
    }

}


function customValidation(event) {

    const field = event.target
    const validation = ValidadeField(field)
    const email = document.querySelector('#email')
    const labelEmail = document.querySelector('#labelEmail')
    

    if (email.value != '') {
        labelEmail.style.fontSize = '0.8em' 
        labelEmail.style.letterSpacing = '0.1em' 
        labelEmail.style.transform = 'translateY(-24px)'
        cont = 1
    } else if (cont == 1) {
        labelEmail.style.fontSize = '1em' 
        labelEmail.style.letterSpacing = '0' 
        labelEmail.style.transform = 'translateY(0px)' 
    }

    validation()

    // if (error) {
    //     field.setCustomValidity("Esse campo é obrigatório")
    // } else {
    //     field.setCustomValidity("")
    // }

}

for ( field of fields ) {
    field.addEventListener('invalid', event => {         
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener('blur', customValidation)
}


document.querySelector('form').addEventListener('submit', event => {
    console.log('Formulário enviado')

    event.preventDefault()
})