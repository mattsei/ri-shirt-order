# README - RI-Shirt-Order
# Overview

1. Summary
2. Tools Used
3. Disclaimer

---

Link: https://rachillustration.bioscollective.com/

## 1. Summary
This Ruby on Rails application was designed to handle and process t-shirt pre-orders for the #The End Is Meow t-shirt designed by Rachillustration for the final Neko Nation Australian tour.

Payments are processed by Stripe via a custom Stripe Elements form, securely capturing all necessary user data to create and process a charge, as well as data required to fulfil the order (buyer name/contact/address, shirt quantity/size), the latter being primarily stored in meta-data for the Stripe charge.

---
## 2. Tools Used
- Ruby Gems
  - stripe (Rails integration for Stripe)
  - semantic-ui-sass (Styling)
  - jquery-rails (Event handling, total price calculation)
  - figaro (API key variables)
  - capistrano (Deployment)
  - capistrano-rails
  - capistrano-passenger
  - capistrano-rbenv
- Heroku (Staging and testing)
- Stripe Elements.js (Custom Stripe Elements form framework)
- Phusion Passenger & NGINX (VPS Deployment)
- DigitalOcean (VPS)
- Git (Version Control)

---
## 3. Disclaimer
'#The End Is Meow' artwork is the sole property of [Rachillustration](https://www.facebook.com/Rach.Illustration/). 
All other artwork was designed by Matt Sei of [BIOS Collective](http://bioscollective.com/).
Application was developed from scratch, tested, deployed, and is actively maintained solely by Matt Sei.
