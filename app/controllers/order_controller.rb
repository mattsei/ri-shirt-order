class OrderController < ApplicationController


  def index
  end

  def new
  end


  
  def create

    # Stripe.api_key = 'sk_test_cHcHo1NCkYbiJs8i54CeL7DL'

    token = params[:stripeToken]
    @quantity = params[:quantity]

    if params[:delivery] == 'Post'
      @total = @quantity.to_i * 5500
    else
      @total = @quantity.to_i * 4500
    end

    charge = Stripe::Charge.create({
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
            postal_code: params[:postcode],
          },
        },
        metadata: {
          name: params[:name],
          email: params[:email],
          quantity: params[:quantity],
          size: params[:size],
          delivery: params[:delivery],
        },
    })
    
    redirect_to order_created_path

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to new_order_path
    end
    
    

  end  

  def show
  end

# end
