class OrderController < ApplicationController

  def index
  end

  # def new
  # end
  
  def create

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
        metadata: {
          name: params[:name],
          email: params[:email],
          quantity: params[:quantity],
          size: params[:size],
          delivery: params[:delivery],
          address: params[:address],
          city: params[:city],
          state: params[:state],
          postcode: params[:postcode],
        },
    })
    
    redirect_to order_created_path

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to order_index_path
    end  

  def created
  end

end
