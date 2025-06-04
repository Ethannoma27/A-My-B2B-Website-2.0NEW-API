const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // 使用环境变量中的密钥

exports.handler = async (event, context) => {
    try {
        // 创建 Checkout 会话
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'T-shirt',  // 商品名称
                        },
                        unit_amount: 2000,  // 价格（单位：cents）
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,  // 使用环境变量
            cancel_url: `${process.env.URL}/cancel.html`,  // 使用环境变量
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ id: session.id }),  // 返回会话 ID
            headers: {
                'Access-Control-Allow-Origin': '*',  // 允许跨域
            },
        };
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to create checkout session' }),
        };
    }
};
