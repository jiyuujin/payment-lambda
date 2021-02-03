require('dotenv').config()

const stripe = process.env.NODE_ENV === 'test'
    ? require('stripe')(process.env.TEST_STRIPE_SECRET_KEY)
    : require('stripe')(process.env.LIVE_STRIPE_SECRET_KEY)

exports.handler = (event: unknown, context: unknown, callback: any) => {

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*'
    }

    stripe.paymentIntents.create({
        amount: 500,
        currency: 'jpy',
    }, function(err: any, charge: unknown) {
        if (err) {
            callback(null, {
                headers,
                statusCode: 500,
                body: JSON.stringify({
                    error: err.message
                })
            })
        } else {
            callback(null, {
                headers,
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Charged successful',
                    charge
                })
            })
        }
    })

}
