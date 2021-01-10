require('dotenv').config()

const stripe = require('stripe')(process.env.LIVE_STRIPE_SECRET_KEY)

exports.handler = (event, context, callback) => {

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*'
    }

    stripe.paymentIntents.create({
        amount: 500,
        currency: 'jpy',
    }, function(err, charge) {
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