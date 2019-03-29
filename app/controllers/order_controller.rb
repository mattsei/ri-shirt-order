class OrderController < ApplicationController


  def index
  end

  def new
  end
  
  def create

    Stripe.api_key = 'sk_test_cHcHo1NCkYbiJs8i54CeL7DL'

    token = params[:stripeToken]
    @quantity = params[:quantity]
    @total = @quantity.to_i * 4500

    # customer = Stripe::Customer.create({
    #   source: token,
    #   email: params[:email],
    #   description: params[:name],
      
    #   },
    # })

    charge = Stripe::Charge.create({
        # customer: customer.id,
        source: token,
        amount: @total,
        currency: 'aud',
        description: '#TheEndIsMeow T-Shirt Pre-Order',
        receipt_email: params[:email],
        shipping: {
          name: params[:name],
          address: {
            line1: params[:street_address],
            city: params[:city],
            state: params[:state],
          },
        },
        metadata: {
          name: params[:name],
          quantity: params[:quantity],
          size: params[:size],
          delivery: params[:delivery],
        },
    })
      redirect_to order_created_path

    
  end  

  def show
  end

end
