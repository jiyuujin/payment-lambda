import { v4 as uuidv4 } from 'uuid'

const amount = 1000
const messageBoxEl: HTMLElement | null | undefined = document.getElementById('messageBox')!
const buttonEl: HTMLButtonElement | null | undefined = document.querySelector('button')!

const resetButtonText = () => {
    buttonEl.innerHTML = 'Contribute! <strong>$500</strong>'
}

const handler = StripeCheckout.configure({
    key: process.env.TEST_STRIPE_PUBLIC_KEY,
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: async (token: stripe.Token) => {

        let response, data

        try {
            response = await fetch(process.env.TEST_LAMBDA_ENDPOINT!, {
                method: 'POST',
                body: JSON.stringify({
                    token,
                    amount,
                    idempotency_key: uuidv4()
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })

            data = await response.json()
        } catch (err) {
            console.error(err.message)
            return
        }

        resetButtonText()

        let container: HTMLElement | null | undefined = messageBoxEl.querySelector('h2')!
        container.innerHTML = typeof data === 'object' && data.statusCode === 200
          ? 'Charged successful'
          : 'Charge failed.'

        console.log(data)

    },
    closed: function () {
        resetButtonText()
    },
})

buttonEl.addEventListener('click', () => {

    setTimeout(() => {
        buttonEl.innerHTML = 'Waiting for response...'
    }, 500)

    handler.open({
        amount,
        name: 'Test Shop',
        description: 'A Fantastic New Widget'
    })

})
