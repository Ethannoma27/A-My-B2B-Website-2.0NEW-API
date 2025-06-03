// checkout.js
const stripe = Stripe('pk_test_51RVs3m2MBEOllDDEfBkC0wDhNbtnd4DLM7okdYLtyGSsT1cBS2FEQQ3pEMLwkZ8V48tzLiGDNqwNabM0aYGozxtb001yyXi8Q9');  // Replace with your Stripe public key

document.getElementById('checkout-button').addEventListener('click', function() {
  fetch('http://localhost:4242/create-checkout-session', {  // This points to the GitHub Actions server
    method: 'POST',
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(sessionId) {
    return stripe.redirectToCheckout({ sessionId: sessionId.id });
  })
  .then(function(result) {
    if (result.error) {
      alert(result.error.message);
    }
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
});
